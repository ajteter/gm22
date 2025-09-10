import { getActiveGames } from '../../lib/data';
import { CONFIG } from '../../lib/config';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') || '1') || 1;
	const size = Number(searchParams.get('size') || CONFIG.PAGE_SIZE) || CONFIG.PAGE_SIZE;

	const allGames = getActiveGames();
	
	// 如果请求所有游戏（size很大），直接返回全部
	if (size >= 9999) {
		return new Response(JSON.stringify(allGames), {
			headers: {
				'content-type': 'application/json; charset=utf-8',
				'cache-control': `public, s-maxage=${CONFIG.CACHE_DURATION}, stale-while-revalidate=${CONFIG.STALE_WHILE_REVALIDATE}`,
			},
		});
	}

	// 正常分页逻辑
	const start = (page - 1) * size;
	const end = start + size;
	const items = allGames.slice(start, end);

	return new Response(JSON.stringify(items), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': `public, s-maxage=${CONFIG.CACHE_DURATION}, stale-while-revalidate=${CONFIG.STALE_WHILE_REVALIDATE}`,
		},
	});
}

