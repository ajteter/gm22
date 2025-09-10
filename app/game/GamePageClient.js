'use client';

import Link from 'next/link';
import GameList from '../components/GameList';

export default function GamePageClient({ items, error, page }) {
	return (
		<main className="container">
			<GameList items={items} />
			{error && (
				<div className="empty">
					<div className="emptyIcon" aria-hidden="true" />
					<p className="emptyText">{error}</p>
				</div>
			)}
			{(!items || items.length === 0) && !error && (
				<div className="empty">
					<div className="emptyIcon" aria-hidden="true" />
					<p className="emptyText">暂时无法加载，请稍后重试</p>
				</div>
			)}
			<div className="pagination">
				<Link href={`/game?page=${Math.max(1, page - 1)}`} prefetch className="pageBtn iconBtn" aria-disabled={page <= 1} aria-label="上一页" />
				<span className="pageDot" aria-hidden="true" />
				<Link href={`/game?page=${page + 1}`} prefetch className="pageBtn iconBtn" aria-label="下一页" />
			</div>
		</main>
	);
}
