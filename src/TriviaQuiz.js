import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { calculateScore } from "./helperFunctions";
import Question from "./Question";
import { useStyles } from "./styles";

function TriviaQuiz({ results, score, setScore }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <div className={classes.score}>{calculateScore(score)}%</div>
          <Question results={results} width="100%" setScore={setScore} />
        </CardContent>
      </Card>
    </div>
  );
}

export default TriviaQuiz;
