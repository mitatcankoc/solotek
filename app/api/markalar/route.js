import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm markaları getir (veya kategoriye göre filtrele)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const kategoriId = searchParams.get('kategori');

        let query;
        let params = [];

        if (kategoriId) {
            // Sadece bu kategoride ürün olan markaları getir
            query = `
                SELECT m.*, COUNT(DISTINCT u.id) as urun_sayisi
                FROM markalar m
                INNER JOIN urunler u ON m.id = u.marka_id
                WHERE m.aktif = 1 AND u.aktif = 1 AND u.kategori_id = ?
                GROUP BY m.id
                ORDER BY m.sira ASC, m.ad ASC
            `;
            params = [kategoriId];
        } else {
            // Tüm aktif markaları getir
            query = `
                SELECT m.*, COUNT(DISTINCT u.id) as urun_sayisi
                FROM markalar m
                LEFT JOIN urunler u ON m.id = u.marka_id
                WHERE m.aktif = 1
                GROUP BY m.id
                ORDER BY m.sira ASC, m.ad ASC
            `;
        }

        const [rows] = await pool.query(query, params);

        // Admin panel uyumluluğu için alias ekle
        const result = rows.map(row => ({
            ...row,
            name: row.ad,
            description: row.aciklama,
            status: row.aktif ? 'Aktif' : 'Pasif',
            sort_order: row.sira
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// POST - Yeni marka ekle
export async function POST(request) {
    try {
        // İlişki tablosunu oluştur (Veritabanında yoksa)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS marka_kategorileri (
                marka_id INT NOT NULL,
                kategori_id INT NOT NULL,
                PRIMARY KEY (marka_id, kategori_id),
                FOREIGN KEY (marka_id) REFERENCES markalar(id) ON DELETE CASCADE,
                FOREIGN KEY (kategori_id) REFERENCES kategoriler(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Veri Migrasyonu: Tablo boşsa, mevcut ürünlerden ilişkileri doldur
        const [count] = await pool.query('SELECT COUNT(*) as count FROM marka_kategorileri');
        if (count[0].count === 0) {
            await pool.query(`
                INSERT IGNORE INTO marka_kategorileri (marka_id, kategori_id)
                SELECT DISTINCT marka_id, kategori_id 
                FROM urunler 
                WHERE marka_id IS NOT NULL AND kategori_id IS NOT NULL
            `);
        }

        const data = await request.json();
        const ad = data.ad || data.name;
        const slug = data.slug;
        const logo = data.logo;
        const aciklama = data.aciklama || data.description;
        const website = data.website;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const sira = data.sira || data.sort_order || 0;
        const kategoriler = data.kategoriler || []; // Kategori ID listesi

        // Slug otomatik oluştur
        const finalSlug = slug || ad.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

        const [result] = await pool.query(
            'INSERT INTO markalar (ad, slug, logo, aciklama, website, aktif, sira) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ad, finalSlug, logo, aciklama, website, aktif, sira]
        );

        const markaId = result.insertId;

        // Kategorileri kaydet
        if (kategoriler.length > 0) {
            const values = kategoriler.map(kategoriId => [markaId, kategoriId]);
            await pool.query(
                'INSERT INTO marka_kategorileri (marka_id, kategori_id) VALUES ?',
                [values]
            );
        }

        return NextResponse.json({
            message: 'Marka başarıyla eklendi',
            id: markaId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json({ error: 'Bu slug zaten kullanılıyor' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Marka eklenirken hata oluştu', message: error.message, code: error.code }, { status: 500 });
    }
}

// DELETE - Marka sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
        }

        // Önce bu markada ürün var mı kontrol et
        const [products] = await pool.query('SELECT COUNT(*) as count FROM urunler WHERE marka_id = ?', [id]);
        if (products[0].count > 0) {
            return NextResponse.json({ error: 'Bu markada ürünler var, önce ürünleri silin' }, { status: 400 });
        }

        // Markayı sil
        await pool.query('DELETE FROM markalar WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Marka başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Marka silinirken hata oluştu' }, { status: 500 });
    }
}
