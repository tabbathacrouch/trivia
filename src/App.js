import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TriviaQuiz from "./components/TriviaQuiz";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";

function App() {
  const [results, setResults] = useState("");
  const [score, setScore] = useState(0);
  const { currentUser, signOut } = useAuth();

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

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("Failed to sign out");
    }
  }

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            {currentUser ? (
              <>
                <li>{currentUser.email}</li>
                <li className="link">
                  <Link to="#" onClick={handleSignOut}>
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="link">
                  <Link to="/sign-in">Sign in</Link>
                </li>
                <li className="link">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <PrivateRoute
            path="/trivia-quiz"
            exact
            component={TriviaQuiz}
            results={results}
            score={score}
            setScore={setScore}
          />
          {/* <Route exact path="/">
            <TriviaQuiz results={results} score={score} setScore={setScore} />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
