import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek referans getir (id ile)
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        const [rows] = await pool.query('SELECT * FROM referanslar WHERE id = ?', [id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Referans bulunamadı' }, { status: 404 });
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

// PUT - Referans güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const { firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan, aktif, sira } = data;

        const [referans] = await pool.query('SELECT id FROM referanslar WHERE id = ?', [id]);

        if (referans.length === 0) {
            return NextResponse.json({ error: 'Referans bulunamadı' }, { status: 404 });
        }

        await pool.query(
            'UPDATE referanslar SET firma_adi=?, slug=?, logo=?, logo_url=?, aciklama=?, sektor=?, website=?, one_cikan=?, aktif=?, sira=? WHERE id=?',
            [firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan ?? 0, aktif ?? 1, sira ?? 0, id]
        );

        return NextResponse.json({ message: 'Referans başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans güncellenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Referans sil
export async function DELETE(request, context) {
    try {
        const { id } = await context.params;

        await pool.query('DELETE FROM referanslar WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Referans başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans silinirken hata oluştu' }, { status: 500 });
    }
}
