import Hello from './1';
import Number from './2';
import Words from './3';
import End from './end';
import Start from './start';

// Counting on the correct order of the elements after Object.values operation is potentially unreliable, but will do for now

export type QuestionType = {
  question: string;
  answer: string;
  buttons: string[];
  correct: number;
  type: string;
};

export default function viewController(
  question: QuestionType,
  currentView: number
) {
  switch (question.type) {
    case '1':
      return <Hello {...question} index={currentView} key={currentView} />;
    case '2':
      return <Number {...question} index={currentView} key={currentView} />;
    case '3':
      return <Words {...question} index={currentView} key={currentView} />;
    case 'end':
      return <End {...question} index={currentView} key={currentView} />;
    case 'start':
      return <Start {...question} index={currentView} key={currentView} />;
  }
}
