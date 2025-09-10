export const metadata = {
	title: {
		default: 'H5 Games - Free Mobile Games',
		template: '%s | H5 Games'
	},
	description: 'Play free HTML5 games on mobile. Fast loading games optimized for mobile webview.',
	keywords: 'HTML5 games, mobile games, free games, browser games, webview games',
	authors: [{ name: 'H5 Games' }],
	creator: 'H5 Games',
	publisher: 'H5 Games',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'H5 Games - Free Mobile Games',
		description: 'Play free HTML5 games on mobile. Fast loading games optimized for mobile webview.',
		type: 'website',
		locale: 'en_US',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="referrer" content="no-referrer-when-downgrade" />
				<meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self'; frame-src https: data:;" />
				<link rel="preconnect" href="https://gamemonetize.com" />
				<link rel="preconnect" href="https://html5.gamemonetize.com" />
				<link rel="preconnect" href="https://api.gamemonetize.com" />
				<link rel="preconnect" href="https://ads.gamemonetize.com" />
				<link rel="preconnect" href="https://cdn.gamemonetize.com" />
				<link rel="preconnect" href="https://pl27551037.revenuecpmgate.com" />
				<link rel="preconnect" href="https://pl27523592.revenuecpmgate.com" />
				<link rel="dns-prefetch" href="//gamemonetize.com" />
				<link rel="dns-prefetch" href="//html5.gamemonetize.com" />
				<link rel="dns-prefetch" href="//pl27551037.revenuecpmgate.com" />
				<link rel="dns-prefetch" href="//pl27523592.revenuecpmgate.com" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							"name": "H5 Games",
							"description": "Free HTML5 games for mobile",
							"url": process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
							"potentialAction": {
								"@type": "SearchAction",
								"target": {
									"@type": "EntryPoint",
									"urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/game?search={search_term_string}`
								},
								"query-input": "required name=search_term_string"
							}
						})
					}}
				/>
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}


