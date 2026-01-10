/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    unoptimized: true,
  },

  // ✅ ADD THIS
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
