import { getActiveGames } from '../../lib/data';
import { CONFIG } from '../../lib/config';
import { getRequestContext } from '@cloudflare/next-on-pages/getContext';

export const runtime = 'edge';

export async function GET(request) {
	// IMPORTANT: Replace 'GAMES_KV' with your actual KV namespace binding name in Cloudflare.
	const KV_NAMESPACE = 'GAMES_KV';
	const CACHE_KEY = 'all_games';
	const CACHE_TTL = 3600; // 1 hour in seconds

	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') || '1') || 1;
	const size = Number(searchParams.get('size') || CONFIG.PAGE_SIZE) || CONFIG.PAGE_SIZE;

	let allGames;
	let cacheStatus = 'MISS';

	try {
		const { env } = getRequestContext();
		const kv = env[KV_NAMESPACE];
		
		if (kv) {
			allGames = await kv.get(CACHE_KEY, 'json');
			if (allGames) {
				cacheStatus = 'HIT';
			} else {
				allGames = getActiveGames();
				// Use await to ensure the cache is written before responding on a miss.
				// For a fire-and-forget approach, you could remove await, but this ensures consistency.
				await kv.put(CACHE_KEY, JSON.stringify(allGames), { expirationTtl: CACHE_TTL });
				cacheStatus = 'MISS_WROTE_CACHE';
			}
		} else {
			// Fallback for local development or if KV is not available
			allGames = getActiveGames();
			cacheStatus = 'BYPASS (KV not found)';
		}
	} catch (e) {
		console.error("KV operation failed:", e);
		// Fallback to original method if KV fails
		allGames = getActiveGames();
		cacheStatus = `ERROR: ${e.message}`;
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

