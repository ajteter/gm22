/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'img.gamemonetize.com' },
		],
		deviceSizes: [360, 480, 720, 960],
	},
	experimental: {
		outputFileTracingIncludes: {
			'/game': ['./app/lib/*.json'],
			'/game/random': ['./app/lib/*.json'],
		},
	},
};

module.exports = nextConfig;


