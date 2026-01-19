import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek kategori getir
export async function GET(request, context) {
    try {
        const { id } = await context.params;

        // Önce slug ile ara, bulamazsan id ile ara
        let [rows] = await pool.query('SELECT * FROM urun_kategorileri WHERE slug = ?', [id]);

        if (rows.length === 0) {
            [rows] = await pool.query('SELECT * FROM urun_kategorileri WHERE id = ?', [id]);
        }

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 });
        }

        // Bu kategorideki markaları da getir
        const [markalar] = await pool.query(`
            SELECT m.* FROM markalar m
            INNER JOIN kategori_marka km ON m.id = km.marka_id
            WHERE km.kategori_id = ?
            ORDER BY m.sort_order ASC, m.name ASC
        `, [rows[0].id]);

        return NextResponse.json({ ...rows[0], markalar });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// PUT - Kategori güncelle
export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const { name, slug, icon, image, description, status, sort_order, markalar } = data;

        // Kategoriyi güncelle
        await pool.query(
            'UPDATE urun_kategorileri SET name=?, slug=?, icon=?, image=?, description=?, status=?, sort_order=? WHERE id=?',
            [name, slug, icon, image, description, status, sort_order, id]
        );

        // Eğer markalar gönderildiyse, ilişkileri güncelle
        if (markalar && Array.isArray(markalar)) {
            // Mevcut ilişkileri sil
            await pool.query('DELETE FROM kategori_marka WHERE kategori_id = ?', [id]);

            // Yeni ilişkileri ekle
            for (const markaId of markalar) {
                await pool.query('INSERT INTO kategori_marka (kategori_id, marka_id) VALUES (?, ?)', [id, markaId]);
            }
        }

        return NextResponse.json({ message: 'Kategori başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Kategori güncellenirken hata oluştu' }, { status: 500 });
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
