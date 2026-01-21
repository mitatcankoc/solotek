/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },

    // Her build'de benzersiz ID olustur
    generateBuildId: async () => {
        return `build-${Date.now()}`;
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
