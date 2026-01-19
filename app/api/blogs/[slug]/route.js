import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Tek blog getir (slug veya id ile)
export async function GET(request, context) {
    try {
        const { slug } = await context.params;

        // Önce slug ile ara, bulamazsan id ile ara
        let [rows] = await pool.query('SELECT * FROM blogs WHERE slug = ?', [slug]);

        if (rows.length === 0) {
            // Belki ID ile aranıyordur
            [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [slug]);
        }

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// PUT - Blog güncelle
export async function PUT(request, context) {
    try {
        const { slug } = await context.params;
        const data = await request.json();
        const { title, content, category, image, status } = data;

        // Önce slug ile bul
        let [blog] = await pool.query('SELECT id FROM blogs WHERE slug = ?', [slug]);
        if (blog.length === 0) {
            [blog] = await pool.query('SELECT id FROM blogs WHERE id = ?', [slug]);
        }

        if (blog.length === 0) {
            return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
        }

        await pool.query(
            'UPDATE blogs SET title=?, content=?, category=?, image=?, status=? WHERE id=?',
            [title, content, category, image, status, blog[0].id]
        );

        return NextResponse.json({ message: 'Blog başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Blog güncellenirken hata oluştu' }, { status: 500 });
    }
}

// DELETE - Blog sil
export async function DELETE(request, context) {
    try {
        const { slug } = await context.params;

        // Önce slug ile bul
        let [blog] = await pool.query('SELECT id FROM blogs WHERE slug = ?', [slug]);
        if (blog.length === 0) {
            [blog] = await pool.query('SELECT id FROM blogs WHERE id = ?', [slug]);
        }

        if (blog.length > 0) {
            await pool.query('DELETE FROM blogs WHERE id = ?', [blog[0].id]);
        }

        return NextResponse.json({ message: 'Blog başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Blog silinirken hata oluştu' }, { status: 500 });
    }
}
