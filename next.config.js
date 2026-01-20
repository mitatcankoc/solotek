/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone', // Hostinger managed hosting icin kapatildi

    // Her build'de benzersiz ID olustur - CDN cache'i invalidate eder
    generateBuildId: async () => {
        return `build-${Date.now()}`;
    },

    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },

    async headers() {
        return [
            // HTML sayfalari icin cache'i devre disi birak
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache',
                    },
                    {
                        key: 'Expires',
                        value: '0',
                    },
                ],
            },
            // Static dosyalar icin uzun sureli cache
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            // Public assets icin cache
            {
                source: '/assets/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig



