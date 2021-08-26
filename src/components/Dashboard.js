import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useStyles } from "../styles/styles";

const categories = [
  {
    id: "27",
    name: "Animals",
  },
  {
    id: "11",
    name: "Entertainment: Film",
  },
  {
    id: "12",
    name: "Entertainment: Music",
  },
  {
    id: "9",
    name: "General Knowledge",
  },
  {
    id: "22",
    name: "Geography",
  },
  {
    id: "23",
    name: "History",
  },
  {
    id: "19",
    name: "Science: Mathematics",
  },
  {
    id: "17",
    name: "Science & Nature",
  },
];

function Dashboard({ categoryId, setCategoryId, setTriviaQuizData }) {
  const classes = useStyles();
  const history = useHistory();
  const { db, currentUser } = useAuth();

  async function fetchAndSetTriviaData(categoryId, email) {
    const docRef = db
      .collection(`users/${email}/triviaQuizzes`)
      .doc(`${categoryId}`);
    await fetch(
      `https://opentdb.com/api.php?amount=30&category=${categoryId}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        docRef.update({
          triviaQuizData: data.results,
        });
        setTriviaQuizData(data.results);
      })
      .catch((error) => console.log(error));
  }

  // update to show the score if the currentUser has already taken the quiz?
  // could disable the 'card' so that a user can't take the quiz twice?

  // function getScore(id) {
  //   db.collection(`users/${currentUser.email}/triviaQuizzes`)
  //     .doc(`${id}`)
  //     .onSnapshot((doc) => {
  //       return doc.data().score;
  //     });
  // }

  async function handleCategorySelection(event) {
    setCategoryId(event.target.id);
    try {
      fetchAndSetTriviaData(categoryId, currentUser.email);
      history.push("/trivia-quiz");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.card_container}>
      {categories.map((category) => (
        <div key={category.id} className={classes.card_div}>
          <Card onClick={handleCategorySelection} className={classes.card}>
            <CardContent id={category.id}>{category.name}</CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
