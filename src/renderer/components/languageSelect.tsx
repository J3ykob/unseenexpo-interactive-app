import { useContext } from 'react';
import { ContextProvider } from '../context/context';
import styles from './components.module.css';

const LanguageSelect = () => {
  const { language, setLanguage } = useContext(ContextProvider);

  return (
    <div className={styles.languageMain}>
      <button
        className={styles.button}
        onClick={() => {
          setLanguage('pl');
        }}
      >
        Polski
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setLanguage('en');
        }}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSelect;
