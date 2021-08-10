import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "./styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AnswerChoices from "./AnswerChoices";
import { cleanString } from "./helperFunctions";

function Question({ results, setScore }) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBeforeDisabled, setIsBeforeDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

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

  return (
    <div className={classes.container}>
      {results &&
        results.map((question, index) => {
          return (
            <Card key={index}>
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
                  <AnswerChoices question={question} setScore={setScore} />
                </div>
              </CardContent>
            </Card>
          );
        })[currentIndex]}
    </div>
  );
}

export default Question;
