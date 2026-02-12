
import React from 'react';
import { View } from '../types';

interface EntranceProps {
  onStart: () => void;
}

const Entrance: React.FC<EntranceProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full"></div>
        <i className="fa-solid fa-sparkles text-7xl text-blue-500 animate-float relative z-10"></i>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        AI召唤师
      </h1>
      
      <p className="text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed">
        欢迎来到《AI抽卡召唤师》。在这里，艺术由AI创造，规则由你掌控。
        这是一场技术与策略的交响曲，准备好开启你的AI卡牌之旅了吗？
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={onStart}
          className="px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20 flex items-center gap-3"
        >
          开始旅程
          <i className="fa-solid fa-arrow-right"></i>
        </button>
        <button 
          className="px-10 py-4 bg-slate-800 hover:bg-slate-700 rounded-full font-bold text-lg transition-all border border-slate-700"
        >
          查看排行
        </button>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <i className="fa-solid fa-microchip text-blue-400 text-3xl mb-4"></i>
          <h3 className="font-bold mb-2">AI 智能生成</h3>
          <p className="text-sm text-slate-400 text-left">
            每一张卡牌都由 Gemini 2.5 Flash 模型实时生成，独一无二。
          </p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <i className="fa-solid fa-brain text-purple-400 text-3xl mb-4"></i>
          <h3 className="font-bold mb-2">策略对决</h3>
          <p className="text-sm text-slate-400 text-left">
            属性相生相克，配合技能Combo，挑战最强AI。
          </p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <i className="fa-solid fa-layer-group text-pink-400 text-3xl mb-4"></i>
          <h3 className="font-bold mb-2">海量收集</h3>
          <p className="text-sm text-slate-400 text-left">
            数百种风格主题，打造属于你的传奇图鉴。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Entrance;
