import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek ürün getir
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        // Önce slug ile ara, bulamazsan id ile ara
        let [rows] = await pool.query(`
            SELECT u.*, 
                   uk.name as kategori_adi, uk.slug as kategori_slug,
                   m.name as marka_adi, m.slug as marka_slug, m.logo as marka_logo
            FROM urunler u
            INNER JOIN urun_kategorileri uk ON u.kategori_id = uk.id
            INNER JOIN markalar m ON u.marka_id = m.id
            WHERE u.slug = ?
        `, [id]);

        if (rows.length === 0) {
            [rows] = await pool.query(`
                SELECT u.*, 
                       uk.name as kategori_adi, uk.slug as kategori_slug,
                       m.name as marka_adi, m.slug as marka_slug, m.logo as marka_logo
                FROM urunler u
                INNER JOIN urun_kategorileri uk ON u.kategori_id = uk.id
                INNER JOIN markalar m ON u.marka_id = m.id
                WHERE u.id = ?
            `, [id]);
        }

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
        }

        const product = {
            ...rows[0],
            features: rows[0].features ? JSON.parse(rows[0].features) : [],
            gallery: rows[0].gallery ? JSON.parse(rows[0].gallery) : [],
            specifications: rows[0].specifications ? JSON.parse(rows[0].specifications) : {},
            documents: rows[0].documents ? JSON.parse(rows[0].documents) : [],
            accessories: rows[0].accessories ? JSON.parse(rows[0].accessories) : []
        };

        return NextResponse.json(product);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// PUT - Ürün güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const {
            name, slug, kategori_id, marka_id, short_description, description,
            image, gallery, features, specifications, documents, accessories,
            price, status, featured, sort_order, meta_title, meta_description
        } = data;

        await pool.query(
            `UPDATE urunler SET 
             name=?, slug=?, kategori_id=?, marka_id=?, short_description=?, description=?,
             image=?, gallery=?, features=?, specifications=?, documents=?, accessories=?,
             price=?, status=?, featured=?, sort_order=?, meta_title=?, meta_description=?
             WHERE id=?`,
            [
                name, slug, kategori_id, marka_id, short_description, description,
                image,
                gallery ? JSON.stringify(gallery) : null,
                features ? JSON.stringify(features) : null,
                specifications ? JSON.stringify(specifications) : null,
                documents ? JSON.stringify(documents) : null,
                accessories ? JSON.stringify(accessories) : null,
                price, status, featured, sort_order,
                meta_title, meta_description,
                id
            ]
        );

        return NextResponse.json({ message: 'Ürün başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ürün güncellenirken hata oluştu' }, { status: 500 });
    }
}

// DELETE - Ürün sil
export async function DELETE(request, context) {
    try {
        const { id } = await context.params;

        await pool.query('DELETE FROM urunler WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Ürün başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ürün silinirken hata oluştu' }, { status: 500 });
    }
}
