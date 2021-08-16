import React, { useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import { calculateScore } from "../helper functions/helperFunctions";
import Question from "./Question";
import { useStyles } from "../styles/styles";

function TriviaQuiz({ results, score, setScore }) {
  const classes = useStyles();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  console.log("selectedAnswers", selectedAnswers);

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <div className={classes.score}>{calculateScore(score)}%</div>
          <Question
            results={results}
            width="100%"
            setScore={setScore}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default TriviaQuiz;
