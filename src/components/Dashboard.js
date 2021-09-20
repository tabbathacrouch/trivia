import React, { useEffect, useState } from "react";
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

function Dashboard({ setCategoryId, setTriviaQuizData }) {
  const classes = useStyles();
  const history = useHistory();
  const { db, currentUser } = useAuth();

  const fetchAndSetTriviaData = (category, email) => {
    const docRef = db.collection(`users/${email}/triviaQuizzes`).doc(category);
    docRef
      .get()
      .then((doc) => {
        if (doc.data().triviaQuizData.length === 30) {
          setTriviaQuizData(doc.data().triviaQuizData);
        } else {
          fetch(
            `https://opentdb.com/api.php?amount=30&category=${category}&type=multiple`
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
      })
      .catch((error) => console.log(error));
  };

  const handleCategorySelection = (event) => {
    setCategoryId(event.target.id);
    fetchAndSetTriviaData(event.target.id, currentUser.email);
    history.push("/trivia-quiz");
  };

  return (
    <div className={classes.card_container}>
      {categories.map((category) => (
        <ScoreCard
          key={category.id}
          category={category}
          onClick={handleCategorySelection}
        />
      ))}
    </div>
  );
}

function ScoreCard({ category, onClick }) {
  const classes = useStyles();
  const { db, currentUser } = useAuth();
  const [score, setScore] = useState(null);

  useEffect(() => {
    db.collection(`users/${currentUser.email}/triviaQuizzes`)
      .doc(`${category.id}`)
      .onSnapshot((doc) => {
        const categoryScore = doc.data().score;
        if (categoryScore > 0) {
          setScore(categoryScore);
        }
      });
  });

  return (
    <div key={category.id} className={classes.card_div}>
      <div className={classes.card_score}>
        {score ? `${Math.round((score / 30) * 100)}%` : null}
      </div>
      <Card onClick={onClick} className={classes.card}>
        <CardContent id={category.id}>{category.name} </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
