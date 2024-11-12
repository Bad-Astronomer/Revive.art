/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: process.env.NEXT_PUBLIC_FLASK_URL,
        //     },
        // ]
        domains: ["res.cloudinary.com"],
    }
};

export default nextConfig;
