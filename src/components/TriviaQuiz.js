import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Question from "./Question";
import { useAuth } from "../contexts/AuthContext";
import { useStyles } from "../styles/styles";
import TriviaResponsesDisplay from "./TriviaResponsesDisplay";
import { useHistory } from "react-router-dom";

function TriviaQuiz() {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayQuiz, setDisplayQuiz] = useState(true);
  const {
    db,
    currentUser,
    categoryId,
    score,
    setScore,
    setTriviaQuizData,
    setTriviaQuizResponses,
    triviaQuizResponses,
  } = useAuth();
  const history = useHistory();

  function addScore(categoryId, score) {
    db.collection(`users/${currentUser.email}/triviaQuizzes`)
      .doc(`${categoryId}`)
      .update({
        score: score,
      });
  }

  useEffect(() => {
    let currentScore = [];
    triviaQuizResponses.forEach((response) => {
      if (response.correct === true) {
        currentScore.push(response);
      }
    });
    setScore(currentScore.length);
    addScore(categoryId, score);
  });

  function getTriviaQuizResponses(categoryId) {
    db.collection(`users/${currentUser.email}/triviaQuizzes`)
      .doc(`${categoryId}`)
      .get()
      .then((doc) => setTriviaQuizResponses(doc.data().responses));
  }

  const handleSubmitTriviaResponsesButton = () => {
    // maybe add a confirm/alert box here?
    addScore(categoryId, score);
    setDisplayQuiz(false);
    getTriviaQuizResponses(categoryId);
  };

  const handleNewTriviaQuizButton = () => {
    setDisplayQuiz(true);
    history.push("/dashboard");
  };

  useEffect(() => {
    const docRef = db
      .collection(`users/${currentUser.email}/triviaQuizzes`)
      .doc(`${categoryId}`);

    function getTriviaQuizData() {
      docRef
        .get()
        .then((doc) => {
          setTriviaQuizData(doc.data().triviaQuizData);
        })
        .catch((error) => console.log(error));
    }
    getTriviaQuizData();
  }, [db, categoryId, currentUser, setTriviaQuizData]);

  return (
    <div className={classes.root}>
      {displayQuiz ? (
        <>
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <div style={{ textAlign: "center", marginTop: "-3em" }}>
            <Button
              onClick={handleSubmitTriviaResponsesButton}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Submit Trivia Responses
            </Button>
          </div>
        </>
      ) : (
        <>
          <TriviaResponsesDisplay />
          <div style={{ textAlign: "center", marginTop: "2em" }}>
            <Button
              onClick={handleNewTriviaQuizButton}
              variant="contained"
              color="primary"
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
