'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './play.module.css';
import { Suspense, useState } from 'react';
import { CONFIG } from '../lib/config';

const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

function PlayGame() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const gameUrl = searchParams.get('url');
    const [isIframeLoading, setIsIframeLoading] = useState(true);

    const handleMoreGames = () => {
        // 立即导航，不等待iframe
        window.location.href = '/game';
    };

    if (!gameUrl) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>游戏链接无效。</p>
                    <Link href="/">返回首页</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.buttonGroup}>
                    <button onClick={handleMoreGames} className={styles.actionButton}>
                        <GridIcon />
                        <span>More Games</span>
                    </button>
                </div>
            </div>

            <div className={styles.mainContent}>
                {isIframeLoading && (
                    <div className={styles.loadingOverlay}>
                        <div className="emptyIcon" />
                    </div>
                )}
                <iframe
                    src={gameUrl}
                    className={styles.iframe}
                    title="Game"
                    allow="autoplay; fullscreen; payment; display-capture; camera; microphone; geolocation; accelerometer; gyroscope; magnetometer; clipboard-read; clipboard-write"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    loading="eager"
                    muted
                    onLoad={() => setIsIframeLoading(false)}
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
                                * { max-width: 100% !important; max-height: 90px !important; }
                            </style>
                        </head>
                        <body>
                            <script type="text/javascript">
                                window.atOptions = {
                                    'key': '${CONFIG.ADS.FIXED_BANNER.key}',
                                    'format': 'iframe',
                                    'height': 90,
                                    'width': 728,
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
                        height: '90px',
                        border: 'none',
                        maxHeight: '90px',
                        overflow: 'hidden'
                    }}
                />
            </div>
        </div>
    );
}

export default function PlayPage() {
    return (
        <Suspense fallback={<div className={styles.container}></div>}>
            <PlayGame />
        </Suspense>
    );
}