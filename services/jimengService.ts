
import { AICard, CardElement } from "../types.ts";

/**
 * 火山引擎即梦 (Jimeng) API 配置
 * 注意：由于 V4 签名逻辑复杂，此处目前实现为 Mock 模式，
 * 但保留了配置项以便后续对接真实网关。
 */
export const JIMENG_CONFIG = {
  ACCESS_KEY: "AKLTMGQyNzMyMTI3MmM5NDQzY2E5NjA3ZmRmODVjNGFjMTI",
  SECRET_KEY: "TTJaak56aGpOV1ptTnpBNE5HSmlNRGszT1RNd01XSmpaRGMzWlRjd05HVQ==",
  MODEL_NAME: "jimeng-v2.1", // 即梦 2.1 图像大模型
  API_ENDPOINT: "https://visual.volcengineapi.com"
};

/**
 * 模拟即梦 API 图像生成
 * 在实际生产环境中，这会涉及一个异步任务：
 * 1. POST /cv/v1/generate (创建任务)
 * 2. GET /cv/v1/query (轮询结果)
 */
export const generateCardImage = async (prompt: string, style: string): Promise<string> => {
  console.log(`[Jimeng AI] 接收到生成请求: ${prompt}, 风格: ${style}`);
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 2500));

  // 模拟返回的高质量图库，根据关键字匹配
  const mockImages: Record<string, string[]> = {
    "赛博朋克": [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000"
    ],
    "日漫": [
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1578632738981-43c9ad4698f8?auto=format&fit=crop&q=80&w=1000"
    ],
    "默认": [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000"
    ]
  };

  const pool = mockImages[style] || mockImages["默认"];
  return pool[Math.floor(Math.random() * pool.length)];
};

/**
 * 模拟卡牌属性生成 (Game Stats Generator)
 */
export const generateCardMetadata = async (theme: string, style: string): Promise<Partial<AICard>> => {
  // 模拟逻辑处理
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const elements: CardElement[] = ['Fire', 'Water', 'Earth', 'Light', 'Dark'];
  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'] as const;
  
  return {
    name: `${theme}·${style}使者`,
    description: `在即梦 ${JIMENG_CONFIG.MODEL_NAME} 的渲染下，这位来自“${theme}”维度的存在拥有了灵魂。`,
    element: elements[Math.floor(Math.random() * elements.length)],
    power: 40 + Math.floor(Math.random() * 50),
    health: 40 + Math.floor(Math.random() * 50),
    rarity: rarities[Math.floor(Math.random() * rarities.length)]
  };
};

/**
 * 模拟战斗解说
 */
export const generateBattleCommentary = async (playerCard: AICard, aiCard: AICard, action: string): Promise<string> => {
  const quotes = [
    `${playerCard.name} 的进攻划破了长空，${aiCard.name} 感到了前所未有的压力！`,
    `即梦模型实时推演：${action} 效果显著，能量波动指数飙升！`,
    `这就是召唤师的羁绊吗？${playerCard.name} 发动了华丽的打击！`,
    `战局陷入焦灼，${aiCard.name} 试图寻找反击的机会。`
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};
