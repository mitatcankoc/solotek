/**
 * SoloTek - Profesyonel In-Memory Cache Sistemi
 * ================================================
 * 
 * Bu modül, veritabanı sorgularını azaltmak için sunucu tarafında
 * in-memory caching sağlar. Her veri türü için farklı TTL (Time-To-Live)
 * süreleri tanımlanmıştır.
 * 
 * Özellikler:
 * - TTL bazlı otomatik süre dolumu
 * - Namespace bazlı cache grupları (kategoriler, markalar, ürünler vb.)
 * - Yazma işlemlerinde otomatik cache invalidation
 * - İlişkili cache gruplarının zincirleme temizlenmesi
 * - Cache istatistikleri (hit/miss oranları)
 * - Admin panelden cache yönetimi
 * 
 * Kullanım:
 *   import { cache, CACHE_KEYS, invalidateCache } from '@/lib/cache';
 *   
 *   // Cache'den oku veya DB'den çek
 *   const data = cache.get('kategoriler_all');
 *   if (!data) {
 *     const [rows] = await pool.query('...');
 *     cache.set('kategoriler_all', rows);
 *   }
 *   
 *   // Veya kısayol ile:
 *   const data = await cacheQuery('kategoriler_all', 'kategoriler', async () => {
 *     const [rows] = await pool.query('...');
 *     return rows;
 *   });
 */

import NodeCache from 'node-cache';

// ============================================
// TTL Yapılandırması (saniye cinsinden)
// ============================================
export const CACHE_TTL = {
    ayarlar: 3600,        // 1 saat - Site ayarları nadiren değişir
    kategoriler: 1800,    // 30 dakika
    markalar: 1800,       // 30 dakika
    urunler: 900,         // 15 dakika - Ürünler daha sık güncellenebilir
    blogs: 600,           // 10 dakika - Blog içerikleri sık güncellenebilir
    referanslar: 1800,    // 30 dakika
    suruculer: 1800,      // 30 dakika
    iletisim: 300,        // 5 dakika - Mesajlar admin için güncel olmalı
    demo_talep: 300,      // 5 dakika
};

// ============================================
// Cache Key Tanımları
// ============================================
export const CACHE_KEYS = {
    // Ayarlar
    AYARLAR_ALL: 'ayarlar:all',

    // Kategoriler
    KATEGORILER_ALL: 'kategoriler:all',
    KATEGORI_DETAIL: (id) => `kategoriler:detail:${id}`,

    // Markalar
    MARKALAR_ALL: 'markalar:all',
    MARKALAR_BY_KATEGORI: (id) => `markalar:kategori:${id}`,
    MARKA_DETAIL: (id) => `markalar:detail:${id}`,

    // Ürünler
    URUNLER_ALL: 'urunler:all',
    URUNLER_FILTERED: (params) => `urunler:filtered:${params}`,
    URUN_DETAIL: (id) => `urunler:detail:${id}`,

    // Bloglar
    BLOGS_ALL: 'blogs:all',
    BLOGS_PUBLISHED: 'blogs:published',
    BLOG_DETAIL: (slug) => `blogs:detail:${slug}`,

    // Referanslar
    REFERANSLAR_ALL: 'referanslar:all',
    REFERANSLAR_ACTIVE: 'referanslar:active',
    REFERANS_DETAIL: (id) => `referanslar:detail:${id}`,

    // Sürücüler
    SURUCULER_ALL: 'suruculer:all',
    SURUCULER_FILTERED: (params) => `suruculer:filtered:${params}`,
    SURUCU_DETAIL: (id) => `suruculer:detail:${id}`,

    // İletişim & Demo
    ILETISIM_ALL: 'iletisim:all',
    DEMO_TALEP_ALL: 'demo_talep:all',
};

// ============================================
// İlişkili Cache Grupları
// Bir veri değiştiğinde hangi cache'ler temizlenmeli?
// ============================================
const CACHE_DEPENDENCIES = {
    kategoriler: ['kategoriler', 'markalar', 'urunler', 'suruculer'],
    markalar: ['markalar', 'kategoriler', 'urunler'],
    urunler: ['urunler', 'kategoriler', 'markalar'],
    blogs: ['blogs'],
    referanslar: ['referanslar'],
    suruculer: ['suruculer'],
    ayarlar: ['ayarlar'],
    iletisim: ['iletisim'],
    demo_talep: ['demo_talep'],
};

// ============================================
// Cache Instance (Singleton)
// ============================================
// stdTTL: Varsayılan TTL (15 dakika)
// checkperiod: Süresi dolmuş key'leri ne sıklıkla temizle (2 dakika)
// useClones: false -> Performans için referans döndür (değiştirmezsen güvenli)
// maxKeys: Maksimum cache key sayısı (-1 = sınırsız)
const cacheInstance = new NodeCache({
    stdTTL: 900,
    checkperiod: 120,
    useClones: true,
    maxKeys: 5000,
    deleteOnExpire: true,
});

// ============================================
// Cache İstatistikleri
// ============================================
const stats = {
    hits: 0,
    misses: 0,
    sets: 0,
    invalidations: 0,
    startTime: Date.now(),
};

// ============================================
// Core Cache Fonksiyonları
// ============================================

/**
 * Cache'den veri oku
 * @param {string} key - Cache key
 * @returns {any|undefined} Cache'deki veri veya undefined
 */
export function cacheGet(key) {
    const value = cacheInstance.get(key);
    if (value !== undefined) {
        stats.hits++;
        return value;
    }
    stats.misses++;
    return undefined;
}

