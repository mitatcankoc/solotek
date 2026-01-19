import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm sürücüleri getir (arama destekli)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const status = searchParams.get('status');

        let query = 'SELECT * FROM suruculer WHERE 1=1';
        const params = [];

        if (search) {
            query += ' AND (urun_adi LIKE ? OR surucu_adi LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        query += ' ORDER BY urun_adi ASC, created_at DESC';

        const [rows] = await pool.query(query, params);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// POST - Yeni sürücü ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { urun_adi, surucu_adi, dosya_url, dosya_boyutu, versiyon, isletim_sistemi, aciklama, status } = data;

        const [result] = await pool.query(
            `INSERT INTO suruculer (urun_adi, surucu_adi, dosya_url, dosya_boyutu, versiyon, isletim_sistemi, aciklama, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [urun_adi, surucu_adi, dosya_url, dosya_boyutu || null, versiyon || null, isletim_sistemi || null, aciklama || null, status || 'Aktif']
        );

        return NextResponse.json({
            message: 'Sürücü başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Sürücü eklenirken hata oluştu' }, { status: 500 });
    }
}
