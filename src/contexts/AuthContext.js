import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [triviaQuizData, setTriviaQuizData] = useState("");
  const [categoryId, setCategoryId] = useState(9);
  const [score, setScore] = useState(0);
  const [triviaQuizResponses, setTriviaQuizResponses] = useState([]);
  const categoryIDs = ["27", "11", "12", "9", "22", "23", "19", "17"];

  const fetchTriviaData = (categoryId, email) => {
    fetch(
      `https://opentdb.com/api.php?amount=30&category=${categoryId}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        db.collection(`users/${email}/triviaQuizzes`).doc(`${categoryId}`).set({
          triviaQuizData: data.results,
          score: 0,
          responses: [],
        });
      })
      .catch((error) => console.log(error));
  };

  function register(email, password) {
    const userDocRef = db.collection("users").doc(`${email}`);
    userDocRef
      .set({
        email: email,
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    categoryIDs.forEach((ID) => {
      fetchTriviaData(ID, email);
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    db,
    triviaQuizData,
    categoryId,
    score,
    triviaQuizResponses,
    register,
    signIn,
    signOut,
    resetPassword,
    setTriviaQuizData,
    setCategoryId,
    setScore,
    setTriviaQuizResponses,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
