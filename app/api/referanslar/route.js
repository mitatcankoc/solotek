import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheQuery, invalidateCache, CACHE_KEYS } from '@/lib/cache';

// GET - Tüm referansları getir
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get('all');

        const cacheKey = all ? CACHE_KEYS.REFERANSLAR_ALL : CACHE_KEYS.REFERANSLAR_ACTIVE;

        const result = await cacheQuery(cacheKey, 'referanslar', async () => {
            let query = 'SELECT * FROM referanslar';
            if (!all) {
                query += ' WHERE aktif = 1';
            }
            query += ' ORDER BY sira ASC, created_at DESC';

            const [rows] = await pool.query(query);

            return rows.map(row => ({
                ...row,
                name: row.firma_adi,
                logo: row.logo_url || row.logo,
                description: row.aciklama,
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

// POST - Yeni referans ekle
export async function POST(request) {
    try {
        const data = await request.json();

        // Frontend ve database uyumluluğu
        const firma_adi = data.firma_adi || data.name;
        const slug = data.slug;
        const logo = data.logo;
        const logo_url = data.logo_url || data.logo;
        const aciklama = data.aciklama || data.description;
        const sektor = data.sektor;
        const website = data.website;
        const one_cikan = data.one_cikan || 0;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const sira = data.sira || 0;

        const [result] = await pool.query(
            'INSERT INTO referanslar (firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan, aktif, sira) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan, aktif, sira]
        );

        // Cache'i temizle
        invalidateCache('referanslar');

        return NextResponse.json({
            message: 'Referans başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans eklenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Referans sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
        }

        await pool.query('DELETE FROM referanslar WHERE id = ?', [id]);

        // Cache'i temizle
        invalidateCache('referanslar');

        return NextResponse.json({ message: 'Referans başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans silinirken hata oluştu' }, { status: 500 });
    }
}
