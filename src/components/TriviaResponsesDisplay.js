import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { cleanString } from "../helper functions/helperFunctions";

function TriviaResponsesDisplay({
  triviaQuizData,
  triviaQuizResponses,
  score,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.score}>
        {score}/30 = {Math.round((score / 30) * 100)}%
      </div>
      {triviaQuizData.map((question, index) => (
        <CardContent key={index}>
          <div
            className={classes.response}
            style={{
              backgroundColor:
                triviaQuizResponses[index] && triviaQuizResponses[index].correct
                  ? "rgba(102, 187, 106, 0.7)"
                  : "rgba(239,83,80,0.7)",
            }}
          >
            {[index + 1]}.) {cleanString(question.question)}
            {"  "}
            <strong>
              {triviaQuizResponses[index] &&
                triviaQuizResponses[index].selectedAnswer}
            </strong>
          </div>
        </CardContent>
      ))}
    </Card>
  );
}

export default TriviaResponsesDisplay;