/**
 * Cache'e veri yaz
 * @param {string} key - Cache key
 * @param {any} value - Saklanacak veri
 * @param {number} [ttl] - Özel TTL (saniye). Belirtilmezse namespace'e göre otomatik belirlenir
 */
export function cacheSet(key, value, ttl) {
    // Key'den namespace çıkar (örn: "kategoriler:all" -> "kategoriler")
    const namespace = key.split(':')[0];
    const effectiveTTL = ttl || CACHE_TTL[namespace] || 900;

    cacheInstance.set(key, value, effectiveTTL);
    stats.sets++;
}

/**
 * Belirli bir namespace'e ait tüm cache key'lerini temizle
 * İlişkili namespace'leri de zincirleme temizler
 * @param {string} namespace - Temizlenecek namespace (örn: "kategoriler")
 */
export function invalidateCache(namespace) {
    const dependentNamespaces = CACHE_DEPENDENCIES[namespace] || [namespace];
    const allKeys = cacheInstance.keys();

    let deletedCount = 0;
    for (const ns of dependentNamespaces) {
        for (const key of allKeys) {
            if (key.startsWith(ns + ':')) {
                cacheInstance.del(key);
                deletedCount++;
            }
        }
    }

    stats.invalidations++;

    console.log(`[Cache] Invalidated "${namespace}" -> ${deletedCount} key(s) cleared (deps: ${dependentNamespaces.join(', ')})`);
}

/**
 * Belirli bir key'i sil
 * @param {string} key - Silinecek key
 */
export function cacheDelete(key) {
    cacheInstance.del(key);
}

/**
 * Tüm cache'i temizle
 */
export function cacheFlushAll() {
    cacheInstance.flushAll();
    stats.invalidations++;
    console.log('[Cache] Tüm cache temizlendi');
}

// ============================================
// Yardımcı: Cache-or-Query Pattern
// ============================================

/**
 * Cache'den oku, yoksa queryFn çalıştır ve sonucu cache'le
 * Bu, en sık kullanılan pattern'dir.
 * 
 * @param {string} key - Cache key
 * @param {string} namespace - TTL belirlemek için namespace
 * @param {Function} queryFn - Cache miss durumunda çalıştırılacak async fonksiyon
 * @returns {Promise<any>} Veri (cache'den veya DB'den)
 * 
 * @example
 * const data = await cacheQuery(CACHE_KEYS.KATEGORILER_ALL, 'kategoriler', async () => {
 *   const [rows] = await pool.query('SELECT * FROM kategoriler WHERE aktif = 1');
 *   return rows;
 * });
 */
export async function cacheQuery(key, namespace, queryFn) {
    // 1. Cache'den dene
    const cached = cacheGet(key);
    if (cached !== undefined) {
        return cached;
    }

    // 2. Cache miss - DB'den çek
    const result = await queryFn();

    // 3. Sonucu cache'le
    cacheSet(key, result, CACHE_TTL[namespace]);

    return result;
}

// ============================================
// Cache İstatistikleri API
// ============================================

/**
 * Cache istatistiklerini döndür
 * @returns {Object} İstatistik bilgileri
 */
export function getCacheStats() {
    const keys = cacheInstance.keys();
    const nodeStats = cacheInstance.getStats();

    // Namespace bazlı key dağılımı
    const keysByNamespace = {};
    for (const key of keys) {
        const ns = key.split(':')[0];
        keysByNamespace[ns] = (keysByNamespace[ns] || 0) + 1;
    }

    const totalRequests = stats.hits + stats.misses;
    const hitRate = totalRequests > 0
        ? ((stats.hits / totalRequests) * 100).toFixed(1)
        : '0.0';

    return {
        // Genel istatistikler
        totalKeys: keys.length,
        hits: stats.hits,
        misses: stats.misses,
        hitRate: `${hitRate}%`,
        sets: stats.sets,
        invalidations: stats.invalidations,

        // Uptime
        uptimeSeconds: Math.floor((Date.now() - stats.startTime) / 1000),
        uptimeFormatted: formatUptime(Date.now() - stats.startTime),

        // Namespace dağılımı
        keysByNamespace,

        // Node-cache dahili istatistikler
        internalStats: nodeStats,

        // TTL yapılandırması
        ttlConfig: CACHE_TTL,

        // Tüm key'ler (debug için)
        keys: keys.map(key => {
            const ttl = cacheInstance.getTtl(key);
            return {
                key,
                ttlRemaining: ttl ? Math.floor((ttl - Date.now()) / 1000) : 0,
            };
        }),
    };
}

/**
 * İstatistikleri sıfırla
 */
export function resetCacheStats() {
    stats.hits = 0;
    stats.misses = 0;
    stats.sets = 0;
    stats.invalidations = 0;
    stats.startTime = Date.now();
}

// ============================================
// Yardımcı Fonksiyonlar
// ============================================

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}g ${hours % 24}s ${minutes % 60}d`;
    if (hours > 0) return `${hours}s ${minutes % 60}d`;
    if (minutes > 0) return `${minutes}d ${seconds % 60}sn`;
    return `${seconds}sn`;
}

// ============================================
// Varsayılan Export
// ============================================
export default {
    get: cacheGet,
    set: cacheSet,
    delete: cacheDelete,
    invalidate: invalidateCache,
    flushAll: cacheFlushAll,
    query: cacheQuery,
    stats: getCacheStats,
    resetStats: resetCacheStats,
    KEYS: CACHE_KEYS,
    TTL: CACHE_TTL,
};
