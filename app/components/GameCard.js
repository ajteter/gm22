'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function GameCard({ game }) {
	const [descExpanded, setDescExpanded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onToggleDesc = useCallback(() => setDescExpanded((v) => !v), []);

	// 直接使用原始链接，通过 referrer 头进行追踪
	const gameUrl = game.url;

	// 添加点击处理函数，提供立即反馈
	const handleGameClick = useCallback((url) => {
		setIsLoading(true);
		router.push(`/play?url=${encodeURIComponent(url)}`);
	}, [router]);

	return (
		<li className="card">
			<div className="media">
				<button 
					onClick={() => handleGameClick(gameUrl)} 
					className={`thumbLink ${isLoading ? 'loading' : ''}`} 
					disabled={isLoading}
					aria-label={`打开 ${game.title}`}
				>
					<img src={game.thumb} alt={game.title} className="thumb" loading="lazy" />
				</button>
				<span className="badge" aria-label="分类">{game.category}</span>
			</div>
			<div className="content">
				<h2 className="gameTitle">{game.title}</h2>
				<p className={descExpanded ? 'desc expanded' : 'desc'} onClick={onToggleDesc} role="button" aria-expanded={descExpanded}>
					{game.description}
				</p>
				{null}
				<div className="actions">
					<button 
						onClick={() => handleGameClick(gameUrl)} 
						className={`playBtn ${isLoading ? 'loading' : ''}`} 
						disabled={isLoading}
						aria-label={`开始 ${game.title}`}
					>
						PLAY
					</button>
				</div>
			</div>
		</li>
	);
}


