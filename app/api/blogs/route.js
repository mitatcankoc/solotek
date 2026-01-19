import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Türkçe karakterleri dönüştür ve slug oluştur
function createSlug(text) {
    const turkishMap = {
        'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'I': 'I',
        'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U'
    };

    let slug = text.toLowerCase();

    // Türkçe karakterleri değiştir
    for (const [tr, en] of Object.entries(turkishMap)) {
        slug = slug.replace(new RegExp(tr, 'g'), en.toLowerCase());
    }

    // Özel karakterleri kaldır, boşlukları tire yap
    slug = slug
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    return slug;
}

// GET - Tüm blogları getir
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
    }
}

// POST - Yeni blog ekle
export async function POST(request) {
    try {
        const data = await request.json();
        const { title, content, category, image, status } = data;

        // Başlıktan slug oluştur
        const slug = createSlug(title);

        const [result] = await pool.query(
            'INSERT INTO blogs (title, slug, content, category, image, status) VALUES (?, ?, ?, ?, ?, ?)',
            [title, slug, content, category, image, status || 'Taslak']
        );

        return NextResponse.json({
            message: 'Blog başarıyla eklendi',
            id: result.insertId,
            slug: slug
        }, { status: 201 });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Blog eklenirken hata oluştu' }, { status: 500 });
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
