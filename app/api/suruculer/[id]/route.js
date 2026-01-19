import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek sürücü getir
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const [rows] = await pool.query('SELECT * FROM suruculer WHERE id = ?', [id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Sürücü bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// PUT - Sürücü güncelle
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const { urun_adi, surucu_adi, dosya_url, dosya_boyutu, versiyon, isletim_sistemi, aciklama, status } = data;

        await pool.query(
            `UPDATE suruculer SET 
                urun_adi = ?, surucu_adi = ?, dosya_url = ?, dosya_boyutu = ?, 
                versiyon = ?, isletim_sistemi = ?, aciklama = ?, status = ?
             WHERE id = ?`,
            [urun_adi, surucu_adi, dosya_url, dosya_boyutu, versiyon, isletim_sistemi, aciklama, status, id]
        );

        return NextResponse.json({ message: 'Sürücü güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}

// DELETE - Sürücü sil
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await pool.query('DELETE FROM suruculer WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Sürücü silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 });
    }
}

// PATCH - İndirme sayısını artır
export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        await pool.query('UPDATE suruculer SET indirme_sayisi = indirme_sayisi + 1 WHERE id = ?', [id]);
        return NextResponse.json({ message: 'İndirme sayısı güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
