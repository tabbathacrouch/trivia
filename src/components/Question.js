import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import AnswerChoices from "./AnswerChoices";
import { cleanString } from "../helper functions/helperFunctions";

function Question({
  currentIndex,
  setCurrentIndex,
  triviaQuizData,
  setScore,
  setTriviaQuizResponses,
}) {
  const classes = useStyles();
  const question = triviaQuizData[currentIndex];

  return question ? (
    <div className={classes.container}>
      <Card>
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography className={classes.questionNumber}>
              {currentIndex + 1}.)
            </Typography>
            <div className={classes.questionNumber}>
              <Typography>{currentIndex + 1}/30</Typography>
            </div>
          </div>
          <Typography className={classes.question}>
            {cleanString(question.question)}
          </Typography>
          <div className={classes.answersContainer}>
            <AnswerChoices
              index={currentIndex}
              question={question}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setScore={setScore}
              setTriviaQuizResponses={setTriviaQuizResponses}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  ) : null;
}

export default Question;
