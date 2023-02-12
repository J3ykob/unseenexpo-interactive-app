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

const End = ({ scoreMessage, ending, index }: any) => {
  const { score, setScore } = useContext(ContextProvider);
  const { currentView } = useContext(ContextProvider);

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
      <h1>{ending}</h1>
      <h1>
        {scoreMessage} {score} / {currentView + 5}
      </h1>
    </div>
  );
};

export default End;
