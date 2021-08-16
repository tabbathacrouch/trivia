import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { cleanString, shuffleArray } from "../helper functions/helperFunctions";

function AnswerChoices({
  question,
  setScore,
  selectedAnswers,
  setSelectedAnswers,
}) {
  const [answerChoices, setAnswerChoices] = useState([]);
  const [isDisabled, setisDisabled] = useState(false);
  const classes = useStyles();

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (
      event.target.innerHTML === question.correct_answer &&
      event.target.offsetParent.type === "button"
    ) {
      event.target.offsetParent.style.backgroundColor = "#4caf50";
      setScore((prevState) => prevState + 1);
    } else if (event.target.offsetParent.type === "button") {
      event.target.offsetParent.style.backgroundColor = "#f44336";
    }
    setSelectedAnswers((prevState) => [...prevState, event.target.innerHTML]);
    setisDisabled(!isDisabled);
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
      {answerChoices.map((ac, i) => {
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
      })}
    </Container>
  );
}

export default AnswerChoices;
