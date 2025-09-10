'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './game.module.css';
import { CONFIG } from '../../lib/config';

const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

export default function GameClientUI({ game, randomPath, listPath }) {
    const router = useRouter();

    const handleMoreGames = () => {
        // 最直接的导航方式，立即跳转
        window.location.replace('/game');
    };

    useEffect(() => {
        // 持续监控URL变化
        const checkForAdRedirect = () => {
            const currentUrl = window.location.href;
            console.log('检测URL:', currentUrl);
            
            // 简化检测：如果URL不包含我们的域名游戏路径，就显示返回按钮
            const isOurGamePage = currentUrl.includes('/game');
            console.log('是否为游戏页面:', isOurGamePage);
            
            if (!isOurGamePage) {
                console.log('显示返回按钮');
                // 检查是否已经有返回按钮
                if (!document.getElementById('game-return-btn')) {
                    const returnButton = document.createElement('div');
                    returnButton.id = 'game-return-btn';
                    returnButton.innerHTML = `
                        <div style="position: fixed; top: 50px; left: 15px; z-index: 9999; 
                                    background: rgba(0,0,0,0.8); color: #fff; 
                                    width: 40px; height: 40px; border-radius: 20px; 
                                    cursor: pointer; display: flex; align-items: center; 
                                    justify-content: center; font-size: 18px; font-weight: bold;
                                    box-shadow: 0 2px 10px rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
                            ←
                        </div>
                    `;
                    returnButton.onclick = () => {
                        console.log('点击返回按钮');
                        window.history.back();
                    };
                    document.body.appendChild(returnButton);
                    console.log('返回按钮已添加');
                }
            }
        };

        // 多次检测确保捕获到跳转
        const intervals = [1000, 2000, 3000, 5000];
        const timers = intervals.map(delay => 
            setTimeout(checkForAdRedirect, delay)
        );
        
        return () => {
            timers.forEach(timer => clearTimeout(timer));
            const btn = document.getElementById('game-return-btn');
            if (btn) btn.remove();
        };
    }, []);

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
                    src={game.url}
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
                            <script type="text/javascript">
                                window.atOptions = {
                                    'key': '${CONFIG.ADS.FIXED_BANNER.key}',
                                    'format': 'iframe',
                                    'height': 50,
                                    'width': 320,
                                    'params': {}
                                };
                            </script>
                            <script type="text/javascript" src="${CONFIG.ADS.DOMAINS.highPerformance}/${CONFIG.ADS.FIXED_BANNER.key}/invoke.js"></script>
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
