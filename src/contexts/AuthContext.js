import React, { useContext, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const user = auth.currentUser;
  const categoryIDs = ["27", "11", "12", "9", "22", "23", "19", "17"];

  async function register(email, password) {
    // ***** needs to be fixed... still not writing properly to firestore db *****
    // maybe use a map here instead of forEach?

    try {
      const docRef = doc(collection(db, "users"));
      categoryIDs.forEach((category) => {
        setDoc(docRef, {
          email: email,
          triviaData: {
            category: category,
            triviaQuizData: [],
            score: 0,
            responses: [],
          },
        });
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user created", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log("user signed in", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code: ", errorCode, "error message: ", errorMessage);
    }
  }

  async function signout() {
    try {
      await signOut(auth);
      console.log("user signed out: ", user);
    } catch (error) {
      console.log("sign out error: ", error);
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("password reset email sent");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code: ", errorCode, "errorMessage: ", errorMessage);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // perhaps add useState to track the current user?
        const uid = user.uid;
        console.log("uid: ", uid);
      } else {
        console.log("some shite");
      }
    });
    return unsubscribe;
  }, []);

  // *** moved from Dashboard.js ***
  // *** update with getDocs https://firebase.google.com/docs/web/setup ***
  // const fetchAndSetTriviaData = (category, email) => {
  //   const docRef = db.collection(`users/${email}/triviaQuizzes`).doc(category);
  //   docRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.data().triviaQuizData.length === 30) {
  //         setTriviaQuizData(doc.data().triviaQuizData);
  //       } else {
  //         fetch(
  //           `https://opentdb.com/api.php?amount=30&category=${category}&type=multiple`
  //         )
  //           .then((response) => response.json())
  //           .then((data) => {
  //             docRef.update({
  //               triviaQuizData: data.results,
  //             });
  //             setTriviaQuizData(data.results);
  //           })
  //           .catch((error) => console.log(error));
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  const value = { user, register, signIn, signout, resetPassword };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ***** OLD REGISTER FUNCTION ******
// function register(email, password) {
//   const userDocRef = db.collection("users").doc(`${email}`);
//   userDocRef
//     .set({
//       email: email,
//     })
//     .catch((error) => {
//       console.error("Error adding document: ", error);
//     });
//   categoryIDs.forEach((category) => {
//     db.collection(`users/${email}/triviaQuizzes`).doc(`${category}`).set({
//       triviaQuizData: [],
//       score: 0,
//       responses: [],
//     });
//   });
//   return auth.createUserWithEmailAndPassword(email, password);
// }

// ***** OLD SIGNIN FUNCTION *****
// function signIn(email, password) {
//   return auth.signInWithEmailAndPassword(email, password);
// }

// ***** OLD SIGNOUT FUNCTION *****
// function signOut() {
//   return auth.signOut();
// }

// ***** OLD RESET PASSWORD FUNCTION *****
// function resetPassword(email) {
//   return auth.sendPasswordResetEmail(email);
// }

// ***** NO LONGER NEEDED ******
// useEffect(() => {
//   const unsubscribe = auth.onAuthStateChanged((user) => {
//     setCurrentUser(user);
//     setLoading(false);
//   });
//   return unsubscribe;
// }, []);

// ***** UPDATED ABOVE *****
// const value = {
//   currentUser,
//   db,
//   register,
//   signIn,
//   signOut,
//   resetPassword,
// };
