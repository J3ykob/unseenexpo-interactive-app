import { ContextProvider } from 'renderer/context/context';
import { useContext } from 'react';
import styles from './components.module.css';

const Navigator = ({ maxView }: { maxView: number }) => {
  const { currentView } = useContext(ContextProvider);
  const { setScore, setAnswered, setCurrentView } = useContext(ContextProvider);

  return (
    <div className={styles.navigatorMain}>
      <div className={styles.navigatorButtons}>
        <button
          onClick={() => {
            setScore(0);
            setAnswered(((ans: number[]) =>
              ans.map(() => -1)) as unknown as number[]);
            setCurrentView(0);
          }}
        >
          Restart
        </button>
        <button onClick={() => setCurrentView(-3)}>Settings</button>
      </div>

      {currentView < maxView - 1 && (
        <span
          onClick={() => {
            setCurrentView(currentView + 1);
          }}
          className={`${styles.arrow} ${styles.right}`}
        ></span>
      )}

      {currentView > 0 && (
        <span
          onClick={() => {
            setCurrentView(currentView - 1);
          }}
          className={`${styles.arrow} ${styles.left}`}
        ></span>
      )}
    </div>
  );
};

export default Navigator;
