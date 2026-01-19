import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm demo taleplerini getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM demo_talep ORDER BY created_at DESC');
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

// POST - Yeni demo talebi ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { ad_soyad, email, telefon, firma, sektor, urun_ilgi, mesaj } = data;

        const ip_adresi = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;

        const [result] = await pool.query(
            'INSERT INTO demo_talep (ad_soyad, email, telefon, firma, sektor, urun_ilgi, mesaj, durum, ip_adresi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ad_soyad, email, telefon, firma || null, sektor || null, urun_ilgi || null, mesaj || null, 'beklemede', ip_adresi]
        );

        return NextResponse.json({
            message: 'Demo talebiniz alındı',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Demo talebi gönderilemedi', message: error.message }, { status: 500 });
    }
}

// DELETE - Demo talebi sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        await pool.query('DELETE FROM demo_talep WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Talep silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Silme işlemi başarısız' }, { status: 500 });
    }
}

// PUT - Demo talebi durumunu güncelle
export async function PUT(request) {
    try {
        const data = await request.json();
        const { id, durum, notlar } = data;

        if (notlar) {
            await pool.query('UPDATE demo_talep SET durum = ?, notlar = ? WHERE id = ?', [durum, notlar, id]);
        } else {
            await pool.query('UPDATE demo_talep SET durum = ? WHERE id = ?', [durum, id]);
        }
        return NextResponse.json({ message: 'Durum güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
