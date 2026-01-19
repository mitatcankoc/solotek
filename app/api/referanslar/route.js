import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm referansları getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM referanslar WHERE aktif = 1 ORDER BY sira ASC, created_at DESC');
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

// POST - Yeni referans ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan, sira } = data;

        const [result] = await pool.query(
            'INSERT INTO referanslar (firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan, aktif, sira) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)',
            [firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan || 0, sira || 0]
        );

        return NextResponse.json({
            message: 'Referans başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans eklenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Referans sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
        }

        await pool.query('DELETE FROM referanslar WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Referans başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans silinirken hata oluştu' }, { status: 500 });
    }
}
