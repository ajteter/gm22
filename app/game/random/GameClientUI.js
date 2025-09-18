'use client';

import { useEffect, useState } from 'react';
import styles from './game.module.css';


const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

export default function GameClientUI({ game }) {
    const [gameUrl, setGameUrl] = useState(game.url);

    useEffect(() => {
        // Append current page's query parameters to the game URL for attribution
        const params = new URLSearchParams(window.location.search);
        
        if (params.toString()) {
            const newUrl = new URL(game.url);
            params.forEach((value, key) => {
                newUrl.searchParams.set(key, value);
            });
            setGameUrl(newUrl.toString());
        }
    }, [game.url]);

    const handleMoreGames = () => {
        window.location.href = '/game';
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.buttonGroup}>
                    <div className={styles.dailyTitle}>
                        <span>1 DAY 1 GAME</span>
                    </div>
                    <button onClick={handleMoreGames} className={styles.actionButtonSmall}>
                        <GridIcon />
                        <span>More Games</span>
                    </button>
                </div>
            </div>

            <div className={styles.mainContent}>
                <iframe
                    src={gameUrl}
                    className={styles.iframe}
                    title={game.title}
                    allow="autoplay; fullscreen; payment; display-capture; camera; microphone; geolocation; accelerometer; gyroscope; magnetometer; clipboard-read; clipboard-write"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    loading="eager"
                    muted
                />
            </div>

            <div className={styles.adContainer}>
                <iframe 
                    srcDoc={`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { margin: 0; padding: 0; overflow: hidden; }
                                * { max-width: 100% !important; max-height: 100px !important; }
                            </style>
                        </head>
                        <body>
                            <script>
                                // 延迟加载广告脚本
                                setTimeout(() => {
                                    const script = document.createElement('script');
                                    script.type = 'text/javascript';
                                    script.src = '//www.highperformanceformat.com/50b2164cc3111fadf4f101590a95e8ef/invoke.js';
                                    
                                    window.atOptions = {
                                        'key': '50b2164cc3111fadf4f101590a95e8ef',
                                        'format': 'iframe',
                                        'height': 50,
                                        'width': 320,
                                        'params': {}
                                    };
                                    
                                    document.body.appendChild(script);
                                }, 1000);
                            </script>
                        </body>
                        </html>
                    `}
                    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
                    style={{
                        width: '100%',
                        height: '100px',
                        border: 'none',
                        maxHeight: '100px',
                        overflow: 'hidden'
                    }}
                />
            </div>
        </div>
    );
}
