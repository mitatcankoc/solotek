import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek ürün getir
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        // Önce slug ile ara, bulamazsan id ile ara
        let [rows] = await pool.query(`
            SELECT u.*, 
                   k.ad as kategori_adi, k.slug as kategori_slug,
                   m.ad as marka_adi, m.slug as marka_slug, m.logo as marka_logo
            FROM urunler u
            LEFT JOIN kategoriler k ON u.kategori_id = k.id
            LEFT JOIN markalar m ON u.marka_id = m.id
            WHERE u.slug = ?
        `, [id]);

        if (rows.length === 0) {
            [rows] = await pool.query(`
                SELECT u.*, 
                       k.ad as kategori_adi, k.slug as kategori_slug,
                       m.ad as marka_adi, m.slug as marka_slug, m.logo as marka_logo
                FROM urunler u
                LEFT JOIN kategoriler k ON u.kategori_id = k.id
                LEFT JOIN markalar m ON u.marka_id = m.id
                WHERE u.id = ?
            `, [id]);
        }

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// PUT - Ürün güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const {
            ad, slug, kategori_id, marka_id, kisa_aciklama, aciklama,
            resim, galeri, ozellikler, dokumanlar, aksesuarlar,
            fiyat, aktif, one_cikan, sira, meta_title, meta_description
        } = data;

        await pool.query(
            `UPDATE urunler SET 
             ad=?, slug=?, kategori_id=?, marka_id=?, kisa_aciklama=?, aciklama=?,
             resim=?, galeri=?, ozellikler=?, dokumanlar=?, aksesuarlar=?,
             fiyat=?, aktif=?, one_cikan=?, sira=?, meta_title=?, meta_description=?
             WHERE id=?`,
            [
                ad, slug, kategori_id, marka_id, kisa_aciklama, aciklama,
                resim,
                galeri ? JSON.stringify(galeri) : null,
                ozellikler ? JSON.stringify(ozellikler) : null,
                dokumanlar ? JSON.stringify(dokumanlar) : null,
                aksesuarlar ? JSON.stringify(aksesuarlar) : null,
                fiyat, aktif ?? 1, one_cikan ?? 0, sira ?? 0,
                meta_title, meta_description,
                id
            ]
        );

        return NextResponse.json({ message: 'Ürün başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ürün güncellenirken hata oluştu', message: error.message }, { status: 500 });
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
