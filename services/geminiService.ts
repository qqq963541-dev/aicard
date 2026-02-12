
import { GoogleGenAI, Type } from "@google/genai";
import { AICard, CardElement } from "../types.ts";

// 助手函数：API 失败时的 Mock 数据
const getMockMetadata = (theme: string) => ({
  name: `${theme}·幻影`,
  description: "检测到时空波动，这是来自虚空的镜像化身。",
  element: "Light" as CardElement,
  power: 65,
  health: 75,
  rarity: "Epic" as const
});

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"
];

// Always use named parameter { apiKey: process.env.API_KEY } for initialization.
const getSafeAI = () => {
  try {
    if (!process.env.API_KEY) return null;
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  } catch (e) {
    return null;
  }
};

export const generateCardMetadata = async (theme: string, style: string = "通用"): Promise<Partial<AICard>> => {
  const ai = getSafeAI();
  if (!ai) return getMockMetadata(theme);

  try {
    // Calling generateContent with the model name and prompt directly.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `作为一个游戏策划，根据主题“${theme}”和艺术风格“${style}”设计一张独一无二的集换式卡牌角色。
                 请用中文返回以下JSON对象：
                 - name: 角色名称
                 - description: 角色背景故事（20字以内）
                 - element: 元素属性 (Fire, Water, Earth, Light, Dark 选一)
                 - power: 攻击力 (10-100)
                 - health: 生命值 (10-100)
                 - rarity: 稀有度 (Common, Rare, Epic, Legendary 选一)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            element: { type: Type.STRING },
            power: { type: Type.NUMBER },
            health: { type: Type.NUMBER },
            rarity: { type: Type.STRING }
          },
          required: ["name", "description", "element", "power", "health", "rarity"]
        }
      }
    });
    // Access response.text as a property.
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.warn("AI Metadata generation failed, using mock:", error);
    return getMockMetadata(theme);
  }
};

export const generateCardImage = async (prompt: string, style: string): Promise<string> => {
  const ai = getSafeAI();
  if (!ai) return MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];

  try {
    // Generate images using gemini-2.5-flash-image.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-quality trading card portrait. Theme: ${prompt}. Art Style: ${style}. Epic composition, professional digital illustration, sharp focus, 8k resolution.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    // Iterate through candidates and parts to find the inlineData image.
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
  } catch (error) {
    console.warn("AI Image generation failed, using mock:", error);
  }
  
  return MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
};

export const generateBattleCommentary = async (playerCard: AICard, aiCard: AICard, action: string): Promise<string> => {
  const ai = getSafeAI();
  if (!ai) return `${playerCard.name} 发动了 ${action}，气势如虹！`;

  try {
    // Calling generateContent with the model name and prompt directly.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `用中文描述一段简短、激烈的战斗场景。玩家使用“${playerCard.name}”对AI的“${aiCard.name}”执行了“${action}”操作。不超过30字。`,
    });
    // Access response.text as a property.
    return response.text || "激烈的碰撞引发了大地的震动！";
  } catch (e) {
    return "战场上火光四溅，双方陷入僵持！";
  }
};
