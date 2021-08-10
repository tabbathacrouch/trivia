import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useStyles } from "./styles";
import { cleanString, shuffleArray } from "./helperFunctions";

function Question({ results }) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBeforeDisabled, setIsBeforeDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [selectedAnswer, setselectedAnswer] = useState("");

  const handleNavigateBefore = (event) => {
    event.preventDefault();
    setCurrentIndex((prevState) => prevState - 1);
    if (currentIndex === 1 || currentIndex === 0) {
      setIsBeforeDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  };

  const handleNavigateNext = (event) => {
    event.preventDefault();
    setCurrentIndex((prevState) => prevState + 1);
    if (currentIndex === 28 || currentIndex === 30) {
      setIsNextDisabled(true);
    } else {
      setIsBeforeDisabled(false);
    }
  };

  const handleButtonClick = (event) => {
    setselectedAnswer(event.target.innerText);
  };

  console.log(results);

  return (
    <div className={classes.container}>
      {results &&
        results.map((question, index) => {
          const answerChoices = shuffleArray(
            question.incorrect_answers.concat([question.correct_answer])
          );

          return (
            <Card key={index} className={classes.root}>
              <CardContent style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.questionNumber}>
                    {results.indexOf(question) + 1}.)
                  </Typography>
                  <CardActions className={classes.controls}>
                    <IconButton
                      aria-label="previous"
                      onClick={handleNavigateBefore}
                      disabled={isBeforeDisabled}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                      aria-label="next"
                      onClick={handleNavigateNext}
                      disabled={isNextDisabled}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </CardActions>
                </div>
                <Typography className={classes.question}>
                  {cleanString(question.question)}
                </Typography>

                <div className={classes.answersContainer}>
                  {answerChoices.map((ac, i) => {
                    return (
                      <Button
                        className={classes.answerChoice}
                        onClick={handleButtonClick}
                        key={i}
                      >
                        {ac}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })[currentIndex]}
    </div>
  );
}

export default Question;
