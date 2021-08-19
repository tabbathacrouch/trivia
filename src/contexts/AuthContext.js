import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [triviaQuizData, setTriviaQuizData] = useState("");
  const [triviaQuizResponses, setTriviaQuizResponses] = useState([]);
  const [score, setScore] = useState(0);

  const fetchTriviaData = () => {
    fetch(
      "https://opentdb.com/api.php?amount=30&category=11&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setTriviaQuizData(data.results);
      })
      .catch((error) => console.log(error));
  };

  function register(name, email, password) {
    const userDocRef = db.collection("users").doc(`${email}`);
    userDocRef
      .set({
        name: name,
        email: email,
        triviaQuizData: {
          score: 0,
          responses: [],
          data: triviaQuizData,
        },
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    userDocRef.update({
      "triviaQuizData.responses": firebase.firestore.FieldValue.arrayRemove(""),
    });
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function addTriviaResponse(selection) {
    const userDocRef = db.collection("users").doc(currentUser.email);
    userDocRef
      .update({
        "triviaQuizData.responses":
          firebase.firestore.FieldValue.arrayUnion(selection),
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  function getTriviaResponses() {
    if (currentUser) {
      const userDocRef = db.collection("users").doc(currentUser.email);
      userDocRef.get().then((doc) => {
        setTriviaQuizResponses(
          doc
            .data()
            .triviaQuizData.responses.filter(
              (response) => response.selectedAnswer
            )
        );
      });
    }
  }

  // function addScore(score) {
  //   db.collection("users")
  //     .doc(currentUser.email)
  //     .update({ [triviaQuizData.score]: score });
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    fetchTriviaData();
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    signIn,
    signOut,
    resetPassword,
    addTriviaResponse,
    triviaQuizData,
    setTriviaQuizData,
    getTriviaResponses,
    triviaQuizResponses,
    db,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
