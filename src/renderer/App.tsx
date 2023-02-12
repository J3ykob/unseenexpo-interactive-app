import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import viewController, { QuestionType } from './views/index';
import { ContextProvider } from './context/context';
import { useEffect, useState } from 'react';
import { LanguageSelect, ScoreTracker, Navigator } from './components/index';

import pl from '../../assets/lang/pl.json';
import en from '../../assets/lang/en.json';

const audio = new Audio(require('../../assets/jp.mp3'));

const returnContent = (language: string): any => {
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
  const [answered, setAnswered] = useState(
    Array(content.questions.length).fill(-1)
  );
  const [view, setView] = useState(
    viewController(content.questions[currentView], currentView)
  );
  const [ee, setEe] = useState([0, 0, 0]);

  // when screen is idle for 30 seconds, go to first question

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView(0);
    }, 8.2137 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setContent(returnContent(language));
  }, [language]);

  useEffect(() => {
    // if sum ee >= 3

    if (ee[0] + ee[1] + ee[2] >= 3) {
      audio.play();
    } else {
      console.log(ee);
      audio.pause();
    }
  }, [ee]);

  useEffect(() => {
    setView(viewController(content.questions[currentView], currentView));
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
        {currentView > 0 && (
          <Navigator
            ee={[ee, setEe]}
            maxView={content.questions.length}
            nextButtonName={content.nextButtonName}
          />
        )}
        <LanguageSelect ee={[ee, setEe]} />
        {currentView > 0 && <ScoreTracker scoreName={content.scoreName} />}
      </div>
      {currentView - 1 >= 0
        ? viewController(content.questions[currentView - 1], currentView - 1)
        : null}
      {viewController(content.questions[currentView], currentView)}
      {currentView < content.questions.length - 1
        ? viewController(content.questions[currentView + 1], currentView + 1)
        : null}
    </ContextProvider.Provider>
  );
}
