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

        // Bu markanın kategorilerini ürünler üzerinden getir
        const [kategoriler] = await pool.query(`
            SELECT DISTINCT k.* FROM kategoriler k
            INNER JOIN urunler u ON k.id = u.kategori_id
            WHERE u.marka_id = ? AND k.aktif = 1
            ORDER BY k.sira ASC, k.ad ASC
        `, [rows[0].id]);

        return NextResponse.json({ ...rows[0], kategoriler });
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
        const { ad, slug, logo, aciklama, website, aktif, sira } = data;

        await pool.query(
            'UPDATE markalar SET ad=?, slug=?, logo=?, aciklama=?, website=?, aktif=?, sira=? WHERE id=?',
            [ad, slug, logo, aciklama, website, aktif ?? 1, sira ?? 0, id]
        );

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

        return NextResponse.json({ message: 'Marka başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Marka silinirken hata oluştu' }, { status: 500 });
    }
}
