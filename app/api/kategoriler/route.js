import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tüm kategorileri getir
export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT uk.*, 
                   COUNT(DISTINCT km.marka_id) as marka_sayisi,
                   COUNT(DISTINCT u.id) as urun_sayisi
            FROM urun_kategorileri uk
            LEFT JOIN kategori_marka km ON uk.id = km.kategori_id
            LEFT JOIN urunler u ON uk.id = u.kategori_id
            GROUP BY uk.id
            ORDER BY uk.sort_order ASC, uk.name ASC
        `);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// POST - Yeni kategori ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { name, slug, icon, image, description, status, sort_order } = data;

        // Slug otomatik oluştur
        const finalSlug = slug || name.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

        const [result] = await pool.query(
            'INSERT INTO urun_kategorileri (name, slug, icon, image, description, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, finalSlug, icon || 'fa-box', image, description, status || 'Aktif', sort_order || 0]
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

        // Kategori-marka ilişkilerini sil
        await pool.query('DELETE FROM kategori_marka WHERE kategori_id = ?', [id]);

        // Kategoriyi sil
        await pool.query('DELETE FROM urun_kategorileri WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Kategori başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Kategori silinirken hata oluştu' }, { status: 500 });
    }
}
