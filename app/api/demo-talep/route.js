import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm demo taleplerini getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM demo_talep ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// POST - Yeni demo talebi ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { name, email, phone, company, message, product, demo_type } = data;

        const [result] = await pool.query(
            'INSERT INTO demo_talep (name, email, phone, company, message, product, demo_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone || null, company || null, message || null, product || null, demo_type || null]
        );

        return NextResponse.json({
            message: 'Demo talebiniz alındı',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Demo talebi gönderilemedi' }, { status: 500 });
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
        const { id, status } = data;

        await pool.query('UPDATE demo_talep SET status = ? WHERE id = ?', [status, id]);
        return NextResponse.json({ message: 'Durum güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
