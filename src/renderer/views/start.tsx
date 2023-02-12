import { ContextProvider } from 'renderer/context/context';
import { useContext, useState, useEffect } from 'react';
import styles from './views.module.css';
import { QuestionType } from 'renderer/views/index';

const answerstyle = {
  correct: {
    backgroundColor: 'green',
  },
  incorrect: {
    backgroundColor: 'red',
  },
};

// #TODO: Change the number in score to match the number of color questions (if their number changes)

const Start = ({ start, welcome, index }: any) => {
  const { score, setScore } = useContext(ContextProvider);
  const { currentView, setCurrentView } = useContext(ContextProvider);

  return (
    <div
      className={`${styles.main} ${
        currentView === index
          ? styles.shown
          : currentView > index
          ? styles.hidden
          : null
      }`}
    >
      <h1 style={{ textAlign: 'center', width: '80%', fontSize: '32px' }}>
        {welcome}
      </h1>
      <button
        style={{ minWidth: '120px', marginTop: '50px', padding: '15px' }}
        onClick={() => {
          setScore(0);
          setCurrentView(1);
        }}
      >
        {start}
      </button>
    </div>
  );
};

export default Start;
