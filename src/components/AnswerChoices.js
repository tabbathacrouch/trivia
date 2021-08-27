import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { cleanString, shuffleArray } from "../helper functions/helperFunctions";

function AnswerChoices({
  question,
  setCurrentIndex,
  setScore,
  setTriviaQuizResponses,
}) {
  const classes = useStyles();
  const [answerChoices, setAnswerChoices] = useState([]);

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (
      event.target.innerHTML === question.correct_answer &&
      event.target.offsetParent.type === "button"
    ) {
      setTriviaQuizResponses((prevState) => [
        ...prevState,
        {
          selectedAnswer: event.target.innerHTML,
          correct: true,
        },
      ]);
      setScore((prevState) => prevState + 1);
    } else if (event.target.offsetParent.type === "button") {
      setTriviaQuizResponses((prevState) => [
        ...prevState,
        {
          selectedAnswer: event.target.innerHTML,
          correct: false,
        },
      ]);
    }
    setCurrentIndex((prevState) => prevState + 1);
  };

  useEffect(() => {
    const incorrect_answers = question.incorrect_answers.map((AC) =>
      cleanString(AC)
    );
    setAnswerChoices(() =>
      shuffleArray(
        incorrect_answers.concat([cleanString(question.correct_answer)])
      )
    );
  }, [question]);

  return (
    <Container fixed className={classes.answersContainer}>
      {answerChoices.map((ac) => {
        return (
          <Button
            className={classes.answerChoice}
            onClick={handleButtonClick}
            key={ac}
          >
            {ac}
          </Button>
        );
      })}
    </Container>
  );
}

export default AnswerChoices;
