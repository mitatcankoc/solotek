import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek marka getir
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        // Önce slug ile ara, bulamazsan id ile ara
        let [rows] = await pool.query('SELECT * FROM markalar WHERE slug = ?', [id]);

        if (rows.length === 0) {
            [rows] = await pool.query('SELECT * FROM markalar WHERE id = ?', [id]);
        }

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Marka bulunamadı' }, { status: 404 });
        }

        // Bu markanın kategorilerini de getir
        const [kategoriler] = await pool.query(`
            SELECT uk.* FROM urun_kategorileri uk
            INNER JOIN kategori_marka km ON uk.id = km.kategori_id
            WHERE km.marka_id = ?
            ORDER BY uk.sort_order ASC, uk.name ASC
        `, [rows[0].id]);

        return NextResponse.json({ ...rows[0], kategoriler });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// PUT - Marka güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const { name, slug, logo, description, website, status, sort_order, kategoriler } = data;

        // Markayı güncelle
        await pool.query(
            'UPDATE markalar SET name=?, slug=?, logo=?, description=?, website=?, status=?, sort_order=? WHERE id=?',
            [name, slug, logo, description, website, status, sort_order, id]
        );

        // Eğer kategoriler gönderildiyse, ilişkileri güncelle
        if (kategoriler && Array.isArray(kategoriler)) {
            // Mevcut ilişkileri sil
            await pool.query('DELETE FROM kategori_marka WHERE marka_id = ?', [id]);

            // Yeni ilişkileri ekle
            for (const kategoriId of kategoriler) {
                await pool.query('INSERT INTO kategori_marka (kategori_id, marka_id) VALUES (?, ?)', [kategoriId, id]);
            }
        }

        return NextResponse.json({ message: 'Marka başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Marka güncellenirken hata oluştu' }, { status: 500 });
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

        // Kategori-marka ilişkilerini sil
        await pool.query('DELETE FROM kategori_marka WHERE marka_id = ?', [id]);

        // Markayı sil
        await pool.query('DELETE FROM markalar WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Marka başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Marka silinirken hata oluştu' }, { status: 500 });
    }
}
