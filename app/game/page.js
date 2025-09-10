import GamePageClient from './GamePageClient';
import { getActiveGames } from '../lib/data';
import { CONFIG } from '../lib/config';

export const metadata = {
	title: 'Free HTML5 Games',
	description: 'Browse and play free HTML5 games. Mobile-optimized games that load fast in any browser.',
	alternates: {
		canonical: '/game',
	},
};

export default async function Page({ searchParams }) {
	const page = Number(searchParams?.page ?? 1) || 1;
	
	try {
		const allGames = getActiveGames();
		const pageSize = CONFIG.PAGE_SIZE;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const items = allGames.slice(start, end);
		
		return <GamePageClient items={items} error={null} page={page} />;
	} catch (error) {
		console.error('Failed to load games:', error);
		return <GamePageClient items={[]} error="Failed to load games" page={page} />;
	}
}
