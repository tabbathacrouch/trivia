import React, { useState } from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import Question from "./Question";
import { useAuth } from "../contexts/AuthContext";
import { useStyles } from "../styles/styles";
import TriviaResponsesDisplay from "./TriviaResponsesDisplay";

function TriviaQuiz({ score, setScore }) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const {
    triviaQuizData,
    setTriviaQuizData,
    getTriviaResponses,
    addScore,
    triviaQuizResponses,
  } = useAuth();

  const handleViewTriviaResponses = () => {
    setIsQuizComplete(true);
    // addScore(score);
    getTriviaResponses();
  };

  return (
    <div className={classes.root}>
      {!isQuizComplete ? (
        <Question
          triviaQuizData={triviaQuizData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      ) : (
        // triviaQuizData.map((question, index) => {
        //   return (
        //     <Card key={index}>
        //       <CardContent>{question.question}</CardContent>
        //     </Card>
        //   );
        // })
        <TriviaResponsesDisplay score={score} />
      )}
      {!isQuizComplete ? (
        <Button onClick={handleViewTriviaResponses}>
          Submit and View Trivia Responses
        </Button>
      ) : null}
    </div>
  );
}

export default TriviaQuiz;

// <Card>
//   <CardContent>
//     <Question
//       results={results}
//       width="100%"
//       setScore={setScore}
//       currentIndex={currentIndex}
//       setCurrentIndex={setCurrentIndex}
//       isQuizComplete={isQuizComplete}
//       setIsQuizComplete={setIsQuizComplete}
//     />
//   </CardContent>
// </Card>
