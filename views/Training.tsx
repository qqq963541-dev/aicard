
import React from 'react';
import { TrainingLevel, AICard, View } from '../types';

interface TrainingProps {
  onSelectLevel: (level: TrainingLevel) => void;
}

const Training: React.FC<TrainingProps> = ({ onSelectLevel }) => {
  const levels: TrainingLevel[] = [
    {
      id: 'train-1',
      name: '新手训练：森林守卫',
      difficulty: '简单',
      description: '适合刚入门的召唤师，守卫行动缓慢。',
      opponent: {
        id: 'opp-1',
        name: '森林石像生',
        description: '被藤蔓覆盖的古老石像。',
        element: 'Earth',
        power: 30,
        health: 50,
        rarity: 'Common',
        imageUrl: 'https://picsum.photos/seed/forest-guard/400/600?grayscale'
      }
    },
    {
      id: 'train-2',
      name: '进阶挑战：熔岩猎犬',
      difficulty: '进阶',
      description: '对手拥有极高的攻击力，小心它的火焰！',
      opponent: {
        id: 'opp-2',
        name: '熔岩三头犬',
        description: '来自地核深处的恐怖生物。',
        element: 'Fire',
        power: 65,
        health: 70,
        rarity: 'Epic',
        imageUrl: 'https://picsum.photos/seed/lava-dog/400/600?grayscale'
      }
    },
    {
      id: 'train-3',
      name: '终极试炼：虚空主宰',
      difficulty: '深渊',
      description: '传说级别的对手，只有顶尖召唤师才能生存。',
      opponent: {
        id: 'opp-3',
        name: '虚空大君',
        description: '吞噬一切光明的虚无存在。',
        element: 'Dark',
        power: 95,
        health: 120,
        rarity: 'Legendary',
        imageUrl: 'https://picsum.photos/seed/void-lord/400/600?grayscale'
      }
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-orbitron font-bold mb-4">个人训练场</h2>
        <p className="text-slate-400">挑选一个AI镜像进行模拟对战，磨练你的指挥技巧</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {levels.map((level) => (
          <div 
            key={level.id} 
            className="group relative bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2"
          >
            <div className="h-48 bg-slate-900 relative">
              <img src={level.opponent.imageUrl} alt={level.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  level.difficulty === '简单' ? 'bg-green-500/20 text-green-400' :
                  level.difficulty === '进阶' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {level.difficulty}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{level.name}</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">{level.description}</p>
              
              <div className="flex items-center gap-4 mb-8 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-swords text-red-400"></i>
                  {level.opponent.power}
                </div>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-heart text-green-400"></i>
                  {level.opponent.health}
                </div>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-shield text-blue-400"></i>
                  {level.opponent.rarity}
                </div>
              </div>

              <button 
                onClick={() => onSelectLevel(level)}
                className="w-full py-3 bg-slate-900 hover:bg-blue-600 rounded-xl font-bold transition-all border border-slate-700 hover:border-blue-500"
              >
                开始训练
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-slate-800/20 border border-slate-700/50 rounded-2xl text-center">
        <p className="text-sm text-slate-500">
          训练模式不会消耗体力，是测试新卡牌组合的最佳场所。
        </p>
      </div>
    </div>
  );
};

export default Training;
