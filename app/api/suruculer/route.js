import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm sürücüleri getir (arama destekli)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');

        let query = 'SELECT * FROM suruculer WHERE aktif = 1';
        const params = [];

        if (search) {
            query += ' AND (baslik LIKE ? OR aciklama LIKE ? OR model LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY baslik ASC, created_at DESC';

        const [rows] = await pool.query(query, params);

        // Admin panel uyumluluğu için alias ekle
        const result = rows.map(row => ({
            ...row,
            urun_adi: row.baslik || row.model || '',
            surucu_adi: row.baslik || '',
            status: row.aktif ? 'Aktif' : 'Pasif'
        }));

        return NextResponse.json(result);
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
        // Admin panel alanlarını destekle
        const baslik = data.baslik || data.surucu_adi || data.urun_adi;
        const model = data.model || data.urun_adi;
        const aciklama = data.aciklama;
        const versiyon = data.versiyon;
        const isletim_sistemi = data.isletim_sistemi;
        const dosya_url = data.dosya_url;
        const dosya_boyutu = data.dosya_boyutu;
        const aktif = data.status === 'Aktif' || data.aktif === 1 || data.aktif === true ? 1 : 0;

        const [result] = await pool.query(
            `INSERT INTO suruculer (baslik, model, aciklama, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, aktif) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [baslik, model, aciklama, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, aktif === 0 ? 0 : 1]
        );

        return NextResponse.json({
            message: 'Sürücü başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Sürücü eklenirken hata oluştu', message: error.message, code: error.code }, { status: 500 });
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
