import React from "react";
// import { GoogleSignIn } from "expo";
import * as GoogleSignIn from "expo-google-sign-in";
// import * as Google from "expo-google-app-auth";

export default ({ clientId }) => {
  const [googleSignInInitialized, setInitialized] = React.useState(false);

  if (!clientId) {
    throw Error(`useGoogle hook requires clientID `);
  }

  React.useEffect(() => {
    (async () => {
      // const { type, accessToken, user } = await Google.logInAsync(config);
      try {
        await GoogleSignIn.initAsync({ clientId });
      } catch ({ message }) {
        console.log("catch on google signin ", message);
        alert("GoogleSignIn.initAsync(): " + message);
      }
    })();
  }, []);

  return [googleSignInInitialized];
};
