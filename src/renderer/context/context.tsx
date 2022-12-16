import { createContext } from 'react';

export type ContextType = {
  language: string;
  setLanguage: (language: string) => void;
  score: number;
  setScore: (score: number) => void;
  currentView: number;
  setCurrentView: (currentView: number) => void;
  answered: number[];
  setAnswered: (answered: number[]) => void;
};

export const ContextProvider = createContext<ContextType>(
  null as unknown as ContextType
);
