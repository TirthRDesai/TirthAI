import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://generativelanguage.googleapis.com/:path*",
			},
		];
	},
};

export default nextConfig;
