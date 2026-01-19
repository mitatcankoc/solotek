import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm iletişim mesajlarını getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM iletisim ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// POST - Yeni iletişim mesajı ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { name, email, phone, subject, message } = data;

        const [result] = await pool.query(
            'INSERT INTO iletisim (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone || null, subject || null, message]
        );

        return NextResponse.json({
            message: 'Mesajınız başarıyla gönderildi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Mesaj gönderilemedi' }, { status: 500 });
    }
}

// DELETE - Mesaj sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        await pool.query('DELETE FROM iletisim WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Mesaj silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Silme işlemi başarısız' }, { status: 500 });
    }
}

// PUT - Mesaj durumunu güncelle
export async function PUT(request) {
    try {
        const data = await request.json();
        const { id, status } = data;

        await pool.query('UPDATE iletisim SET status = ? WHERE id = ?', [status, id]);
        return NextResponse.json({ message: 'Durum güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
