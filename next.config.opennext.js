// This file is used specifically for the OpenNext build command for Cloudflare.

// 1. Import the main Next.js config.
const nextConfig = require('./next.config.js');

// 2. Import the OpenNext adapter.
const { openNext } = require('@opennext/next');

// 3. Wrap the main config with the adapter and export it.
module.exports = openNext(nextConfig);
