/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@diacare/shared-types"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
