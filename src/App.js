import React, { useState, useEffect } from "react";
import Question from "./Question";
import { useStyles } from "./styles";
import { Card, CardContent } from "@material-ui/core";
import { calculateScore } from "./helperFunctions";

function App() {
  const classes = useStyles();
  const [results, setResults] = useState("");
  const [score, setScore] = useState(0);

  const fetchTriviaData = () => {
    fetch(
      "https://opentdb.com/api.php?amount=30&category=11&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTriviaData();
  }, []);

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

export default App;
