/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@supabase/supabase-js'],
    },
};

module.exports = nextConfig;
