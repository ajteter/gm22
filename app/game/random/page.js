import Link from 'next/link';
import styles from './game.module.css';
import GameClientUI from './GameClientUI';
import { getActiveGames } from '../../lib/data';

export const runtime = 'edge';

async function getDailyGame() {
    try {
        // --- KV Cache Logic ---
        // The KV namespace is exposed on process.env when running on Cloudflare
        const kv = process.env.GAMES_KV;

        const CACHE_KEY = 'all_games';
        const CACHE_TTL = 3600; // 1 hour

        let activeGames;

        if (!kv) {
            activeGames = getActiveGames(); // Fallback for local dev or if KV is not available
        } else {
            try {
                activeGames = await kv.get(CACHE_KEY, 'json');
                if (!activeGames) {
                    activeGames = getActiveGames();
                    await kv.put(CACHE_KEY, JSON.stringify(activeGames), { expirationTtl: CACHE_TTL });
                }
            } catch (e) {
                console.error("KV operation failed:", e);
                activeGames = getActiveGames(); // Fallback on error
            }
        }
        // --- End of KV Cache Logic ---

        if (!activeGames || activeGames.length === 0) {
            console.error("No active games found.");
            return null;
        }
        
        // Use the current date as a seed to ensure the same game is selected for the entire day.
        const today = new Date();
        const dateString = today.getFullYear() + '-' + 
                          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(today.getDate()).padStart(2, '0');
        
        let seed = 0;
        for (let i = 0; i < dateString.length; i++) {
            seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
            seed = seed & seed; // Convert to 32bit integer
        }
        
        const gameIndex = Math.abs(seed) % activeGames.length;
        const selectedGame = activeGames[gameIndex];
        
        return selectedGame;
    } catch (error) {
        console.error("Failed to get daily game:", error);
        return null;
    }
}

export async function generateMetadata() {
    const game = await getDailyGame();
    return {
        title: game ? `${game.title} - Daily Game` : 'Daily Game',
        description: game ? game.description : 'Today\'s featured game',
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function RandomGamePage() {
    const game = await getDailyGame();

    if (!game || !game.url) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>Could not load today&apos;s game. Please try again.</p>
                    <div className={styles.header}>
                         <Link href="/game" className={styles.actionButton}>More Games</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <GameClientUI game={game} />;
}
