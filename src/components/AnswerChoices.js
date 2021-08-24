import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { cleanString, shuffleArray } from "../helper functions/helperFunctions";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/firestore";

function AnswerChoices({ question, setCurrentIndex }) {
  const [answerChoices, setAnswerChoices] = useState([]);
  const { db, currentUser, categoryId, setScore } = useAuth();

  // update so that the currentUser can modify or view responses?
  // see comments in dashboard.js

  function addTriviaResponse(selection) {
    const docRef = db
      .collection(`users/${currentUser.email}/triviaQuizzes`)
      .doc(`${categoryId}`);
    docRef
      .update({
        responses: firebase.firestore.FieldValue.arrayUnion(selection),
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  const classes = useStyles();

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (
      event.target.innerHTML === question.correct_answer &&
      event.target.offsetParent.type === "button"
    ) {
      addTriviaResponse({
        selectedAnswer: event.target.innerHTML,
        correct: true,
      });
      setScore((prevState) => prevState + 1);
    } else if (event.target.offsetParent.type === "button") {
      addTriviaResponse({
        selectedAnswer: event.target.innerHTML,
        correct: false,
      });
    }
    setCurrentIndex((prevState) => prevState + 1);
  };

  useEffect(() => {
    const incorrect_answers = question.incorrect_answers.map((AC) =>
      cleanString(AC)
    );
    setAnswerChoices(() =>
      shuffleArray(
        incorrect_answers.concat([cleanString(question.correct_answer)])
      )
    );
  }, [question]);

  return (
    <Container fixed className={classes.answersContainer}>
      {answerChoices.map((ac, i) => {
        return (
          <Button
            className={classes.answerChoice}
            onClick={handleButtonClick}
            key={i}
          >
            {ac}
          </Button>
        );
      })}
    </Container>
  );
}

export default AnswerChoices;
