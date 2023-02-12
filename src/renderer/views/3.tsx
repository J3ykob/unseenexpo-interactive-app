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

const Words = ({ question, index, words, colors }: any) => {
  const { score, setScore } = useContext(ContextProvider);
  const { answered, setAnswered } = useContext(ContextProvider);
  const { currentView, setCurrentView } = useContext(ContextProvider);
  const [wordIndex, setWordIndex] = useState<any>([]);
  const [color, setColor] = useState<any>([]);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    if (tries >= 5) {
      setCurrentView(currentView + 1);
    }
    // generate array of 4 random unique numbers
    let word_arr: number[] = [];
    do {
      const r = Math.floor(Math.random() * words.length);
      if (word_arr.includes(r)) continue;
      word_arr.push(r);
    } while (word_arr.length < 4);

    let color_arr: number[] = [];
    do {
      const r = Math.floor(Math.random() * Object.values(colors).length);
      if (color_arr.includes(r)) continue;
      color_arr.push(r);
    } while (color_arr.length < 4);

    setWordIndex(word_arr);
    setColor(color_arr);
  }, [tries]);

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
        <div className={styles.question}>
          {/* Question */}
          {/* Create a div using div and a random color from the colors variable */}
          <div
            style={{
              color: Object.values<string>(colors)[color[0]],
              fontSize: '5rem',
              fontWeight: 'bold',
            }}
            className={styles.word}
          >
            {words[wordIndex[0]]}
          </div>
        </div>
      </div>

      <div>
        {/* Buttons */}
        {[...color]
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .map((e: any, i: number) => {
            return (
              <button
                key={i}
                className={styles.answerButton}
                onClick={() => {
                  if (tries >= 5) return;
                  if (e == color[0]) {
                    setScore(score + 1);
                  }
                  setTries(tries + 1);
                }}
              >
                {Object.keys(colors)[e]}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Words;
