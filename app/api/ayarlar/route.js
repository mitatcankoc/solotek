import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheQuery, invalidateCache, CACHE_KEYS } from '@/lib/cache';

// GET - Tüm site ayarlarını getir
export async function GET() {
    try {
        const rows = await cacheQuery(CACHE_KEYS.AYARLAR_ALL, 'ayarlar', async () => {
            // Eksik ayarları kontrol et ve ekle (Seed)
            const defaults = [
                { anahtar: 'whatsapp_message', deger: 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.', tur: 'textarea', aciklama: 'WhatsApp varsayılan mesajı', grup: 'iletisim' }
            ];

            for (const setting of defaults) {
                await pool.query(`
                    INSERT IGNORE INTO site_ayarlari (anahtar, deger, tur, aciklama, grup) 
                    VALUES (?, ?, ?, ?, ?)
                `, [setting.anahtar, setting.deger, setting.tur, setting.aciklama, setting.grup]);
            }

            const [data] = await pool.query('SELECT * FROM site_ayarlari');
            return data;
        });

        return NextResponse.json(rows);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ayarlar getirilirken hata oluştu' }, { status: 500 });
    }
}

// PUT - Ayarları güncelle
export async function PUT(request) {
    try {
        const updates = await request.json();

        // updates = { "whatsapp": "+90555...", "site_adi": "Yeni Ad", ... }
        // Tek tek güncelle veya transaction kullan

        const keys = Object.keys(updates);
        if (keys.length === 0) {
            return NextResponse.json({ message: 'Güncellenecek veri yok' });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            for (const key of keys) {
                await connection.query(
                    'UPDATE site_ayarlari SET deger = ? WHERE anahtar = ?',
                    [updates[key], key]
                );
            }

            await connection.commit();

            // Cache'i temizle
            invalidateCache('ayarlar');

            return NextResponse.json({ message: 'Ayarlar başarıyla güncellendi' });
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        return NextResponse.json({ error: 'Ayarlar güncellenirken hata oluştu', message: error.message }, { status: 500 });
    }
}
