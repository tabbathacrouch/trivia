import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TriviaQuiz from "./TriviaQuiz";
import SignIn from "./SignIn";
import Register from "./Register";
import "./App.css";

function App() {
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
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li className="link">
              <Link to="/">Trivia Quiz</Link>
            </li>
            <li className="link">
              <Link to="/sign-in">Sign in</Link>
            </li>
            <li className="link">
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <TriviaQuiz results={results} score={score} setScore={setScore} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
