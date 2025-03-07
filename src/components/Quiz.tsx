import React, { useState } from "react";

import type { QuizQuestion } from "../types/quiz";
import Question from "./Question";

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  return (
    <Question
      question={questions[currentQuestionIndex]}
      isLastQuestion={currentQuestionIndex + 1 === questions.length}
      numberOfQuestions={questions.length}
      scoreBefore={score}
      answeredQuestions={currentQuestionIndex + 1}
      onAnswer={handleAnswer}
    />
  );
};

export default Quiz;
