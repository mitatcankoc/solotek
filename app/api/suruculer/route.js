import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheQuery, invalidateCache, CACHE_KEYS } from '@/lib/cache';

// GET - Tüm sürücüleri getir (arama ve filtre destekli)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const kategoriId = searchParams.get('kategori');
        const markaId = searchParams.get('marka');
        const status = searchParams.get('status');

        // Filtreli sorgular için benzersiz cache key oluştur
        const filterKey = `${status||''}_${search||''}_${kategoriId||''}_${markaId||''}`;
        const cacheKey = filterKey === '___' ? CACHE_KEYS.SURUCULER_ALL : CACHE_KEYS.SURUCULER_FILTERED(filterKey);

        const result = await cacheQuery(cacheKey, 'suruculer', async () => {
            let query = 'SELECT s.*, k.ad as kategori_adi, m.ad as marka_adi FROM suruculer s LEFT JOIN kategoriler k ON s.kategori_id = k.id LEFT JOIN markalar m ON s.marka_id = m.id WHERE 1=1';
            const params = [];

            if (status === 'Aktif') {
                query += ' AND s.aktif = 1';
            }

            if (search) {
                query += ' AND (s.baslik LIKE ? OR s.aciklama LIKE ? OR s.model LIKE ?)';
                params.push(`%${search}%`, `%${search}%`, `%${search}%`);
            }

            if (kategoriId) {
                query += ' AND s.kategori_id = ?';
                params.push(kategoriId);
            }

            if (markaId) {
                query += ' AND s.marka_id = ?';
                params.push(markaId);
            }

            query += ' ORDER BY s.baslik ASC, s.created_at DESC';

            const [rows] = await pool.query(query, params);

            return rows.map(row => ({
                ...row,
                urun_adi: row.model || '',
                surucu_adi: row.baslik || '',
                status: row.aktif ? 'Aktif' : 'Pasif'
            }));
        });

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
        const kategori_id = data.kategori_id || null;
        const marka_id = data.marka_id || null;

        const [result] = await pool.query(
            `INSERT INTO suruculer (baslik, model, aciklama, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, aktif, kategori_id, marka_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [baslik, model, aciklama, versiyon, isletim_sistemi, dosya_url, dosya_boyutu, aktif === 0 ? 0 : 1, kategori_id, marka_id]
        );

        // Cache'i temizle
        invalidateCache('suruculer');

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

        // Cache'i temizle
        invalidateCache('suruculer');

        return NextResponse.json({ message: 'Sürücü başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Sürücü silinirken hata oluştu' }, { status: 500 });
    }
}
