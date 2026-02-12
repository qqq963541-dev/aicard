
import React, { useState } from 'react';
import { generateCardMetadata, generateCardImage } from '../services/jimengService.ts';
import { AICard, View } from '../types.ts';
import AICardDisplay from '../components/AICardDisplay.tsx';

interface GachaProps {
  onCollect: (card: AICard) => void;
  onNavigate: (view: View) => void;
}

const styles = ["写实", "日漫", "赛博朋克", "水墨画", "像素风", "蒸汽朋克", "暗黑幻想"];

const Gacha: React.FC<GachaProps> = ({ onCollect, onNavigate }) => {
  const [theme, setTheme] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('日漫');
  const [isSummoning, setIsSummoning] = useState(false);
  const [result, setResult] = useState<AICard | null>(null);
  const [loadingStep, setLoadingStep] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSummon = async () => {
    if (!theme.trim()) return;
    setIsSummoning(true);
    setResult(null);
    setShowCelebration(false);
    
    try {
      setLoadingStep('火山引擎网关连接中... (Jimeng v2.1)');
      const metadata = await generateCardMetadata(theme, selectedStyle);
      
      setLoadingStep(`即梦模型正在对“${theme}”进行多维扩散渲染...`);
      const imageUrl = await generateCardImage(`${theme} character, high quality anime card art`, selectedStyle);
      
      const newCard: AICard = {
        id: Math.random().toString(36).substr(2, 9),
        name: metadata.name || '即梦幻影',
        description: metadata.description || '由即梦模型生成的神秘实体。',
        element: (metadata.element as any) || 'Fire',
        power: metadata.power || 50,
        health: metadata.health || 50,
        rarity: (metadata.rarity as any) || 'Common',
        imageUrl
      };
      
      setResult(newCard);
      onCollect(newCard);
      
      if (newCard.rarity === 'Legendary' || newCard.rarity === 'Epic') {
        setShowCelebration(true);
      }
    } catch (error) {
      console.error(error);
      alert('即梦引擎通讯异常：请检查网络后重试');
    } finally {
      setIsSummoning(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 relative">
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow-500/10 animate-pulse"></div>
          <div className="text-4xl font-black text-yellow-400 font-orbitron animate-bounce">
            GOLDEN LEGENDARY!
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-3xl font-orbitron font-bold mb-4 italic">即梦召唤仪式</h2>
        <p className="text-slate-400">基于火山引擎 Jimeng 大模型，重塑你的英雄想象</p>
      </div>

      <div className="flex flex-col items-center">
        {!result && !isSummoning && (
          <div className="w-full max-w-lg bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">角色主题</label>
              <input 
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="例如: 冰晶龙骑士, 蒸汽机械猫..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">即梦画风预设</label>
              <div className="flex flex-wrap gap-2">
                {styles.map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedStyle === style 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSummon}
              disabled={!theme.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-800 disabled:opacity-30 hover:scale-[1.02] active:scale-95 transition-all rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-cloud-bolt"></i>
              连接即梦 API 召唤
            </button>
          </div>
        )}

        {isSummoning && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative w-48 h-48 mb-8">
              <div className="absolute inset-0 border-4 border-blue-500/30 border-dashed rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                   <i className="fa-solid fa-brain text-5xl text-blue-400 animate-pulse mb-4"></i>
                </div>
              </div>
            </div>
            <p className="text-xl font-bold font-orbitron text-blue-400 animate-pulse">{loadingStep}</p>
            <p className="text-xs text-slate-500 mt-2">模型: Jimeng-V2.1 | 采样步数: 30</p>
          </div>
        )}

        {result && (
          <div className="flex flex-col items-center animate-[scale_0.5s_ease-out]">
            <AICardDisplay card={result} className="mb-10 scale-110" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-md">
              <button 
                onClick={() => setResult(null)}
                className="col-span-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold border border-slate-700 transition-colors"
              >
                再次召唤
              </button>
              <button 
                onClick={() => onNavigate(View.COLLECTION)}
                className="col-span-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors"
              >
                查看图鉴
              </button>
              <button 
                onClick={() => onNavigate(View.BATTLE)}
                className="col-span-2 md:col-span-1 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors shadow-lg shadow-red-500/20"
              >
                出战！
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gacha;
