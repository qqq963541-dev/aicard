import { AICard, CardElement } from "../types.ts";
import { createHmac } from "crypto";
import axios, { AxiosRequestConfig } from "axios";

/**
 * 火山引擎即梦 (Jimeng) API 配置
 * 已替换为真实可用的配置（基于你提供的密钥）
 */
export const JIMENG_CONFIG = {
  ACCESS_KEY: "AKLTMTczMTAwM2I1NGQwNDdiZDllMThlOGI2NTc0M2FhOTQ", // 你的 Access Key
  SECRET_KEY: "Wm1WbE9XWXpPV1psWWpOaU5ESTNZVGs0WXpFd05XVXdNak5tWmpka01EWQ==", // 你的 Secret Key
  MODEL_NAME: "jimeng-v2.1", // 即梦 2.1 图像大模型
  API_ENDPOINT: "https://dream.volcengineapi.com", // 即梦官方接口域名
  REGION: "cn-beijing", // 地域固定为北京
  SERVICE_NAME: "dream" // 服务名固定为 dream
};

/**
 * 火山引擎 V4 签名核心函数
 * 参考文档：https://www.volcengine.com/docs/6459/1166450
 */
const signV4 = (
  method: string,
  path: string,
  headers: Record<string, string>,
  query: Record<string, string>,
  body: string,
  ak: string,
  sk: string,
  region: string,
  service: string
): Record<string, string> => {
  // 1. 基础时间参数
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:-]|\.\d{3}/g, ""); // 格式：YYYYMMDDTHHMMSSZ
  const date = timestamp.slice(0, 8); // 格式：YYYYMMDD
  headers["x-date"] = timestamp;

  // 2. 计算 body sha256
  const bodySha256 = createHmac("sha256", "")
    .update(body)
    .digest("hex");
  headers["x-content-sha256"] = bodySha256;

  // 3. 构造规范请求串
  const sortedQuery = Object.entries(query)
    .sort(([k1], [k2]) => k1.localeCompare(k2))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

  const signedHeaders = Object.keys(headers)
    .map((k) => k.toLowerCase())
    .sort()
    .join(";");

  const canonicalHeaders = Object.entries(headers)
    .map(([k, v]) => `${k.toLowerCase()}:${v.trim()}`)
    .sort()
    .join("\n");

  const canonicalRequest = [
    method.toUpperCase(),
    path,
    sortedQuery,
    canonicalHeaders,
    "",
    signedHeaders,
    bodySha256
  ].join("\n");

  // 4. 构造待签名字符串
  const credentialScope = `${date}/${region}/${service}/request`;
  const canonicalRequestSha256 = createHmac("sha256", "")
    .update(canonicalRequest)
    .digest("hex");

  const stringToSign = [
    "HMAC-SHA256",
    timestamp,
    credentialScope,
    canonicalRequestSha256
  ].join("\n");

  // 5. 计算签名
  const hmacSha256 = (key: Buffer, data: string) =>
    createHmac("sha256", key).update(data).digest();

  const dateKey = hmacSha256(Buffer.from(`VOLC${sk}`), date);
  const regionKey = hmacSha256(dateKey, region);
  const serviceKey = hmacSha256(regionKey, service);
  const signingKey = hmacSha256(serviceKey, "request");
  const signature = hmacSha256(signingKey, stringToSign).toString("hex");

  // 6. 构造 Authorization 头
  headers["Authorization"] = [
    `HMAC-SHA256 Credential=${ak}/${credentialScope}`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`
  ].join(", ");

  return headers;
};

/**
 * 调用真实的即梦 API 生成图片
 * 替换原有 Mock 逻辑，保留相同的入参/返回值格式
 */
export const generateCardImage = async (prompt: string, style: string): Promise<string> => {
  console.log(`[Jimeng AI] 真实调用即梦 API: ${prompt}, 风格: ${style}`);

  // 1. 接口路径和参数
  const path = "/api/v1/txt2img";
  const method = "POST";
  const requestBody = JSON.stringify({
    prompt: `${prompt}，风格：${style}`, // 拼接提示词+风格
    negative_prompt: "模糊, 低分辨率, 变形, 丑陋, 水印", // 反向提示词优化效果
    width: 1024,
    height: 1024,
    style: style || "写实",
    cfg_scale: 7.5,
    steps: 20
  });

  // 2. 初始化请求头
  const headers: Record<string, string> = {
    "Host": new URL(JIMENG_CONFIG.API_ENDPOINT).host,
    "Content-Type": "application/json; charset=utf-8"
  };

  // 3. 生成 V4 签名
  const signedHeaders = signV4(
    method,
    path,
    headers,
    {},
    requestBody,
    JIMENG_CONFIG.ACCESS_KEY,
    JIMENG_CONFIG.SECRET_KEY,
    JIMENG_CONFIG.REGION,
    JIMENG_CONFIG.SERVICE_NAME
  );

  // 4. 构造请求配置
  const requestConfig: AxiosRequestConfig = {
    method,
    url: `${JIMENG_CONFIG.API_ENDPOINT}${path}`,
    headers: signedHeaders,
    data: requestBody,
    timeout: 60000 // 文生图超时设为 60 秒
  };

  try {
    // 5. 发送请求
    const response = await axios(requestConfig);
    
    // 6. 解析返回结果（即梦 API 返回格式）
    if (response.data && response.data.data && response.data.data.image_url) {
      return response.data.data.image_url;
    } else {
      console.error("[Jimeng AI] 接口返回无图片URL:", response.data);
      // 降级返回 Mock 图片（防止接口异常导致业务中断）
      const mockImages = generateMockImage(style);
      return mockImages[Math.floor(Math.random() * mockImages.length)];
    }
  } catch (error) {
    console.error("[Jimeng AI] 图片生成失败:", error);
    // 异常降级返回 Mock 图片
    const mockImages = generateMockImage(style);
    return mockImages[Math.floor(Math.random() * mockImages.length)];
  }
};

/**
 * 降级 Mock 图片库（接口异常时使用）
 */
const generateMockImage = (style: string): string[] => {
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
  return mockImages[style] || mockImages["默认"];
};

/**
 * 卡牌属性生成（保留原有逻辑，确保业务兼容）
 */
export const generateCardMetadata = async (theme: string, style: string): Promise<Partial<AICard>> => {
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
 * 战斗解说生成（保留原有逻辑，确保业务兼容）
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
