const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {}, // 👈 ADD THIS (empty object)

	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "example.com" },
			{ protocol: "https", hostname: "via.placeholder.com" },
			{ protocol: "https", hostname: "res.cloudinary.com" },
		],
		unoptimized: true,
	},

	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = withPWA(nextConfig);
