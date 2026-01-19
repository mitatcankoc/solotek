import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm markaları getir
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const kategoriId = searchParams.get('kategori');

        let query = `
            SELECT m.*, COUNT(DISTINCT u.id) as urun_sayisi
            FROM markalar m
            LEFT JOIN urunler u ON m.id = u.marka_id
            WHERE m.aktif = 1
            GROUP BY m.id
            ORDER BY m.sira ASC, m.ad ASC
        `;

        const [rows] = await pool.query(query);

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
        const data = await request.json();
        const ad = data.ad || data.name;
        const slug = data.slug;
        const logo = data.logo;
        const aciklama = data.aciklama || data.description;
        const website = data.website;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const sira = data.sira || data.sort_order || 0;

        // Slug otomatik oluştur
        const finalSlug = slug || ad.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

        const [result] = await pool.query(
            'INSERT INTO markalar (ad, slug, logo, aciklama, website, aktif, sira) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ad, finalSlug, logo, aciklama, website, aktif, sira]
        );

        return NextResponse.json({
            message: 'Marka başarıyla eklendi',
            id: result.insertId
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
