'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GamePageClient from './GamePageClient';
import { CONFIG } from '../lib/config';
import Loading from './loading';

// We keep the metadata export, Next.js can still use it for static analysis
export const metadata = {
	title: 'Free HTML5 Games',
	description: 'Browse and play free HTML5 games. Mobile-optimized games that load fast in any browser.',
	alternates: {
		canonical: '/game',
	},
};

export default function Page() {
	const searchParams = useSearchParams();
	const page = Number(searchParams.get('page') ?? 1) || 1;

	const [games, setGames] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGames = async () => {
			setLoading(true);
			try {
				const response = await fetch('/games.json');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const allGames = await response.json();
				setGames(allGames);
			} catch (e) {
				console.error('Failed to load games:', e);
				setError('Failed to load games');
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, []);

	if (loading) {
		return <Loading />;
	}

	const pageSize = CONFIG.PAGE_SIZE;
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const items = games.slice(start, end);

	return <GamePageClient items={items} error={error} page={page} totalGames={games.length} />;
}