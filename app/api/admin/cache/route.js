import { NextResponse } from 'next/server';
import { getCacheStats, cacheFlushAll, invalidateCache, resetCacheStats } from '@/lib/cache';

/**
 * Admin Cache Yönetim API
 * 
 * GET  - Cache istatistiklerini getir
 * POST - Cache temizle (belirli namespace veya tümü)
 */

// GET - Cache istatistikleri
export async function GET() {
    try {
        const stats = getCacheStats();
        return NextResponse.json({
            success: true,
            cache: stats
        });
    } catch (error) {
        console.error('Cache stats hatası:', error);
        return NextResponse.json({ error: 'Cache istatistikleri alınamadı' }, { status: 500 });
    }
}

// POST - Cache temizle
export async function POST(request) {
    try {
        const data = await request.json();
        const { action, namespace } = data;

        switch (action) {
            case 'flush_all':
                // Tüm cache'i temizle
                cacheFlushAll();
                return NextResponse.json({
                    success: true,
                    message: 'Tüm cache başarıyla temizlendi'
                });

            case 'flush_namespace':
                // Belirli bir namespace'i temizle
                if (!namespace) {
                    return NextResponse.json({ error: 'Namespace belirtilmeli' }, { status: 400 });
                }
                invalidateCache(namespace);
                return NextResponse.json({
                    success: true,
                    message: `"${namespace}" cache başarıyla temizlendi`
                });

            case 'reset_stats':
                // İstatistikleri sıfırla
                resetCacheStats();
                return NextResponse.json({
                    success: true,
                    message: 'Cache istatistikleri sıfırlandı'
                });

            default:
                return NextResponse.json({
                    error: 'Geçersiz action. Kullanılabilir: flush_all, flush_namespace, reset_stats'
                }, { status: 400 });
        }
    } catch (error) {
        console.error('Cache yönetim hatası:', error);
        return NextResponse.json({ error: 'Cache işlemi başarısız', message: error.message }, { status: 500 });
    }
}
