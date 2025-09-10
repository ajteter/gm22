// 应用配置常量
export const CONFIG = {
    // 当前激活的游戏源 ('gmbestvertical' or 'gpvertical')
    ACTIVE_GAMES_SOURCE: 'gpvertical',

    // 分页配置
    PAGE_SIZE: 50,
    
    // 缓存配置 (秒)
    CACHE_DURATION: 600, // 10分钟
    STALE_WHILE_REVALIDATE: 1800, // 30分钟
    
    // 广告配置
    ADS: {
        // 弹出广告 (Popunder)
        POPUP: {
            script: '//pl27550696.revenuecpmgate.com/e7/2b/60/e72b604475c837e80b428e839e5c9e84.js',
            delay: 3000 // 3秒延迟
        },
        
        // 固定横幅广告 (等比例缩放到设备宽度)
        FIXED_BANNER: {
            key: '9adddfc2b9f962e7595071bcbd5cc4e5'
        },
        
        // 响应式横幅广告 (备用配置)
        BANNER: {
            LARGE: {
                key: 'fcc762bb57d3b98bebe1d12335e8d590',
                width: 728,
                height: 90,
                minScreenWidth: 728
            },
            MEDIUM: {
                key: '3c5f1a4eaca07385fc217a28949de1d9',
                width: 468,
                height: 60,
                minScreenWidth: 468
            },
            SMALL: {
                key: '9adddfc2b9f962e7595071bcbd5cc4e5',
                width: 320,
                height: 50,
                minScreenWidth: 0
            }
        },
        
        // 广告服务域名
        DOMAINS: {
            highPerformance: '//www.highperformanceformat.com'
        }
    },
    
    // 随机游戏缓存时间 (毫秒)
    RANDOM_GAME_CACHE_DURATION: 15 * 60 * 1000 // 15分钟
};
