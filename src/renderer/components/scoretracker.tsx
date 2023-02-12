import { useContext } from 'react';
import { ContextProvider } from '../context/context';
import styles from './components.module.css';

const ScoreTracker = ({ scoreName }: any) => {
  const { score, setScore } = useContext(ContextProvider);
  const { currentView, setCurrentView } = useContext(ContextProvider);
  const { language, setLanguage } = useContext(ContextProvider);

  return (
    <div className={styles.scoreMain}>
      <h1>
        {scoreName}: {score}
      </h1>
    </div>
  );
};

export default ScoreTracker;
