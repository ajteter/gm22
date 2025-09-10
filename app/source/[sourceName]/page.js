import Link from 'next/link';
import GameCard from '../../components/GameCard';
import { loadGames } from '../../lib/data';
import { CONFIG } from '../../lib/config';

export async function generateMetadata({ params }) {
    return {
        title: `Games: ${params.sourceName}`,
    };
}

export default async function SourceListPage({ params, searchParams }) {
    const { sourceName } = params;
    const allGames = loadGames(sourceName);

    if (!allGames || allGames.length === 0) {
        return (
            <main className="container">
                <div className="empty">
                    <p className="emptyText">Unknown game source: {sourceName}</p>
                    <Link href="/">Go to Homepage</Link>
                </div>
            </main>
        );
    }

    const page = Number(searchParams?.page ?? 1) || 1;
    const pageSize = CONFIG.PAGE_SIZE;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = allGames.slice(start, end);
    const basePath = `/source/${sourceName}`;

    return (
        <main className="container">
            <ul className="grid onecol">
                {items.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </ul>
            {(!items || items.length === 0) && (
                <div className="empty">
                    <div className="emptyIcon" aria-hidden="true" />
                    <p className="emptyText">No games found on this page.</p>
                </div>
            )}
            <div className="pagination">
                <Link href={`${basePath}?page=${Math.max(1, page - 1)}`} prefetch className="pageBtn iconBtn" aria-disabled={page <= 1} aria-label="上一页" />
                <span className="pageDot" aria-hidden="true" />
                <Link href={`${basePath}?page=${page + 1}`} prefetch className="pageBtn iconBtn" aria-label="下一页" />
            </div>
        </main>
    );
}
