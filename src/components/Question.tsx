import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button, { type ButtonProps } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import type { QuizQuestion } from "../types/quiz";

const OptionButton = styled(Button)(({ theme, color }) => ({
  "&.Mui-disabled": {
    borderColor:
      (color === "success" || color === "error") && theme.palette[color].main,
  },
}));

interface QuestionProps {
  question: QuizQuestion;
  isLastQuestion: boolean;
  scoreBefore: number;
  answeredQuestions: number;
  numberOfQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  isLastQuestion,
  scoreBefore,
  answeredQuestions,
  numberOfQuestions,
  onAnswer,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  let currentScore = scoreBefore;

  if (isClicked) {
    const correctOption = question.options.find((option) => option.isCorrect);

    if (correctOption && correctOption.id === selectedOptionId) {
      currentScore++;
    }
  }

  const handleClick = (optionId: string) => {
    setSelectedOptionId(optionId);
    setIsClicked(true);
  };

  const handleNext = () => {
    const correctOption = question.options.find((option) => option.isCorrect);

    onAnswer(correctOption ? correctOption.id === selectedOptionId : false);
    setSelectedOptionId(null);
    setIsClicked(false);
  };

  function getOptionButtonColor(
    optionId: string,
    isCorrect: boolean
  ): ButtonProps["color"] {
    if (!isClicked || !selectedOptionId) {
      return "primary";
    }

    if (isCorrect) {
      return "success";
    }

    if (optionId === selectedOptionId) {
      return "error";
    }

    return "primary";
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <Typography variant="h5">{question.question}</Typography>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        {question.options.map((option) => (
          <OptionButton
            key={`${question.id}-${option.id}`}
            color={getOptionButtonColor(option.id, option.isCorrect)}
            disabled={isClicked}
            onClick={() => handleClick(option.id)}
          >
            {option.text}
          </OptionButton>
        ))}
      </ButtonGroup>
      <Typography>
        Score: {currentScore}/{answeredQuestions} (Total: {numberOfQuestions})
      </Typography>
      {isClicked && (
        <>
          <Divider />
          <Button
            color="secondary"
            disabled={isLastQuestion}
            onClick={handleNext}
          >
            Next question
          </Button>
        </>
      )}
    </Box>
  );
};

export default Question;
