
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AICard, View } from '../types.ts';
import AICardDisplay from '../components/AICardDisplay.tsx';
import { generateBattleCommentary } from '../services/jimengService.ts';

interface BattleProps {
  collection: AICard[];
  presetOpponent?: AICard | null;
  onBattleEnd?: () => void;
}

interface DamageEffect {
  id: number;
  val: number;
  isCrit: boolean;
  side: 'player' | 'ai';
}

const Battle: React.FC<BattleProps> = ({ collection, presetOpponent, onBattleEnd }) => {
  const [playerCard, setPlayerCard] = useState<AICard | null>(null);
  const [aiCard, setAiCard] = useState<AICard | null>(null);
  const [battleLogs, setBattleLogs] = useState<{msg: string, type: 'player' | 'ai' | 'info'}[]>([]);
  const [isFighting, setIsFighting] = useState(false);
  const [playerHP, setPlayerHP] = useState(100);
  const [aiHP, setAiHP] = useState(100);
  const [winner, setWinner] = useState<'Player' | 'AI' | null>(null);
  
  const [pAnim, setPAnim] = useState<'impact' | 'shake' | null>(null);
  const [aAnim, setAAnim] = useState<'impact' | 'shake' | null>(null);
  const [dmgEffects, setDmgEffects] = useState<DamageEffect[]>([]);
  const [flash, setFlash] = useState<'red' | 'white' | null>(null);
  
  const logEndRef = useRef<HTMLDivElement>(null);
  const aiTurnTimeout = useRef<any>(null);

  // Fix: Removed 'description_ai' property as it is not part of the AICard interface.
  const defaultAICard: AICard = {
    id: 'ai-boss-prime',
    name: '极诣·虚空主宰',
    description: '从维度裂缝中诞生的终极意志，拥有修改物理常数的能力。',
    element: 'Dark',
    power: 85,
    health: 95,
    rarity: 'Legendary',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
  };

  useEffect(() => {
    if (presetOpponent && !isFighting) {
      setAiCard(presetOpponent);
    }
  }, [presetOpponent]);

  const startBattle = () => {
    if (!playerCard) return;
    setAiCard(presetOpponent || defaultAICard);
    setIsFighting(true);
    setPlayerHP(100);
    setAiHP(100);
    setWinner(null);
    setBattleLogs([{ msg: `即梦战场协议激活。对手：${(presetOpponent || defaultAICard).name}`, type: 'info' }]);
  };

  const spawnDmg = useCallback((val: number, side: 'player' | 'ai', isCrit: boolean = false) => {
    const id = Date.now() + Math.random();
    setDmgEffects(prev => [...prev, { id, val, side, isCrit }]);
    setTimeout(() => {
      setDmgEffects(prev => prev.filter(d => d.id !== id));
    }, 800);
  }, []);

  const triggerAIAction = useCallback(() => {
    if (!aiCard || !playerCard || winner) return;
    
    setAAnim('impact');
    setTimeout(() => setPAnim('shake'), 50);
    
    const dmg = Math.floor(aiCard.power * 0.25 + Math.random() * 10);
    setPlayerHP(prev => Math.max(0, prev - dmg));
    spawnDmg(dmg, 'player');
    setFlash('red');
    setTimeout(() => {
      setAAnim(null);
      setPAnim(null);
      setFlash(null);
    }, 150);

    setBattleLogs(prev => [...prev, { msg: `${aiCard.name} 发动虚空震爆，造成 ${dmg} 伤害！`, type: 'ai' }]);
  }, [aiCard, playerCard, winner, spawnDmg]);

  const handleAction = (action: '普通攻击' | '全力防御' | '核心技能') => {
    if (!playerCard || !aiCard || winner) return;

    setPAnim('impact');
    setTimeout(() => setAAnim('shake'), 50);
    setFlash('white');
    
    const getMult = (p: string, a: string) => {
      if ((p === 'Water' && a === 'Fire') || (p === 'Fire' && a === 'Earth') || (p === 'Earth' && a === 'Water')) return 1.5;
      if (p === 'Light' && a === 'Dark') return 1.3;
      return 1.0;
    };
    const mult = getMult(playerCard.element, aiCard.element);

    let dmg = 0;
    let isCrit = false;
    if (action === '普通攻击') dmg = Math.floor((playerCard.power * 0.35 * mult) + Math.random() * 5);
    else if (action === '全力防御') dmg = Math.floor(playerCard.power * 0.1);
    else {
      dmg = Math.floor((playerCard.power * 0.7 * mult) + Math.random() * 20);
      isCrit = true;
    }

    setAiHP(prev => Math.max(0, prev - dmg));
    spawnDmg(dmg, 'ai', isCrit);

    setTimeout(() => {
      setPAnim(null);
      setAAnim(null);
      setFlash(null);
    }, 150);

    generateBattleCommentary(playerCard, aiCard, action).then(txt => {
      setBattleLogs(prev => [...prev, { msg: action === '全力防御' ? `${playerCard.name} 展开能量护盾！` : txt, type: 'player' }]);
    });

    if (aiTurnTimeout.current) clearTimeout(aiTurnTimeout.current);
    aiTurnTimeout.current = setTimeout(() => {
      if (aiHP - dmg > 0) triggerAIAction();
    }, 1000);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [battleLogs]);

  useEffect(() => {
    if (aiHP <= 0 && isFighting && !winner) {
      setWinner('Player');
      if (aiTurnTimeout.current) clearTimeout(aiTurnTimeout.current);
    } else if (playerHP <= 0 && isFighting && !winner) {
      setWinner('AI');
      if (aiTurnTimeout.current) clearTimeout(aiTurnTimeout.current);
    }
  }, [aiHP, playerHP, isFighting, winner]);

  if (collection.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 mb-8 bg-slate-800 rounded-full flex items-center justify-center neon-border-blue border border-blue-500/30">
          <i className="fa-solid fa-ghost text-4xl text-blue-400"></i>
        </div>
        <h2 className="text-3xl font-orbitron font-black mb-4 tracking-wider text-white">能量不足：未检测到契约卡牌</h2>
        <p className="text-slate-500 max-sm mb-8">召唤师，请前往祭坛举行召唤仪式。</p>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto py-6 px-4 transition-colors duration-300 ${flash === 'red' ? 'animate-flash-red' : ''}`}>
      {!isFighting ? (
        <div className="text-center">
          <h2 className="text-5xl font-orbitron font-black mb-4 tracking-tighter text-white uppercase italic">出战选择</h2>
          <p className="text-blue-400 font-bold tracking-widest mb-12 opacity-80 underline underline-offset-8">SELECT YOUR CHAMPION</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {collection.map(card => (
              <div key={card.id} className="relative group flex justify-center">
                <AICardDisplay 
                  card={card} 
                  className={`transition-all duration-300 ${playerCard?.id === card.id 
                    ? 'ring-8 ring-blue-500/50 scale-105 shadow-[0_0_60px_rgba(59,130,246,0.4)] border-white' 
                    : 'opacity-60 hover:opacity-100 hover:scale-[1.02] grayscale hover:grayscale-0'
                  }`}
                  onClick={() => setPlayerCard(card)}
                />
              </div>
            ))}
          </div>
          <button 
            disabled={!playerCard}
            onClick={startBattle}
            className="group relative px-24 py-7 bg-white text-black disabled:opacity-30 rounded-full font-black text-2xl overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 font-orbitron italic tracking-widest">INITIALIZE BATTLE</span>
            <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[700px]">
          <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-8 glass-panel rounded-[3rem] p-8 relative overflow-hidden">
            <div className="scanline"></div>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-end px-1">
                <span className="text-[10px] font-black font-orbitron text-blue-400">BIO-DATA 100%</span>
                <span className="text-xl font-black font-orbitron text-white">{playerHP}%</span>
              </div>
              <div className="w-full bg-slate-900/50 h-3 rounded-full overflow-hidden border border-white/5 neon-border-blue">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full hp-bar-flow" style={{ width: `${playerHP}%` }}></div>
              </div>
            </div>
            <div className={`relative transition-all duration-100 ${pAnim === 'impact' ? 'impact-p' : ''} ${pAnim === 'shake' ? 'animate-shake' : ''}`}>
               {playerCard && <AICardDisplay card={playerCard} className="scale-100 shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />}
               {dmgEffects.filter(d => d.side === 'player').map(d => (
                 <div key={d.id} className={`dmg-popup text-red-500 text-5xl`}>-{d.val}</div>
               ))}
            </div>
            <div className="text-xs font-black font-orbitron text-blue-500/50 tracking-widest uppercase text-white">Ally Commander</div>
          </div>

          <div className="lg:col-span-6 flex flex-col glass-panel rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
             <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/5 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[10px] font-black font-orbitron tracking-widest opacity-80">TACTICAL FEED</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500">SECURE CHANNEL // 0x7E3...</div>
             </div>
             
             <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-3 font-inter text-xs max-h-[450px]">
              {battleLogs.map((log, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${
                  log.type === 'player' ? 'bg-blue-600/10 border-blue-500/20 ml-auto max-w-[85%] text-blue-100' : 
                  log.type === 'ai' ? 'bg-red-600/10 border-red-500/20 mr-auto max-w-[85%] text-red-100 font-bold' : 
                  'bg-white/5 border-white/10 text-center text-slate-400 w-full italic'
                }`}>
                  <span className="font-black text-[9px] opacity-40 mr-2 uppercase tracking-tighter">
                    {log.type === 'player' ? 'USR' : log.type === 'ai' ? 'SYS' : 'EVT'}
                  </span>
                  {log.msg}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            <div className="p-8 bg-black/40 border-t border-white/5">
              {winner ? (
                <div className="text-center py-6">
                  <h4 className="text-xl font-orbitron font-black text-slate-500 mb-2">SEQUENCE TERMINATED</h4>
                  <div className={`text-6xl font-black italic tracking-tighter mb-8 ${winner === 'Player' ? 'text-blue-400' : 'text-red-500'}`}>
                    {winner === 'Player' ? 'MISSION SUCCESS' : 'SYSTEM FAILURE'}
                  </div>
                  <button 
                    onClick={() => {
                      setIsFighting(false);
                      if (onBattleEnd) onBattleEnd();
                    }} 
                    className="px-14 py-4 bg-white text-black rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl"
                  >
                    CONTINUE
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {[
                    {label: '普通攻击', color: 'bg-blue-600', icon: 'fa-burst', desc: 'STRIKE'},
                    {label: '全力防御', color: 'bg-slate-700', icon: 'fa-shield-halved', desc: 'GUARD'},
                    {label: '核心技能', color: 'bg-indigo-600', icon: 'fa-bolt-lightning', desc: 'BURST'}
                  ].map(act => (
                    <button 
                      key={act.label}
                      onClick={() => handleAction(act.label as any)}
                      className={`relative group p-6 rounded-[2rem] ${act.color} hover:brightness-125 active:scale-90 transition-all shadow-xl flex flex-col items-center gap-1 overflow-hidden border border-white/10 text-white`}
                    >
                      <i className={`fa-solid ${act.icon} text-2xl relative z-10 mb-1`}></i>
                      <span className="text-xs font-black relative z-10 tracking-tighter">{act.label}</span>
                      <span className="text-[9px] font-orbitron font-black opacity-40 relative z-10">{act.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-8 glass-panel rounded-[3rem] p-8 relative overflow-hidden">
            <div className="scanline" style={{ animationDelay: '1s' }}></div>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-end px-1">
                <span className="text-[10px] font-black font-orbitron text-red-500">HOSTILE DETECTED</span>
                <span className="text-xl font-black font-orbitron text-white">{aiHP}%</span>
              </div>
              <div className="w-full bg-slate-900/50 h-3 rounded-full overflow-hidden border border-white/5 neon-border-red">
                <div className="bg-gradient-to-r from-red-600 to-orange-500 h-full hp-bar-flow" style={{ width: `${aiHP}%` }}></div>
              </div>
            </div>
            <div className={`relative transition-all duration-100 ${aAnim === 'impact' ? 'impact-a' : ''} ${aAnim === 'shake' ? 'animate-shake' : ''}`}>
              {aiCard && <AICardDisplay card={aiCard} className="scale-100 opacity-90 shadow-[0_40px_80px_rgba(255,0,0,0.2)]" />}
              {dmgEffects.filter(d => d.side === 'ai').map(d => (
                <div key={d.id} className={`dmg-popup ${d.isCrit ? 'text-yellow-400 text-7xl' : 'text-white text-5xl'}`}>
                  {d.isCrit ? 'CRIT!' : ''} -{d.val}
                </div>
              ))}
            </div>
            <div className="text-xs font-black font-orbitron text-red-500/50 tracking-widest uppercase text-white">Enemy Sovereign</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Battle;
