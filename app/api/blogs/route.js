import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Türkçe karakterleri dönüştür ve slug oluştur
function createSlug(text) {
    const turkishMap = {
        'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'I': 'I',
        'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U'
    };

    let slug = text.toLowerCase();

    for (const [tr, en] of Object.entries(turkishMap)) {
        slug = slug.replace(new RegExp(tr, 'g'), en.toLowerCase());
    }

    slug = slug
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    return slug;
}

// GET - Tüm blogları getir
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get('all');

        // Admin paneli için tüm blogları getir, yoksa sadece yayındakileri
        let query = 'SELECT * FROM blogs';
        if (!all) {
            query += ' WHERE is_published = 1';
        }
        query += ' ORDER BY created_at DESC';

        const [rows] = await pool.query(query);

        // Admin panel uyumluluğu için alias ekle
        const result = rows.map(row => ({
            ...row,
            status: row.is_published ? 'Yayında' : 'Taslak'
        }));

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

// POST - Yeni blog ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { title, excerpt, content, category, image, author, status, is_published, is_featured } = data;

        const slug = createSlug(title);

        // Admin panel status -> is_published dönüşümü
        let isPublished = is_published;
        if (status !== undefined) {
            isPublished = status === 'Yayında' ? 1 : 0;
        }

        const [result] = await pool.query(
            'INSERT INTO blogs (title, slug, excerpt, content, category, image, author, is_published, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, slug, excerpt || '', content, category, image, author || 'Admin', isPublished ?? 1, is_featured ?? 0]
        );

        return NextResponse.json({
            message: 'Blog başarıyla eklendi',
            id: result.insertId,
            slug: slug
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Blog eklenirken hata oluştu', message: error.message }, { status: 500 });
    }
}

// DELETE - Blog sil
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
        }

        await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Blog başarıyla silindi' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Blog silinirken hata oluştu' }, { status: 500 });
    }
}
