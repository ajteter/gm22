import Link from 'next/link';
import { headers } from 'next/headers';
import styles from '../../../game/random/game.module.css';
import GameClientUI from '../../../game/random/GameClientUI';
import { loadGames } from '../../../lib/data';
import { CONFIG } from '../../../lib/config';

export const dynamic = 'force-dynamic';

async function getRandomGame(sourceName, userSession, forceNew = false) {
    try {
        const games = loadGames(sourceName);
        if (!games || games.length === 0) {
            return null;
        }
        
        if (forceNew) {
            const randomIndex = Math.floor(Math.random() * games.length);
            return games[randomIndex];
        } else {
            const timeSlot = Math.floor(Date.now() / CONFIG.RANDOM_GAME_CACHE_DURATION);
            const seed = userSession + timeSlot;
            const randomIndex = Math.abs(seed) % games.length;
            return games[randomIndex];
        }
    } catch (error) {
        console.error(`Failed to get random game for source ${sourceName}:`, error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const game = await getRandomGame(params.sourceName, 0);
    return {
        title: game ? `${game.title} - Random Game` : `Random Game from ${params.sourceName}`,
        description: game ? game.description : `Play random games from ${params.sourceName}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function RandomSourceGamePage({ params, searchParams }) {
    const { sourceName } = params;
    const headersList = headers();
    
    const isAnotherGame = searchParams?.t !== undefined;
    
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const userSession = (ip + userAgent).split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    const game = await getRandomGame(sourceName, userSession, isAnotherGame);

    const randomPath = `/source/${sourceName}/random`;
    const listPath = `/source/${sourceName}`;

    if (!game || !game.url) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>Could not load a game from source: {sourceName}</p>
                    <div className={styles.header}>
                         <Link href={listPath} className={styles.actionButton}>More Games</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <GameClientUI game={game} randomPath={randomPath} listPath={listPath} />;
}
