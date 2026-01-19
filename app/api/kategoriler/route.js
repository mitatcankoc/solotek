import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm kategorileri getir
export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT k.*, 
                   COUNT(DISTINCT u.id) as urun_sayisi
            FROM kategoriler k
            LEFT JOIN urunler u ON k.id = u.kategori_id
            WHERE k.aktif = 1
            GROUP BY k.id
            ORDER BY k.sira ASC, k.ad ASC
        `);
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

// POST - Yeni kategori ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { ad, slug, icon, resim, aciklama, aktif, sira } = data;

        // Slug otomatik oluştur
        const finalSlug = slug || ad.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

        const [result] = await pool.query(
            'INSERT INTO kategoriler (ad, slug, icon, resim, aciklama, aktif, sira) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ad, finalSlug, icon || 'fa-box', resim, aciklama, aktif ?? 1, sira || 0]
        );

        return NextResponse.json({
            message: 'Kategori başarıyla eklendi',
            id: result.insertId
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json({ error: 'Bu slug zaten kullanılıyor' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Kategori eklenirken hata oluştu' }, { status: 500 });
    }
}

// DELETE - Kategori sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
        }

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
