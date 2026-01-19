import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm sürücüleri getir (arama destekli)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const marka = searchParams.get('marka');

        let query = 'SELECT * FROM suruculer WHERE aktif = 1';
        const params = [];

        if (search) {
            query += ' AND (baslik LIKE ? OR aciklama LIKE ? OR model LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (marka) {
            query += ' AND marka = ?';
            params.push(marka);
        }

        query += ' ORDER BY baslik ASC, created_at DESC';

        const [rows] = await pool.query(query, params);
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

// POST - Yeni sürücü ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { baslik, slug, aciklama, kategori, marka, model, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, dosya_tipi } = data;

        const [result] = await pool.query(
            `INSERT INTO suruculer (baslik, slug, aciklama, kategori, marka, model, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, dosya_tipi, aktif) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [baslik, slug, aciklama, kategori, marka, model, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, dosya_tipi]
        );

        return NextResponse.json({
            message: 'Sürücü başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Sürücü eklenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Sürücü sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
        }

        await pool.query('DELETE FROM suruculer WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Sürücü başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Sürücü silinirken hata oluştu' }, { status: 500 });
    }
}
