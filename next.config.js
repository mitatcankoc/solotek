/** @type {import('next').NextConfig} */
const nextConfig = {
    // LiteSpeed ile uyumluluk icin compression kapatalim (sunucu kendi yapsin)
    compress: false,

    // Build ID'yi Next.js'in otomatik yonetmesine izin ver (Date.now() sorun yaratiyor)
    // generateBuildId kaldirildi -> default hash kullanilacak

    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },

    // Cache header'lari
    async headers() {
        return [
            // HTML sayfalari icin cache yok
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, must-revalidate',
                    },
                ],
            },
            // Static chunk'lar icin uzun cache (hash'li oldugu icin guvenli)
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
