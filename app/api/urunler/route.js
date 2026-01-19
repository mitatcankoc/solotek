import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Ürünleri getir (filtreleme destekli)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const kategoriId = searchParams.get('kategori');
        const kategoriSlug = searchParams.get('kategori_slug');
        const markaId = searchParams.get('marka');
        const markaSlug = searchParams.get('marka_slug');
        const featured = searchParams.get('featured');
        const search = searchParams.get('search');
        const limit = searchParams.get('limit');

        let query = `
            SELECT u.*, 
                   k.ad as kategori_adi, k.slug as kategori_slug,
                   m.ad as marka_adi, m.slug as marka_slug, m.logo as marka_logo
            FROM urunler u
            LEFT JOIN kategoriler k ON u.kategori_id = k.id
            LEFT JOIN markalar m ON u.marka_id = m.id
            WHERE u.aktif = 1
        `;
        let params = [];

        if (kategoriId) {
            query += ' AND u.kategori_id = ?';
            params.push(kategoriId);
        }

        if (kategoriSlug) {
            query += ' AND k.slug = ?';
            params.push(kategoriSlug);
        }

        if (markaId) {
            query += ' AND u.marka_id = ?';
            params.push(markaId);
        }

        if (markaSlug) {
            query += ' AND m.slug = ?';
            params.push(markaSlug);
        }

        if (featured === 'true') {
            query += ' AND u.one_cikan = 1';
        }

        if (search) {
            query += ' AND (u.ad LIKE ? OR u.aciklama LIKE ? OR u.kisa_aciklama LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        query += ' ORDER BY u.one_cikan DESC, u.sira ASC, u.ad ASC';

        if (limit) {
            query += ` LIMIT ${parseInt(limit)}`;
        }

        const [rows] = await pool.query(query, params);

        // Admin panel uyumluluğu için alias ekle
        const result = rows.map(row => ({
            ...row,
            name: row.ad,
            short_description: row.kisa_aciklama,
            description: row.aciklama,
            image: row.resim,
            gallery: row.galeri,
            documents: row.dokumanlar,
            accessories: row.aksesuarlar,
            status: row.aktif ? 'Aktif' : 'Pasif',
            featured: row.one_cikan === 1
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

// POST - Yeni ürün ekle
export async function POST(request) {
    try {
        const data = await request.json();

        // Admin panel ve database uyumluluğu
        const ad = data.ad || data.name;
        const slug = data.slug;
        const kategori_id = data.kategori_id;
        const marka_id = data.marka_id;
        const kisa_aciklama = data.kisa_aciklama || data.short_description;
        const aciklama = data.aciklama || data.description;
        const resim = data.resim || data.image;
        const galeri = data.galeri || data.gallery;
        const dokumanlar = data.dokumanlar || data.documents;
        const aksesuarlar = data.aksesuarlar || data.accessories;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const one_cikan = data.featured || data.one_cikan ? 1 : 0;

        // Slug otomatik oluştur
        const finalSlug = slug || ad.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

        const [result] = await pool.query(
            `INSERT INTO urunler (ad, slug, kategori_id, marka_id, kisa_aciklama, aciklama,
             resim, galeri, dokumanlar, aksesuarlar, aktif, one_cikan) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                ad, finalSlug, kategori_id, marka_id, kisa_aciklama, aciklama,
                resim,
                galeri ? JSON.stringify(galeri) : null,
                dokumanlar ? JSON.stringify(dokumanlar) : null,
                aksesuarlar ? JSON.stringify(aksesuarlar) : null,
                aktif, one_cikan
            ]
        );

        return NextResponse.json({
            message: 'Ürün başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json({ error: 'Bu slug zaten kullanılıyor' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Ürün eklenirken hata oluştu', message: error.message, code: error.code }, { status: 500 });
    }
}

// DELETE - Ürün sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
        }

        await pool.query('DELETE FROM urunler WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Ürün başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ürün silinirken hata oluştu' }, { status: 500 });
    }
}
