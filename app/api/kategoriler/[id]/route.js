import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek kategori getir
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        // Önce slug ile ara, bulamazsan id ile ara
        let [rows] = await pool.query('SELECT * FROM kategoriler WHERE slug = ?', [id]);

        if (rows.length === 0) {
            [rows] = await pool.query('SELECT * FROM kategoriler WHERE id = ?', [id]);
        }

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 });
        }

        // Bu kategorideki markaları ürünler üzerinden getir
        const [markalar] = await pool.query(`
            SELECT DISTINCT m.*, m.ad as name FROM markalar m
            INNER JOIN urunler u ON m.id = u.marka_id
            WHERE u.kategori_id = ? AND m.aktif = 1
            ORDER BY m.sira ASC, m.ad ASC
        `, [rows[0].id]);

        // Admin panel uyumluluğu için alias ekle
        const kategori = {
            ...rows[0],
            name: rows[0].ad,
            description: rows[0].aciklama,
            image: rows[0].resim,
            status: rows[0].aktif ? 'Aktif' : 'Pasif',
            sort_order: rows[0].sira,
            markalar
        };

        return NextResponse.json(kategori);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// PUT - Kategori güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();

        // Admin panel ve database uyumluluğu
        const ad = data.ad || data.name;
        const slug = data.slug;
        const icon = data.icon;
        const resim = data.resim || data.image;
        const aciklama = data.aciklama || data.description;
        const aktif = data.status === 'Aktif' || data.aktif === 1 ? 1 : (data.status === 'Pasif' ? 0 : 1);
        const sira = data.sira || data.sort_order || 0;

        await pool.query(
            'UPDATE kategoriler SET ad=?, slug=?, icon=?, resim=?, aciklama=?, aktif=?, sira=? WHERE id=?',
            [ad, slug, icon, resim, aciklama, aktif, sira, id]
        );

        return NextResponse.json({ message: 'Kategori başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Kategori güncellenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Kategori sil
export async function DELETE(request, context) {
    try {
        const { id } = await context.params;

        // Önce bu kategoride ürün var mı kontrol et
        const [products] = await pool.query('SELECT COUNT(*) as count FROM urunler WHERE kategori_id = ?', [id]);
        if (products[0].count > 0) {
            return NextResponse.json({ error: 'Bu kategoride ürünler var, önce ürünleri silin' }, { status: 400 });
        }

        // Kategoriyi sil
        await pool.query('DELETE FROM kategoriler WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Kategori başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Kategori silinirken hata oluştu' }, { status: 500 });
    }
}
