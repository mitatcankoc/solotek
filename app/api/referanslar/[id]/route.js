import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheQuery, invalidateCache, CACHE_KEYS } from '@/lib/cache';

// GET - Tek referans getir (id ile)
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        const referans = await cacheQuery(CACHE_KEYS.REFERANS_DETAIL(id), 'referanslar', async () => {
            const [rows] = await pool.query('SELECT * FROM referanslar WHERE id = ?', [id]);

            if (rows.length === 0) {
                return null;
            }

            return {
                ...rows[0],
                name: rows[0].firma_adi,
                logo: rows[0].logo_url || rows[0].logo,
                description: rows[0].aciklama,
                status: rows[0].aktif ? 'Aktif' : 'Pasif'
            };
        });

        if (!referans) {
            return NextResponse.json({ error: 'Referans bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(referans);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// PUT - Referans güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();

        // Admin panel ve database uyumluluğu
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

        const [referans] = await pool.query('SELECT id FROM referanslar WHERE id = ?', [id]);

        if (referans.length === 0) {
            return NextResponse.json({ error: 'Referans bulunamadı' }, { status: 404 });
        }

        await pool.query(
            'UPDATE referanslar SET firma_adi=?, slug=?, logo=?, logo_url=?, aciklama=?, sektor=?, website=?, one_cikan=?, aktif=?, sira=? WHERE id=?',
            [firma_adi, slug, logo, logo_url, aciklama, sektor, website, one_cikan, aktif, sira, id]
        );

        // Cache'i temizle
        invalidateCache('referanslar');

        return NextResponse.json({ message: 'Referans başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans güncellenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Referans sil
export async function DELETE(request, context) {
    try {
        const { id } = await context.params;

        await pool.query('DELETE FROM referanslar WHERE id = ?', [id]);

        // Cache'i temizle
        invalidateCache('referanslar');

        return NextResponse.json({ message: 'Referans başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Referans silinirken hata oluştu' }, { status: 500 });
    }
}
