/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone', // Hostinger managed hosting icin kapatildi
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    async headers() {
        return [
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


