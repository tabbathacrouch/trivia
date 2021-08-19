import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { cleanString, shuffleArray } from "../helper functions/helperFunctions";
import { useAuth } from "../contexts/AuthContext";

function AnswerChoices({
  currentIndex,
  setCurrentIndex,
  index,
  question,
  setScore,
  selection,
  setSelection,
}) {
  const [answerChoices, setAnswerChoices] = useState([]);
  const [isDisabled, setisDisabled] = useState(false);
  const { addTriviaResponse } = useAuth();

  const classes = useStyles();

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (
      event.target.innerHTML === question.correct_answer &&
      event.target.offsetParent.type === "button"
    ) {
      event.target.offsetParent.style.backgroundColor = "#4caf50";
      addTriviaResponse({
        selectedAnswer: event.target.innerHTML,
        correct: true,
      });
    } else if (event.target.offsetParent.type === "button") {
      event.target.offsetParent.style.backgroundColor = "#f44336";
      addTriviaResponse({
        selectedAnswer: event.target.innerHTML,
        correct: false,
      });
    }
    setisDisabled(!isDisabled);
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
      {true
        ? answerChoices.map((ac, i) => {
            return (
              <Button
                className={classes.answerChoice}
                onClick={handleButtonClick}
                key={i}
                disabled={isDisabled}
              >
                {ac}
              </Button>
            );
          })
        : "hello"}
    </Container>
  );
}

export default AnswerChoices;
