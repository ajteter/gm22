import { redirect } from 'next/navigation';
import { getActiveGames } from '../../../lib/data';

export const dynamic = 'force-dynamic';

async function getDailyGame() {
    const games = getActiveGames();
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
}

export default async function DirectGpvPage() {
    const game = await getDailyGame();
    
    if (!game || !game.url) {
        redirect('/game');
    }
    
    redirect(game.url);
}
