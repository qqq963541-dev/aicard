
import React from 'react';
import { AICard } from '../types';

interface AICardDisplayProps {
  card: AICard;
  onClick?: () => void;
  className?: string;
}

const rarityColors = {
  Common: 'border-slate-500 bg-slate-800',
  Rare: 'border-blue-500 bg-blue-900/20',
  Epic: 'border-purple-500 bg-purple-900/20',
  Legendary: 'border-yellow-500 bg-yellow-900/20'
};

const elementIcons = {
  Fire: 'fa-fire text-red-500',
  Water: 'fa-droplet text-blue-500',
  Earth: 'fa-mountain text-green-700',
  Light: 'fa-sun text-yellow-400',
  Dark: 'fa-moon text-indigo-700'
};

const AICardDisplay: React.FC<AICardDisplayProps> = ({ card, onClick, className = '' }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative w-64 h-96 rounded-2xl border-4 overflow-hidden shadow-2xl transition-all hover:scale-105 cursor-pointer ${rarityColors[card.rarity]} ${className}`}
    >
      {/* Background/Art */}
      <img src={card.imageUrl} alt={card.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/20">
            {card.rarity}
          </span>
          <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center border border-white/20">
            <i className={`fa-solid ${elementIcons[card.element]} text-sm`}></i>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-orbitron font-bold text-white mb-1 truncate">{card.name}</h3>
          <p className="text-[10px] text-slate-300 line-clamp-2 mb-3 bg-black/40 p-1 rounded italic">
            "{card.description}"
          </p>
          
          <div className="flex justify-between items-center bg-black/60 p-2 rounded-lg border border-white/10">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-swords text-red-400"></i>
              <span className="font-bold">{card.power}</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-heart text-green-400"></i>
              <span className="font-bold">{card.health}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rarity Glow Effect */}
      {card.rarity === 'Legendary' && (
        <div className="absolute inset-0 pointer-events-none border-4 border-yellow-400/30 animate-pulse"></div>
      )}
    </div>
  );
};

export default AICardDisplay;
