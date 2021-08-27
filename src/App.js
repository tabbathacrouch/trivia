import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import TriviaQuiz from "./components/TriviaQuiz";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";

function App() {
  const { currentUser, signOut } = useAuth();
  const [categoryId, setCategoryId] = useState("9");
  const [triviaQuizData, setTriviaQuizData] = useState([]);

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
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="link">
                  <Link to="#" onClick={handleSignOut}>
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="link">
                  <Link to="/">Sign in</Link>
                </li>
                <li className="link">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            setTriviaQuizData={setTriviaQuizData}
          />
          <PrivateRoute
            path="/trivia-quiz"
            component={TriviaQuiz}
            categoryId={categoryId}
            triviaQuizData={triviaQuizData}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
