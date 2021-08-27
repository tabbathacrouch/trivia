import React, { useState } from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Question from "./Question";
import { useAuth } from "../contexts/AuthContext";
import { useStyles } from "../styles/styles";
import TriviaResponsesDisplay from "./TriviaResponsesDisplay";
import { useHistory } from "react-router-dom";

function TriviaQuiz({ categoryId, triviaQuizData }) {
  const classes = useStyles();
  const { db, currentUser } = useAuth();
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayQuiz, setDisplayQuiz] = useState(true);
  const [triviaQuizResponses, setTriviaQuizResponses] = useState([]);
  const [score, setScore] = useState(0);

  function addScore() {
    let currentScore = [];
    triviaQuizResponses.forEach((response) => {
      if (response.correct === true) {
        currentScore.push(response);
      }
    });
    setScore(currentScore.length);
    db.collection(`users/${currentUser.email}/triviaQuizzes`)
      .doc(`${categoryId}`)
      .update({
        score: score,
      });
  }

  function addTriviaResponses() {
    const docRef = db
      .collection(`users/${currentUser.email}/triviaQuizzes`)
      .doc(`${categoryId}`);
    docRef
      .update({
        responses: triviaQuizResponses,
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  const handleSubmitTriviaResponsesButton = () => {
    // maybe add a confirm/alert box here?
    addScore();
    addTriviaResponses();
    setDisplayQuiz(false);
  };

  const handleNewTriviaQuizButton = () => {
    setDisplayQuiz(true);
    history.push("/dashboard");
  };

  return (
    <div className={classes.root}>
      {displayQuiz ? (
        <>
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            triviaQuizData={triviaQuizData}
            setScore={setScore}
            setTriviaQuizResponses={setTriviaQuizResponses}
          />
          {currentIndex === 30 ? (
            <div style={{ textAlign: "center", marginTop: "2em" }}>
              <Button
                onClick={handleSubmitTriviaResponsesButton}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Submit Trivia Responses
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <TriviaResponsesDisplay
            score={score}
            triviaQuizData={triviaQuizData}
            triviaQuizResponses={triviaQuizResponses}
          />
          <div style={{ textAlign: "center", marginTop: "2em" }}>
            <Button
              onClick={handleNewTriviaQuizButton}
              variant="contained"
              color="primary"
              size="large"
            >
              Start a new Trivia Quiz!
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default TriviaQuiz;
