import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import AnswerChoices from "./AnswerChoices";
import { cleanString } from "../helper functions/helperFunctions";
import { useAuth } from "../contexts/AuthContext";

function Question({ currentIndex, setCurrentIndex }) {
  const classes = useStyles();
  const { triviaQuizData } = useAuth();

  return (
    <div className={classes.container}>
      {triviaQuizData &&
        triviaQuizData.map((question, index) => {
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
                    {index + 1}.)
                  </Typography>
                  <div className={classes.questionNumber}>
                    <Typography>{index + 1}/30</Typography>
                  </div>
                </div>
                <Typography className={classes.question}>
                  {cleanString(question.question)}
                </Typography>
                <div className={classes.answersContainer}>
                  <AnswerChoices
                    index={index}
                    question={question}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })[currentIndex]}
    </div>
  );
}

export default Question;
