import { getActiveGames } from '../../lib/data';
import { CONFIG } from '../../lib/config';

export const runtime = 'edge';

export async function GET(request) {
	// The KV namespace is exposed on process.env when running on Cloudflare
	const kv = process.env.GAMES_KV;

	const CACHE_KEY = 'all_games';
	const CACHE_TTL = 3600; // 1 hour in seconds

	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') || '1') || 1;
	const size = Number(searchParams.get('size') || CONFIG.PAGE_SIZE) || CONFIG.PAGE_SIZE;

	let allGames;
	let cacheStatus = 'MISS';

	if (!kv) {
		// Fallback for local development or if KV is not available
		allGames = getActiveGames();
		cacheStatus = 'BYPASS (KV not bound)';
	} else {
		try {
			allGames = await kv.get(CACHE_KEY, 'json');
			if (allGames) {
				cacheStatus = 'HIT';
			} else {
				allGames = getActiveGames();
				await kv.put(CACHE_KEY, JSON.stringify(allGames), { expirationTtl: CACHE_TTL });
				cacheStatus = 'MISS_WROTE_CACHE';
			}
		} catch (e) {
			console.error("KV operation failed:", e);
			// Fallback to original method if KV fails
			allGames = getActiveGames();
			cacheStatus = `ERROR: ${e.message}`;
		}
	}
	
	// If the request is for all games (size is very large), return the full list.
	if (size >= 9999) {
		const response = new Response(JSON.stringify(allGames), {
			headers: {
				'content-type': 'application/json; charset=utf-8',
				'x-cache-status': cacheStatus
			},
		});
		return response;
	}

	// Normal pagination logic
	const start = (page - 1) * size;
	const end = start + size;
	const items = allGames.slice(start, end);

	const response = new Response(JSON.stringify(items), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'x-cache-status': cacheStatus
		},
	});

	return response;
}

