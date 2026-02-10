import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheQuery, invalidateCache, CACHE_KEYS } from '@/lib/cache';

// GET - Tek blog getir (slug veya id ile)
export async function GET(request, context) {
    try {
        const { slug } = await context.params;

        const blog = await cacheQuery(CACHE_KEYS.BLOG_DETAIL(slug), 'blogs', async () => {
            // Önce slug ile ara, bulamazsan id ile ara
            let [rows] = await pool.query('SELECT * FROM blogs WHERE slug = ?', [slug]);

            if (rows.length === 0) {
                [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [slug]);
            }

            if (rows.length === 0) {
                return null;
            }

            // Görüntülenme sayısını artır (cache dışında)
            await pool.query('UPDATE blogs SET views = views + 1 WHERE id = ?', [rows[0].id]);

            return {
                ...rows[0],
                status: rows[0].is_published ? 'Yayında' : 'Taslak'
            };
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({
            error: 'Veritabanı hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// PUT - Blog güncelle
export async function PUT(request, context) {
    try {
        const { slug } = await context.params;
        const data = await request.json();
        const { title, excerpt, content, category, image, author, status, is_published, is_featured, meta_title, meta_description } = data;

        // Önce slug ile bul
        let [blog] = await pool.query('SELECT id FROM blogs WHERE slug = ?', [slug]);
        if (blog.length === 0) {
            [blog] = await pool.query('SELECT id FROM blogs WHERE id = ?', [slug]);
        }

        if (blog.length === 0) {
            return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
        }

        // Admin panel status -> is_published dönüşümü
        let isPublished = is_published;
        if (status !== undefined) {
            isPublished = status === 'Yayında' ? 1 : 0;
        }

        await pool.query(
            'UPDATE blogs SET title=?, excerpt=?, content=?, category=?, image=?, author=?, is_published=?, is_featured=?, meta_title=?, meta_description=? WHERE id=?',
            [title, excerpt, content, category, image, author, isPublished ?? 1, is_featured ?? 0, meta_title, meta_description, blog[0].id]
        );

        // Cache'i temizle
        invalidateCache('blogs');

        return NextResponse.json({ message: 'Blog başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Blog güncellenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Blog sil
export async function DELETE(request, context) {
    try {
        const { slug } = await context.params;

        let [blog] = await pool.query('SELECT id FROM blogs WHERE slug = ?', [slug]);
        if (blog.length === 0) {
            [blog] = await pool.query('SELECT id FROM blogs WHERE id = ?', [slug]);
        }

        if (blog.length > 0) {
            await pool.query('DELETE FROM blogs WHERE id = ?', [blog[0].id]);
        }

        // Cache'i temizle
        invalidateCache('blogs');

        return NextResponse.json({ message: 'Blog başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Blog silinirken hata oluştu' }, { status: 500 });
    }
}
