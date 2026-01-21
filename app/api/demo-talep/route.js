import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendDemoRequestEmail } from '@/lib/email';

// GET - Tüm demo taleplerini getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM demo_talep ORDER BY created_at DESC');

        // Veritabanı kolonlarını frontend isimleriyle map et
        const mappedRows = rows.map(row => ({
            id: row.id,
            name: row.ad_soyad,
            email: row.email,
            phone: row.telefon,
            company: row.firma,
            sector: row.sektor,
            product: row.urun_ilgi,
            message: row.mesaj,
            demo_type: row.demo_turu,
            status: row.durum || 'Yeni',
            notes: row.notlar,
            created_at: row.created_at
        }));

        return NextResponse.json(mappedRows);
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

        // Frontend ve database uyumluluğu
        const ad_soyad = data.ad_soyad || data.name;
        const email = data.email;
        const telefon = data.telefon || data.phone;
        const firma = data.firma || data.company;
        const sektor = data.sektor;
        const urun_ilgi = data.urun_ilgi || data.product;
        const mesaj = data.mesaj || data.message;

        const ip_adresi = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;

        const [result] = await pool.query(
            'INSERT INTO demo_talep (ad_soyad, email, telefon, firma, sektor, urun_ilgi, mesaj, durum, ip_adresi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ad_soyad, email, telefon, firma || null, sektor || null, urun_ilgi || null, mesaj || null, 'beklemede', ip_adresi]
        );

        // Email gönder
        try {
            await sendDemoRequestEmail({ ad_soyad, email, telefon, firma, sektor, urun_ilgi, mesaj });
            console.log('Demo talep email gönderildi:', email);
        } catch (emailError) {
            console.error('Email gönderilemedi:', emailError);
            // Email hatası olsa bile form başarılı kabul edilsin
        }

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
        const { id, status, durum, notlar, notes } = data;

        // Frontend 'status' gönderiyor, veritabanda 'durum' olarak kaydedilmeli
        const newDurum = status || durum;
        const newNotlar = notes || notlar;

        if (newNotlar) {
            await pool.query('UPDATE demo_talep SET durum = ?, notlar = ? WHERE id = ?', [newDurum, newNotlar, id]);
        } else {
            await pool.query('UPDATE demo_talep SET durum = ? WHERE id = ?', [newDurum, id]);
        }
        return NextResponse.json({ message: 'Durum güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
