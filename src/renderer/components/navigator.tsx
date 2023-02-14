import { ContextProvider } from 'renderer/context/context';
import { useContext, useEffect, useState } from 'react';
import styles from './components.module.css';

const Navigator = ({ maxView, nextButtonName, ee }: any) => {
  const { currentView, answered } = useContext(ContextProvider);
  const { setScore, setAnswered, setCurrentView } = useContext(ContextProvider);

  const [show, setShow] = useState(false);
  const [eg, setEe] = ee;

  // display a button saying "NEXT" 2 seconds after answered variable changes
  useEffect(() => {
    if (answered.every((item) => item == -1)) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => {
      if (currentView < maxView - 1) {
        setShow(true);
      } else {
        setScore(0);
        setAnswered(Array(maxView).fill(-1));
        setCurrentView(0);
      }
    }, 1100);
    return () => clearTimeout(timer);
  }, [answered]);

  // swipe left/right

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;

    const handleTouchMove = (e: any) => {
      const touchUp = e.touches[0].clientX;
      if (touchDown - touchUp > 150) {
        if (currentView < maxView - 1) {
          console.log(currentView + 1 <= maxView - 1 ? currentView + 1 : 0);
          setCurrentView(currentView + 1 <= maxView - 1 ? currentView + 1 : 0);
        }
      } else if (touchDown - touchUp < -150) {
        if (currentView > 0) {
          setCurrentView(currentView - 1 >= 0 ? currentView - 1 : 0);
        }
      }
    };
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', () => {
      window.removeEventListener('touchmove', handleTouchMove);
    });
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [currentView]);

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
      </div>

      {/* display a button saying "NEXT" 2 seconds after answered variable changes */}
      {currentView < maxView - 1 && show && (
        <button
          onClick={() => {
            setCurrentView(currentView + 1);
            setShow(false);
          }}
          className={`${styles.nextButton}`}
        >
          {nextButtonName}
        </button>
      )}

      {/* {currentView < maxView - 1 && (
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
      )} */}
    </div>
  );
};

export default Navigator;
