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

const Number = ({ question, index }: any) => {
  const { score, setScore } = useContext(ContextProvider);
  const { answered, setAnswered } = useContext(ContextProvider);
  const { currentView } = useContext(ContextProvider);
  const [eight, setEight] = useState<any>(new Array(1005).fill(9));

  useEffect(() => {
    if (answered[index] !== -1) return; // Prevents from changing answer after clicking one (not the best solution
    const i = Math.floor(Math.random() * 905 + 100);

    const arr = eight;
    arr[i] = 8;

    setEight(arr);
  }, []);

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
      <div className={`${styles.content} ${styles.eightContainer}`}>
        {/* Full the screen with characters "9" and one "8" */}

        {eight.map((e: any, i: number) => (
          <div
            key={i}
            style={{
              color:
                e == 8 ? (answered[index] !== -1 ? 'red' : 'white') : 'white',
              cursor: e == 9 ? 'default' : 'pointer',
            }}
            className={styles.eight}
            onClick={() => {
              if (answered[index] !== -1) return; // Prevents from changing answer after clicking one (not the best solution
              if (e == 8) {
                setScore(score + 1);
                setAnswered(
                  answered.map((a, ind) => (ind === currentView ? i : a))
                );
              }
            }}
          >
            {e}
          </div>
        ))}

        {/* <div
          className={`${styles.question} ${
            answered[index] !== -1 ? styles.showAnswer : null
          }`}
        > */}
        {/* Question */}
        {/*<img
            src={answered[index] !== -1 ? ansimg || img : img}
            className={styles.photo}
          />
        </div>
        <div
          className={`${styles.answer} ${
            answered[index] !== -1 ? styles.showAnswer : null
          }`}
        >
          {/* Answer */}
        {/*{answered[index] !== -1 ? (
            <p
              className={styles.answerContent}
              style={{ marginLeft: textpos + 'px' }}
            >
              {answer}
            </p>
          ) : null}
        </div> */}
      </div>
    </div>
  );
};

export default Number;
