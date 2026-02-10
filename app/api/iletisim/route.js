import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendContactEmail } from '@/lib/email';
import { cacheQuery, invalidateCache, CACHE_KEYS } from '@/lib/cache';

// GET - Tüm iletişim mesajlarını getir
export async function GET() {
    try {
        const mappedRows = await cacheQuery(CACHE_KEYS.ILETISIM_ALL, 'iletisim', async () => {
            const [rows] = await pool.query('SELECT * FROM iletisim ORDER BY created_at DESC');

            return rows.map(row => ({
                id: row.id,
                name: row.ad_soyad,
                email: row.email,
                phone: row.telefon,
                subject: row.konu,
                message: row.mesaj,
                status: row.durum || 'Yeni',
                created_at: row.created_at
            }));
        });

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

// POST - Yeni iletişim mesajı ekle
export async function POST(request) {
    try {
        const data = await request.json();

        // Frontend ve database uyumluluğu
        const ad_soyad = data.ad_soyad || data.name;
        const email = data.email;
        const telefon = data.telefon || data.phone;
        const konu = data.konu || data.subject;
        const mesaj = data.mesaj || data.message;

        // IP adresini al
        const ip_adresi = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;

        const [result] = await pool.query(
            'INSERT INTO iletisim (ad_soyad, email, telefon, konu, mesaj, ip_adresi, durum) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ad_soyad, email, telefon || null, konu || null, mesaj, ip_adresi, 'yeni']
        );

        // Cache'i temizle
        invalidateCache('iletisim');

        // Email gönder
        try {
            await sendContactEmail({ ad_soyad, email, telefon, konu, mesaj });
            console.log('İletişim email gönderildi:', email);
        } catch (emailError) {
            console.error('Email gönderilemedi:', emailError);
            // Email hatası olsa bile form başarılı kabul edilsin
        }

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

        // Cache'i temizle
        invalidateCache('iletisim');

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
        const { id, status, durum, okundu } = data;

        // Frontend 'status' gönderiyor, veritabanda 'durum' olarak kaydedilmeli
        const newDurum = status || durum;

        if (okundu !== undefined) {
            await pool.query('UPDATE iletisim SET okundu = ?, durum = ? WHERE id = ?', [okundu ? 1 : 0, newDurum || 'Okundu', id]);
        } else {
            await pool.query('UPDATE iletisim SET durum = ? WHERE id = ?', [newDurum, id]);
        }

        // Cache'i temizle
        invalidateCache('iletisim');

        return NextResponse.json({ message: 'Durum güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
