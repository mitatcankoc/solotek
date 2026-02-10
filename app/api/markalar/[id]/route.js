import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheQuery, invalidateCache, CACHE_KEYS } from '@/lib/cache';

// Marka kategorileri tablosunu oluştur (Helper function)
async function ensureTableExists() {
    // 1. Tabloyu oluştur
    await pool.query(`
        CREATE TABLE IF NOT EXISTS marka_kategorileri (
            marka_id INT NOT NULL,
            kategori_id INT NOT NULL,
            PRIMARY KEY (marka_id, kategori_id),
            FOREIGN KEY (marka_id) REFERENCES markalar(id) ON DELETE CASCADE,
            FOREIGN KEY (kategori_id) REFERENCES kategoriler(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Veri Migrasyonu: Tablo boşsa, mevcut ürünlerden ilişkileri doldur
    // Bu sayede mevcut ürünlerin marka-kategori ilişkileri kaybolmaz
    const [count] = await pool.query('SELECT COUNT(*) as count FROM marka_kategorileri');
    if (count[0].count === 0) {
        await pool.query(`
            INSERT IGNORE INTO marka_kategorileri (marka_id, kategori_id)
            SELECT DISTINCT marka_id, kategori_id 
            FROM urunler 
            WHERE marka_id IS NOT NULL AND kategori_id IS NOT NULL
        `);
        console.log('Marka-Kategori ilişkileri ürünlerden otomatik oluşturuldu.');
    }
}

// GET - Tek marka getir
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        // Tablo kontrolü yap
        await ensureTableExists();

        const marka = await cacheQuery(CACHE_KEYS.MARKA_DETAIL(id), 'markalar', async () => {
            // Önce slug ile ara, bulamazsan id ile ara
            let [rows] = await pool.query('SELECT * FROM markalar WHERE slug = ?', [id]);

            if (rows.length === 0) {
                [rows] = await pool.query('SELECT * FROM markalar WHERE id = ?', [id]);
            }

            if (rows.length === 0) {
                return null;
            }

            const markaId = rows[0].id;

            // Önce ilişkili tablodan kategorileri çek
            let [kategoriler] = await pool.query(`
                SELECT k.*, k.ad as name 
                FROM kategoriler k
                INNER JOIN marka_kategorileri mk ON k.id = mk.kategori_id
                WHERE mk.marka_id = ?
            `, [markaId]);

            // Eğer ilişki tablosunda kayıt yoksa, eski yöntemle (ürünler üzerinden) çekip kullanıcıya göster
            if (kategoriler.length === 0) {
                [kategoriler] = await pool.query(`
                    SELECT DISTINCT k.*, k.ad as name FROM kategoriler k
                    INNER JOIN urunler u ON k.id = u.kategori_id
                    WHERE u.marka_id = ? AND k.aktif = 1
                    ORDER BY k.sira ASC, k.ad ASC
                `, [markaId]);
            }

            return {
                ...rows[0],
                name: rows[0].ad,
                description: rows[0].aciklama,
                status: rows[0].aktif ? 'Aktif' : 'Pasif',
                sort_order: rows[0].sira,
                kategoriler
            };
        });

        if (!marka) {
            return NextResponse.json({ error: 'Marka bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(marka);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// PUT - Marka güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();

        // Tablo kontrolü yap
        await ensureTableExists();

        // Admin panel ve database uyumluluğu
        const ad = data.ad || data.name;
        const slug = data.slug;
        const logo = data.logo;
        const aciklama = data.aciklama || data.description;
        const website = data.website;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const sira = data.sira || data.sort_order || 0;
        const kategoriler = data.kategoriler || []; // Kategori ID listesi

        await pool.query(
            'UPDATE markalar SET ad=?, slug=?, logo=?, aciklama=?, website=?, aktif=?, sira=? WHERE id=?',
            [ad, slug, logo, aciklama, website, aktif, sira, id]
        );

        // Kategorileri güncelle (Sil ve yeniden ekle)
        // 1. Mevcut ilişkileri sil
        await pool.query('DELETE FROM marka_kategorileri WHERE marka_id = ?', [id]);

        // 2. Yeni ilişkileri ekle
        if (kategoriler.length > 0) {
            const values = kategoriler.map(kategoriId => [id, kategoriId]);
            await pool.query(
                'INSERT INTO marka_kategorileri (marka_id, kategori_id) VALUES ?',
                [values]
            );
        }

        // Cache'i temizle
        invalidateCache('markalar');

        return NextResponse.json({ message: 'Marka başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Marka güncellenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Marka sil
export async function DELETE(request, context) {
    try {
        const { id } = await context.params;

        // Önce bu markada ürün var mı kontrol et
        const [products] = await pool.query('SELECT COUNT(*) as count FROM urunler WHERE marka_id = ?', [id]);
        if (products[0].count > 0) {
            return NextResponse.json({ error: 'Bu markada ürünler var, önce ürünleri silin' }, { status: 400 });
        }

        // Markayı sil
        await pool.query('DELETE FROM markalar WHERE id = ?', [id]);

        // Cache'i temizle
        invalidateCache('markalar');

        return NextResponse.json({ message: 'Marka başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Marka silinirken hata oluştu' }, { status: 500 });
    }
}
