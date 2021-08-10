import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { shuffleArray } from "./helperFunctions";

function AnswerChoices({ question, setScore }) {
  const [selectedAnswer, setselectedAnswer] = useState("");
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
    setselectedAnswer(event.target.innerHTML);
    setisDisabled(!isDisabled);
  };

  useEffect(() => {
    setAnswerChoices(() =>
      shuffleArray(question.incorrect_answers.concat([question.correct_answer]))
    );
  }, [question]);

  return (
    <div className={classes.answersContainer}>
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
    </div>
  );
}

export default AnswerChoices;
