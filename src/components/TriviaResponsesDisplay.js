import React, { useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";
import { useStyles } from "../styles/styles";
import { cleanString } from "../helper functions/helperFunctions";

function TriviaResponsesDisplay({ score }) {
  const classes = useStyles();
  const { triviaQuizData, getTriviaResponses, triviaQuizResponses } = useAuth();

  console.log("triviaQuizResponses", triviaQuizResponses[0]);

  useEffect(() => {
    getTriviaResponses();
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.score}>{score}%</div>
        {triviaQuizData.map((question, index) => (
          <CardContent key={index}>
            <div
              className={classes.response}
              style={{
                backgroundColor:
                  triviaQuizResponses[index] &&
                  triviaQuizResponses[index].correct
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
    </>
  );
}

export default TriviaResponsesDisplay;
