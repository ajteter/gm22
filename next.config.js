/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'img.gamemonetize.com' },
		],
		deviceSizes: [360, 480, 720, 960],
	},
};

module.exports = nextConfig;


