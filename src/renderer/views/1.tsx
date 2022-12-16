import ScoreTracker from '../components/scoretracker';
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

const Hello = ({ question, answer, buttons, correct, index }: any) => {
  const { score, setScore } = useContext(ContextProvider);
  const { answered, setAnswered } = useContext(ContextProvider);
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
      <h1>{question}</h1>
      <div className={styles.content}>
        <div
          className={`${styles.question} ${
            answered[index] !== -1 ? styles.showAnswer : null
          }`}
        >
          {/* Question */}
          {question}
        </div>
        <div
          className={`${styles.answer} ${
            answered[index] !== -1 ? styles.showAnswer : null
          }`}
        >
          {/* Answer */}
          {answered[index] !== -1 ? answer : null}
        </div>
      </div>

      <div>
        {/* Buttons */}
        {buttons.map((button: string, i: number) => {
          console.log(answered[index], i, correct);
          return (
            <button
              key={i}
              style={
                answered[index] === i && i === correct
                  ? answerstyle.correct
                  : answered[index] === i && i !== correct
                  ? answerstyle.incorrect
                  : {}
              }
              onClick={() => {
                console.log(answered);
                if (answered[index] !== -1) return; // Prevents from changing answer after clicking one (not the best solution
                setAnswered(
                  answered.map((a, ind) => (ind === currentView ? i : a))
                );
                if (i === correct) {
                  setScore(score + 1);
                }
              }}
            >
              {button}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Hello;
