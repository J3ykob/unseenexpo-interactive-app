import { useContext } from 'react';
import { ContextProvider } from '../context/context';
import styles from './components.module.css';

const LanguageSelect = ({ ee }: any) => {
  const { language, setLanguage } = useContext(ContextProvider);
  const [eg, setEe] = ee;

  return (
    <div className={styles.languageMain}>
      <button
        className={styles.button}
        onClick={() => {
          setLanguage('pl');
        }}
        onTouchStart={() => {
          setEe([eg[0], eg[1] + 1, eg[2]]);
        }}
      >
        Polski
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setLanguage('en');
        }}
        onTouchStart={() => {
          setEe([eg[0] + 1, eg[1], eg[2]]);
        }}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSelect;
