import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm referansları getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM referanslar ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// POST - Yeni referans ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { name, description, logo, website } = data;

        const [result] = await pool.query(
            'INSERT INTO referanslar (name, description, logo, website) VALUES (?, ?, ?, ?)',
            [name, description, logo, website]
        );

        return NextResponse.json({
            message: 'Referans başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans eklenirken hata oluştu' }, { status: 500 });
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
