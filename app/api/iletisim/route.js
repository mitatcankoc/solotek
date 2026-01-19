import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm iletişim mesajlarını getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM iletisim ORDER BY created_at DESC');
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

// POST - Yeni iletişim mesajı ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { ad_soyad, email, telefon, konu, mesaj } = data;

        // IP adresini al
        const ip_adresi = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;

        const [result] = await pool.query(
            'INSERT INTO iletisim (ad_soyad, email, telefon, konu, mesaj, ip_adresi, durum) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ad_soyad, email, telefon || null, konu || null, mesaj, ip_adresi, 'yeni']
        );

        return NextResponse.json({
            message: 'Mesajınız başarıyla gönderildi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Mesaj gönderilemedi', message: error.message }, { status: 500 });
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
        const { id, durum, okundu } = data;

        if (okundu !== undefined) {
            await pool.query('UPDATE iletisim SET okundu = ?, durum = ? WHERE id = ?', [okundu ? 1 : 0, durum || 'okundu', id]);
        } else {
            await pool.query('UPDATE iletisim SET durum = ? WHERE id = ?', [durum, id]);
        }
        return NextResponse.json({ message: 'Durum güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
