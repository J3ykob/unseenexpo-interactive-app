import Hello from './1';

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
  }
}
