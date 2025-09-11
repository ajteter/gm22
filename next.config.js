/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'img.gamemonetize.com' },
		],
		deviceSizes: [360, 480, 720, 960],
	},
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev();

module.exports = nextConfig;


