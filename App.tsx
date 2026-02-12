
import React, { useState, useEffect } from 'react';
import { View, AICard, TrainingLevel } from './types.ts';
import Layout from './components/Layout.tsx';
import Entrance from './views/Entrance.tsx';
import Intro from './views/Intro.tsx';
import Tutorial from './views/Tutorial.tsx';
import Gacha from './views/Gacha.tsx';
import Battle from './views/Battle.tsx';
import Collection from './views/Collection.tsx';
import Course from './views/Course.tsx';
import Training from './views/Training.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.ENTRANCE);
  const [collection, setCollection] = useState<AICard[]>([]);
  const [selectedTrainingOpponent, setSelectedTrainingOpponent] = useState<AICard | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ai_summoner_collection');
    if (saved) {
      try {
        setCollection(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load collection", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_summoner_collection', JSON.stringify(collection));
  }, [collection]);

  const addCardToCollection = (card: AICard) => {
    setCollection(prev => [card, ...prev]);
  };

  const handleSelectTraining = (level: TrainingLevel) => {
    setSelectedTrainingOpponent(level.opponent);
    setCurrentView(View.BATTLE);
  };

  const renderView = () => {
    switch (currentView) {
      case View.ENTRANCE:
        return <Entrance onStart={() => setCurrentView(View.INTRO)} />;
      case View.INTRO:
        return <Intro onNext={() => setCurrentView(View.TUTORIAL)} />;
      case View.TUTORIAL:
        return <Tutorial onNext={() => setCurrentView(View.COURSE)} />;
      case View.COURSE:
        return <Course />;
      case View.GACHA:
        return <Gacha onCollect={addCardToCollection} onNavigate={setCurrentView} />;
      case View.BATTLE:
        return <Battle 
          collection={collection} 
          presetOpponent={selectedTrainingOpponent} 
          onBattleEnd={() => setSelectedTrainingOpponent(null)} 
        />;
      case View.COLLECTION:
        return <Collection cards={collection} />;
      case View.TRAINING:
        return <Training onSelectLevel={handleSelectTraining} />;
      default:
        return <Entrance onStart={() => setCurrentView(View.INTRO)} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={(v) => {
      if (v !== View.BATTLE) setSelectedTrainingOpponent(null);
      setCurrentView(v);
    }}>
      {renderView()}
    </Layout>
  );
};

export default App;
