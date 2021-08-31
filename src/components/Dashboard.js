import React, { useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useStyles } from "../styles/styles";

const categories = [
  {
    id: "27",
    name: "Animals",
    score: null,
  },
  {
    id: "11",
    name: "Entertainment: Film",
    score: null,
  },
  {
    id: "12",
    name: "Entertainment: Music",
    score: null,
  },
  {
    id: "9",
    name: "General Knowledge",
    score: null,
  },
  {
    id: "22",
    name: "Geography",
    score: null,
  },
  {
    id: "23",
    name: "History",
    score: null,
  },
  {
    id: "19",
    name: "Science: Mathematics",
    score: null,
  },
  {
    id: "17",
    name: "Science & Nature",
    score: null,
  },
];

function Dashboard({ setCategoryId, setTriviaQuizData }) {
  const classes = useStyles();
  const history = useHistory();
  const { db, currentUser } = useAuth();

  useEffect(() => {
    function getScores() {
      const array = categories.map((i) => i.id);
      array.forEach((id, index) => {
        db.collection(`users/${currentUser.email}/triviaQuizzes`)
          .doc(`${id}`)
          .onSnapshot((doc) => {
            if (doc.data().score > 0) {
              Object.defineProperty(categories[index], "score", {
                value: doc.data().score,
              });
            }
          });
      });
    }
    getScores();
  }, [currentUser.email, db]);

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
        <div key={category.id} className={classes.card_div}>
          <div className={classes.card_score}>
            {category.score
              ? `${Math.round((category.score / 30) * 100)}%`
              : null}
          </div>
          <Card onClick={handleCategorySelection} className={classes.card}>
            <CardContent id={category.id}>{category.name}</CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
