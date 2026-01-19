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

        return NextResponse.json(rows);
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
        const {
            name, slug, kategori_id, marka_id, short_description, description,
            image, gallery, features, specifications, documents, accessories,
            price, status, featured, sort_order, meta_title, meta_description
        } = data;

        // Slug otomatik oluştur
        const finalSlug = slug || name.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

        const [result] = await pool.query(
            `INSERT INTO urunler (name, slug, kategori_id, marka_id, short_description, description, 
             image, gallery, features, specifications, documents, accessories, price, status, featured, sort_order, meta_title, meta_description) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name, finalSlug, kategori_id, marka_id, short_description, description,
                image,
                gallery ? JSON.stringify(gallery) : null,
                features ? JSON.stringify(features) : null,
                specifications ? JSON.stringify(specifications) : null,
                documents ? JSON.stringify(documents) : null,
                accessories ? JSON.stringify(accessories) : null,
                price, status || 'Aktif', featured || false, sort_order || 0,
                meta_title, meta_description
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
        return NextResponse.json({ error: 'Ürün eklenirken hata oluştu' }, { status: 500 });
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
