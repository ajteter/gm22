const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'img.gamemonetize.com' },
		],
		deviceSizes: [360, 480, 720, 960],
	},
	webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins.push(
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: 'app/lib',
                            to: 'app/lib',
                            globOptions: {
                                ignore: ['**/*.js'],
                            },
                        },
                    ],
                })
            );
        }
        return config;
    },
};

module.exports = nextConfig;


