
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children }) => {
  const navItems = [
    { label: '首页', view: View.ENTRANCE, icon: 'fa-home' },
    { label: '课堂', view: View.COURSE, icon: 'fa-graduation-cap' },
    { label: '召唤', view: View.GACHA, icon: 'fa-bolt' },
    { label: '集卡', view: View.COLLECTION, icon: 'fa-folder-open' },
    { label: '训练', view: View.TRAINING, icon: 'fa-shield-halved' },
    { label: '对战', view: View.BATTLE, icon: 'fa-swords' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate(View.ENTRANCE)}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center glow-border">
            <i className="fa-solid fa-sparkles text-white"></i>
          </div>
          <h1 className="text-xl font-orbitron font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI SUMMONER
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`text-sm font-semibold transition-all flex items-center gap-2 px-3 py-1 rounded-md ${
                currentView === item.view 
                ? 'text-blue-400 bg-blue-500/10' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-24 px-4 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Nav for Mobile */}
      <footer className="fixed bottom-0 w-full md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 grid grid-cols-6 py-3 z-50">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`flex flex-col items-center gap-1 text-[9px] ${
              currentView === item.view ? 'text-blue-400' : 'text-slate-500'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-base`}></i>
            {item.label}
          </button>
        ))}
      </footer>
    </div>
  );
};

export default Layout;
