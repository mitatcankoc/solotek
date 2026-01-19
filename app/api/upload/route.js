import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Dosya adından SEO uyumlu alt text oluştur
function generateAltText(fileName, type) {
    // Dosya uzantısını kaldır
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');

    // Alt çizgi ve tire ile kelimelere böl
    let words = nameWithoutExt
        .replace(/[_-]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase'i ayır
        .toLowerCase()
        .split(' ')
        .filter(word => word.length > 0);

    // Tür bazlı ön ek ekle
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

    // Kelimeleri birleştir
    if (words.length > 0) {
        // İlk harfi büyük yap
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return `${prefix} - ${words.join(' ')}`;
    }

    return `${prefix} - Solo Teknoloji`;
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type') || 'general'; // blog, referans, general
        const customAltText = formData.get('altText'); // İstersen özel alt text gönderebilirsin

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Dosya adını düzenle
        const originalName = file.name;
        const extension = path.extname(originalName);
        const timestamp = Date.now();
        const fileName = `${type}_${timestamp}${extension}`;

        // Klasör yolu
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', type);

        // Klasör yoksa oluştur
        await mkdir(uploadDir, { recursive: true });

        // Dosyayı kaydet
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Public URL döndür
        const publicUrl = `/uploads/${type}/${fileName}`;

        // Alt text oluştur
        const altText = customAltText || generateAltText(originalName, type);

        return NextResponse.json({
            message: 'Dosya başarıyla yüklendi',
            url: publicUrl,
            fileName: fileName,
            altText: altText,
            originalName: originalName
        });
    } catch (error) {
        console.error('Upload hatası:', error);
        return NextResponse.json({ error: 'Dosya yüklenirken hata oluştu' }, { status: 500 });
    }
}

