import Link from 'next/link';
import styles from './game.module.css';
import GameClientUI from './GameClientUI';
import { getActiveGames } from '../../lib/data';

export const revalidate = 86400; // 24小时缓存

async function getDailyGame() {
    try {
        const activeGames = getActiveGames();
        console.log('Active games count:', activeGames?.length);
        
        if (!activeGames || activeGames.length === 0) {
            console.error("No active games found.");
            return null;
        }
        
        // 使用当前日期作为种子，确保每天固定游戏
        const today = new Date();
        const dateString = today.getFullYear() + '-' + 
                          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(today.getDate()).padStart(2, '0');
        
        console.log('Date string for seed:', dateString);
        
        let seed = 0;
        for (let i = 0; i < dateString.length; i++) {
            seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
            seed = seed & seed;
        }
        
        const gameIndex = Math.abs(seed) % activeGames.length;
        const selectedGame = activeGames[gameIndex];
        
        console.log('Selected game:', selectedGame?.title, 'at index:', gameIndex);
        
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
                    <p>Could not load today's game. Please try again.</p>
                    <div className={styles.header}>
                         <Link href="/game" className={styles.actionButton}>More Games</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <GameClientUI game={game} randomPath="/game/random" listPath="/game" />;
}