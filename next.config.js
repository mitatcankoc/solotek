/** @type {import('next').NextConfig} */
const nextConfig = {
    // Sıkıştırmayı aç (Gzip/Brotli)
    compress: true,

    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
        // CSS optimizasyonu
        optimizeCss: false,
    },

    // Görsel optimizasyonu
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        minimumCacheTTL: 86400,
    },

    // Powered by header'ını kaldır (küçük boyut tasarrufu)
    poweredByHeader: false,

    // Cache header'ları - optimize
    async headers() {
        return [
            // Static assets - uzun cache
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            // Statik dosyalar (img, css, js, fonts) - uzun cache
            {
                source: '/assets/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=2592000, stale-while-revalidate=86400',
                    },
                ],
            },
            // Upload edilen dosyalar - uzun cache
            {
                source: '/uploads/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=2592000, stale-while-revalidate=86400',
                    },
                ],
            },
            // HTML sayfaları - kısa cache, revalidation ile
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
