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

        // Admin panel uyumluluğu için alias ekle
        const surucu = {
            ...rows[0],
            urun_adi: rows[0].model || rows[0].baslik,
            surucu_adi: rows[0].baslik,
            status: rows[0].aktif ? 'Aktif' : 'Pasif'
        };

        return NextResponse.json(surucu);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// PUT - Sürücü güncelle
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();

        // Admin panel ve database uyumluluğu
        const baslik = data.baslik || data.surucu_adi || data.urun_adi;
        const model = data.model || data.urun_adi;
        const aciklama = data.aciklama;
        const versiyon = data.versiyon;
        const isletim_sistemi = data.isletim_sistemi;
        const dosya_url = data.dosya_url;
        const dosya_boyutu = data.dosya_boyutu;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const kategori_id = data.kategori_id || null;
        const marka_id = data.marka_id || null;

        await pool.query(
            `UPDATE suruculer SET 
                baslik = ?, model = ?, aciklama = ?, versiyon = ?, isletim_sistemi = ?, 
                dosya_url = ?, dosya_boyutu = ?, aktif = ?, kategori_id = ?, marka_id = ?
             WHERE id = ?`,
            [baslik, model, aciklama, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, aktif, kategori_id, marka_id, id]
        );

        return NextResponse.json({ message: 'Sürücü güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız', message: error.message }, { status: 500 });
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
