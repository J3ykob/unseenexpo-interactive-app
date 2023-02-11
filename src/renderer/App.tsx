import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import viewController, { QuestionType } from './views/index';
import { ContextProvider } from './context/context';
import { useEffect, useState } from 'react';
import { LanguageSelect, ScoreTracker, Navigator } from './components/index';

import pl from '../../assets/lang/pl.json';
import en from '../../assets/lang/en.json';

const returnContent = (language: string): QuestionType[] => {
  if (language === 'pl') return pl;
  if (language === 'en') return en;
  else throw new Error('Language not found');
};

const Hello = () => {
  return (
    // 404 page
    <div className="App">Not found</div>
  );
};

export default function App() {
  const [language, setLanguage] = useState('pl');
  const [score, setScore] = useState(0);
  const [currentView, setCurrentView] = useState(0);
  const [content, setContent] = useState(returnContent(language));
  const [answered, setAnswered] = useState(Array(content.length).fill(-1));
  const [view, setView] = useState(
    viewController(content[currentView], currentView)
  );

  useEffect(() => {
    setContent(returnContent(language));
    console.log(content.length);
  }, [language]);

  useEffect(() => {
    setView(viewController(content[currentView], currentView));
  }, [currentView]);

  return (
    <ContextProvider.Provider
      value={{
        language,
        setLanguage,
        score,
        setScore,
        currentView,
        setCurrentView,
        answered,
        setAnswered,
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 100,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
      >
        <Navigator maxView={content.length} />
        <LanguageSelect />
        <ScoreTracker />
      </div>
      {currentView - 1 >= 0
        ? viewController(content[currentView - 1], currentView - 1)
        : null}
      {viewController(content[currentView], currentView)}
      {currentView < content.length - 1
        ? viewController(content[currentView + 1], currentView + 1)
        : null}
    </ContextProvider.Provider>
  );
}
