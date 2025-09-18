'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

async function getDailyGame() {
    try {
        const response = await fetch('/games.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const games = await response.json();
        
        if (!games || games.length === 0) {
            return null;
        }
        
        // 获取当前日期作为种子
        const today = new Date();
        const dateString = today.getFullYear() + '-' + 
                          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(today.getDate()).padStart(2, '0');
        
        // 使用日期字符串生成种子
        let seed = 0;
        for (let i = 0; i < dateString.length; i++) {
            seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
            seed = seed & seed; // 转换为32位整数
        }
        
        // 使用种子选择游戏
        const gameIndex = Math.abs(seed) % games.length;
        return games[gameIndex];
    } catch (error) {
        console.error('Failed to get daily game:', error);
        return null;
    }
}

export default function DirectGpvPage() {
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const handleRedirect = async () => {
            setIsRedirecting(true);
            const game = await getDailyGame();
            
            if (!game || !game.url) {
                redirect('/game');
            } else {
                window.location.href = game.url;
            }
        };

        handleRedirect();
    }, []);

    if (isRedirecting) {
        return <div>Redirecting...</div>;
    }

    return null;
}
