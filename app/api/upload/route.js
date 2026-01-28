import { NextResponse } from 'next/server';
import { writeFile, mkdir, access, constants } from 'fs/promises';
import path from 'path';

// Dosya adından SEO uyumlu alt text oluştur
function generateAltText(fileName, type) {
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    let words = nameWithoutExt
        .replace(/[_-]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .split(' ')
        .filter(word => word.length > 0);

    const typeLabels = {
        'blog': 'Blog görseli',
        'referans': 'Referans logosu',
        'urun': 'Ürün görseli',
        'kategori': 'Kategori görseli',
        'marka': 'Marka logosu',
        'aksesuar': 'Aksesuar görseli',
        'dokuman': 'Döküman',
        'surucu': 'Sürücü dosyası',
        'general': 'Görsel'
    };

    const prefix = typeLabels[type] || 'Görsel';

    if (words.length > 0) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return `${prefix} - ${words.join(' ')}`;
    }

    return `${prefix} - Solo Teknoloji`;
}

// Upload klasörünü belirle - Hostinger için kalıcı yol
function getUploadDir() {
    // Production'da (Hostinger) kalıcı klasör kullan
    if (process.env.NODE_ENV === 'production') {
        // Hostinger'da public_html/uploads klasörünü kullan
        return process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
    }
    // Development'ta normal public/uploads
    return path.join(process.cwd(), 'public', 'uploads');
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type') || 'general';
        const customAltText = formData.get('altText');

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const slug = formData.get('slug');

        // Dosya adını düzenle
        const originalName = file.name;
        const extension = path.extname(originalName).toLowerCase();
        const timestamp = Date.now();

        let fileName;
        if (slug) {
            // Slug varsa onu kullan: slug_timestamp.ext
            // Slug içindeki geçersiz karakterleri temizle (ekstra güvenlik)
            const cleanSlug = slug.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            fileName = `${cleanSlug}_${timestamp}${extension}`;
        } else {
            // Slug yoksa eski yöntem: type_timestamp_random.ext
            const randomStr = Math.random().toString(36).substring(2, 8);
            fileName = `${type}_${timestamp}_${randomStr}${extension}`;
        }

        // Upload klasörü
        const baseUploadDir = getUploadDir();
        const uploadDir = path.join(baseUploadDir, type);

        // Klasör yoksa oluştur
        await mkdir(uploadDir, { recursive: true });

        // Dosyayı kaydet
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Dosyanın gerçekten yazıldığını kontrol et
        try {
            await access(filePath, constants.F_OK);
        } catch {
            throw new Error('Dosya kaydedilemedi');
        }

        // Public URL döndür
        const publicUrl = `/uploads/${type}/${fileName}`;

        // Alt text oluştur
        const altText = customAltText || generateAltText(originalName, type);

        console.log(`Dosya yüklendi: ${filePath} -> ${publicUrl}`);

        return NextResponse.json({
            message: 'Dosya başarıyla yüklendi',
            url: publicUrl,
            fileName: fileName,
            altText: altText,
            originalName: originalName
        });
    } catch (error) {
        console.error('Upload hatası:', error);
        return NextResponse.json({
            error: 'Dosya yüklenirken hata oluştu',
            message: error.message
        }, { status: 500 });
    }
}
