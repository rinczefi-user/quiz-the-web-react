import type { QuizQuestion, QuestionItem } from "../types/quiz";

export default function toQuizQuestion({
  answer,
  details,
  difficulty,
  id,
  option1,
  option2,
  option3,
  option4,
  question,
}: QuestionItem): QuizQuestion {
  const options = [option1, option2];

  if (option3) {
    options.push(option3);
  }

  if (option4) {
    options.push(option4);
  }

  return {
    id,
    difficulty,
    question,
    options: options.map((optionText, optionIndex) => ({
      id: `option${optionIndex + 1}`,
      text: optionText,
      isCorrect: answer === `option${optionIndex + 1}`,
    })),
    details,
  };
}
