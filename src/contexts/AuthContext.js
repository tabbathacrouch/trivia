import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const categoryIDs = ["27", "11", "12", "9", "22", "23", "19", "17"];

  function register(email, password) {
    const userDocRef = db.collection("users").doc(`${email}`);
    userDocRef
      .set({
        email: email,
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    categoryIDs.forEach((category) => {
      db.collection(`users/${email}/triviaQuizzes`).doc(`${category}`).set({
        triviaQuizData: [],
        score: 0,
        responses: [],
      });
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
    register,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
