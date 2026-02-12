import React from 'react';
import { View } from '../types';

interface IntroProps {
  onNext: () => void;
}

const Intro: React.FC<IntroProps> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-orbitron font-bold mb-8 border-l-4 border-blue-500 pl-4">玩法介绍</h2>
      
      <div className="space-y-8">
        <section className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-blue-400 font-orbitron">01</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">神秘召唤</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                输入你喜欢的关键词或主题，AI将以此为灵感，通过大模型生成对应的卡牌形象、背景故事以及战斗数据。每次召唤都是未知的惊喜！
              </p>
              <div className="bg-slate-900/50 p-4 rounded-xl text-xs font-mono text-slate-500">
                {/* 召唤核心公式：主题关键词 -> 文本模型(Metadata) -> 图像模型(Visuals) */}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-purple-400 font-orbitron">02</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">元素对决</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                五大元素：火、水、土、光、暗。它们相互克制：水克火、火克土、土克水，而光与暗相互抵消。利用元素优势可以获得额外的伤害加成。
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {['Fire', 'Water', 'Earth', 'Light', 'Dark'].map((e) => (
                  <div key={e} className="px-4 py-2 bg-slate-900 rounded-full border border-slate-700 text-xs font-bold whitespace-nowrap">
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-pink-400 font-orbitron">03</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">图鉴成就</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                所有抽到的卡牌都将保存在"卡牌收集册"中。根据稀有度（Common, Rare, Epic, Legendary）解锁成就，提升你的召唤师等级。
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 flex justify-end">
        <button 
          onClick={onNext}
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl font-bold shadow-lg shadow-purple-500/20"
        >
          前往新手教程
        </button>
      </div>
    </div>
  );
};

export default Intro;
