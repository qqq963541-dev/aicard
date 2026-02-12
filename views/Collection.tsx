
import React, { useState, useMemo } from 'react';
import { AICard, CardElement } from '../types';
import AICardDisplay from '../components/AICardDisplay';

interface CollectionProps {
  cards: AICard[];
}

const Collection: React.FC<CollectionProps> = ({ cards }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('All');
  const [elementFilter, setElementFilter] = useState<string>('All');

  const stats = useMemo(() => ({
    total: cards.length,
    legendary: cards.filter(c => c.rarity === 'Legendary').length,
    epic: cards.filter(c => c.rarity === 'Epic').length,
    completion: Math.min(100, Math.floor((cards.length / 50) * 100))
  }), [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = rarityFilter === 'All' || c.rarity === rarityFilter;
      const matchesElement = elementFilter === 'All' || c.element === elementFilter;
      return matchesSearch && matchesRarity && matchesElement;
    });
  }, [cards, searchTerm, rarityFilter, elementFilter]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-orbitron font-bold">集卡图鉴</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1 border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-xs text-slate-400 font-bold">收集进度: {stats.completion}%</span>
            </div>
            <span className="text-xs text-slate-500">已解锁 {stats.total} / 50 种基础形态</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 flex flex-col items-center min-w-[80px]">
            <span className="text-[10px] text-slate-500 font-bold uppercase">传奇</span>
            <span className="text-lg font-orbitron font-bold text-yellow-400">{stats.legendary}</span>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 flex flex-col items-center min-w-[80px]">
            <span className="text-[10px] text-slate-500 font-bold uppercase">史诗</span>
            <span className="text-lg font-orbitron font-bold text-purple-400">{stats.epic}</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text"
            placeholder="搜素卡牌名称..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
        <select 
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
        >
          <option value="All">所有稀有度</option>
          <option value="Common">普通 (Common)</option>
          <option value="Rare">优秀 (Rare)</option>
          <option value="Epic">史诗 (Epic)</option>
          <option value="Legendary">传说 (Legendary)</option>
        </select>
        <select 
          value={elementFilter}
          onChange={(e) => setElementFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
        >
          <option value="All">所有元素</option>
          <option value="Fire">火 (Fire)</option>
          <option value="Water">水 (Water)</option>
          <option value="Earth">土 (Earth)</option>
          <option value="Light">光 (Light)</option>
          <option value="Dark">暗 (Dark)</option>
        </select>
      </div>

      {filteredCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-800">
          <i className="fa-solid fa-ghost text-5xl text-slate-700 mb-4 animate-bounce"></i>
          <p className="text-slate-500 font-bold">没有找到匹配的卡牌</p>
          <p className="text-slate-600 text-sm mt-1">尝试更换搜索条件或去召唤新的卡牌</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCards.map((card) => (
            <div key={card.id} className="flex justify-center transition-transform hover:z-10">
              <AICardDisplay card={card} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
