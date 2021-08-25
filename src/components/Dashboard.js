import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useStyles } from "../styles/styles";

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const { setCategoryId } = useAuth();

  // update to show the score if the currentUser has already taken the quiz?
  // could disable the 'card' so that a user can't take the quiz twice?

  //   function getScore(id) {
  //     db.collection(`users/${currentUser.email}/triviaQuizzes`)
  //       .doc(`${id}`)
  //       .onSnapshot((doc) => console.log(doc.data().score));
  //   }
  //   getScore(9);

  const handleCategorySelection = (event) => {
    setCategoryId(event.target.id);
    history.push("/trivia-quiz");
  };

  return (
    <div className={classes.card_container}>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="27">Animals</CardContent>
      </Card>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="11">Entertainment: Film</CardContent>
      </Card>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="12">Entertainment: Music</CardContent>
      </Card>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="9">General Knowledge</CardContent>
      </Card>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="22">Geography</CardContent>
      </Card>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="23">History</CardContent>
      </Card>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="19">Science: Mathematics</CardContent>
      </Card>
      <Card onClick={handleCategorySelection} className={classes.card}>
        <CardContent id="17">Science & Nature</CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
