import React from "react";
import firebase from "firebase";

export default function useFirebaseAuth({ config }) {
  const [isAuthenticated, authenticate] = React.useState(null);
  const [authError, setAuthError] = React.useState(null);

  const [user, setUser] = React.useState(null);

  if (!config) {
    throw Error(
      `Error: useFirebase required configuration constructor params 'config' `
    );
  }

  React.useEffect(() => {
    firebase.initializeApp(config);

    //     try {
    //   await GoogleSignIn.initAsync({ clientId: '<YOUR_IOS_CLIENT_ID>' });
    // } catch ({ message }) {
    //   alert('GoogleSignIn.initAsync(): ' + message);
    // }
  }, []);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        setUser(user);
        authenticate(true);
        setAuthError(null);
      } else {
        setUser(null);
        authenticate(false);
      }
    });
  });

  signupUser = ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        setAuthError({ ...error });
      });
  };

  signinUser = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log("--------");
        console.log(error);

        setAuthError({ ...error });
      });
  };

  signoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        setAuthError(null);
      })
      .catch(error => {
        setAuthError({ ...error });
      });
  };

  resetPassword = email => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .catch(error => {
        setAuthError({ ...error });
      });
  };

  return {
    user,
    isAuthenticated,
    signupUser,
    signinUser,
    signoutUser,
    resetPassword,
    authError
  };
}
