'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './game.module.css';
import GameClientUI from './GameClientUI';
import Loading from './loading';

function RandomGamePage() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAndSetGame() {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('/games.json');
                if (!response.ok) {
                    throw new Error(`Failed to load games: ${response.status}`);
                }
                
                const activeGames = await response.json();
                if (!Array.isArray(activeGames) || activeGames.length === 0) {
                    throw new Error("No games available");
                }

                // Use the current date as a seed to ensure the same game is selected for the entire day
                const today = new Date();
                const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                
                let seed = 0;
                for (let i = 0; i < dateString.length; i++) {
                    seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
                    seed = seed & seed; // Convert to 32bit integer
                }
                
                const gameIndex = Math.abs(seed) % activeGames.length;
                const selectedGame = activeGames[gameIndex];
                
                if (!selectedGame?.url) {
                    throw new Error("Invalid game data");
                }
                
                setGame(selectedGame);
            } catch (e) {
                console.error("Failed to get daily game:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAndSetGame();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error || !game || !game.url) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>Could not load today&apos;s game.</p>
                    {error && <p>Error: {error}</p>}
                    <div className={styles.header}>
                        <button 
                            onClick={() => window.location.reload()} 
                            className={styles.actionButton}
                            style={{ marginRight: '10px' }}
                        >
                            Retry
                        </button>
                        <Link href="/game" className={styles.actionButton}>More Games</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <GameClientUI game={game} />;
}

export default RandomGamePage;