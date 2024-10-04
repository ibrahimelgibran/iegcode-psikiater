/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            }
            // https://picsum.photos/200
        ],
    },
};

export default nextConfig;
