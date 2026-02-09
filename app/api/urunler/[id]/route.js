import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek ürün getir
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        // Önce slug ile ara, bulamazsan id ile ara
        let [rows] = await pool.query(`
            SELECT u.*, 
                   k.ad as kategori_adi, k.slug as kategori_slug,
                   m.ad as marka_adi, m.slug as marka_slug, m.logo as marka_logo
            FROM urunler u
            LEFT JOIN kategoriler k ON u.kategori_id = k.id
            LEFT JOIN markalar m ON u.marka_id = m.id
            WHERE u.slug = ?
        `, [id]);

        if (rows.length === 0) {
            [rows] = await pool.query(`
                SELECT u.*, 
                       k.ad as kategori_adi, k.slug as kategori_slug,
                       m.ad as marka_adi, m.slug as marka_slug, m.logo as marka_logo
                FROM urunler u
                LEFT JOIN kategoriler k ON u.kategori_id = k.id
                LEFT JOIN markalar m ON u.marka_id = m.id
                WHERE u.id = ?
            `, [id]);
        }

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
        }

        // JSON string alanlarını parse et
        const parseJsonField = (field) => {
            if (!field) return [];
            if (Array.isArray(field)) return field;
            try {
                const parsed = JSON.parse(field);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        };

        // Admin panel uyumluluğu için alias ekle
        const urun = {
            ...rows[0],
            name: rows[0].ad,
            short_description: rows[0].kisa_aciklama,
            description: rows[0].aciklama,
            image: rows[0].resim,
            gallery: parseJsonField(rows[0].galeri),
            features: parseJsonField(rows[0].ozellikler),
            documents: parseJsonField(rows[0].dokumanlar),
            accessories: parseJsonField(rows[0].aksesuarlar),
            status: rows[0].aktif ? 'Aktif' : 'Pasif',
            featured: rows[0].one_cikan === 1
        };

        return NextResponse.json(urun);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// PUT - Ürün güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();

        // Admin panel ve database uyumluluğu
        const ad = data.ad || data.name;
        const slug = data.slug;
        const kategori_id = data.kategori_id;
        const marka_id = data.marka_id || null; // Boş string ise null yap (FK hatası önleme)
        const kisa_aciklama = data.kisa_aciklama || data.short_description;
        const aciklama = data.aciklama || data.description;
        const resim = data.resim || data.image;
        const galeri = data.galeri || data.gallery;
        const ozellikler = data.ozellikler || data.features;
        const dokumanlar = data.dokumanlar || data.documents;
        const aksesuarlar = data.aksesuarlar || data.accessories;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const one_cikan = data.featured || data.one_cikan ? 1 : 0;
        const sira = data.sira || data.sort_order || 0;

        await pool.query(
            `UPDATE urunler SET 
             ad=?, slug=?, kategori_id=?, marka_id=?, kisa_aciklama=?, aciklama=?,
             resim=?, galeri=?, ozellikler=?, dokumanlar=?, aksesuarlar=?, aktif=?, one_cikan=?, sira=?
             WHERE id=?`,
            [
                ad, slug, kategori_id, marka_id, kisa_aciklama, aciklama,
                resim,
                galeri ? JSON.stringify(galeri) : null,
                ozellikler ? JSON.stringify(ozellikler) : null,
                dokumanlar ? JSON.stringify(dokumanlar) : null,
                aksesuarlar ? JSON.stringify(aksesuarlar) : null,
                aktif, one_cikan, sira,
                id
            ]
        );

        return NextResponse.json({ message: 'Ürün başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ürün güncellenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Ürün sil
export async function DELETE(request, context) {
    try {
        const { id } = await context.params;

        await pool.query('DELETE FROM urunler WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Ürün başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ürün silinirken hata oluştu' }, { status: 500 });
    }
}
