import React from "react";
import styled from "styled-components";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import useFontLoader from "./hooks/useFontLoader";
import useFirebase from "./hooks/useFirebaseAuth";

const emailRef = React.createRef();
const passwordRef = React.createRef();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: `column`,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: `center`,
    margin: 30
  }
});

const InputWrapper = styled(View)({
  width: `100%`
});

const FormFooter = styled(View)({
  flexFlow: `row`,
  justifyContent: `space-between`,
  width: `100%`,
  padding: 20,
  paddingTop: 0
});

const LoginButton = styled(Button)({
  width: `100%`,
  margin: 10
});

const ErrorStatus = styled(Text)({
  marginTop: -20,
  padding: 10
});

// ad-hoc for poc
const firebaseConfig = {
  apiKey: "AIzaSyB0MYdD5HHnChxk8dFLAz_X8qNo3pd-Oy0",
  authDomain: "dgtlmonkstudio-d95a8.firebaseapp.com",
  databaseURL: "https://dgtlmonkstudio-d95a8.firebaseio.com",
  projectId: "dgtlmonkstudio-d95a8",
  storageBucket: "dgtlmonkstudio-d95a8.appspot.com",
  messagingSenderId: "781702222550",
  appId: "1:781702222550:web:c84beaceb2696fdad4af77",
  measurementId: "G-3VFRK1ZG35"
};

const iosClientID =
  "com.googleusercontent.apps.781702222550-nb8vl5ggu9fgnh5l0ehejojkioggg0h9";

export default function App() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [password2, setPassword2] = React.useState();
  const [formType, setFormType] = React.useState("login");
  const [errors, setErrors] = React.useState({
    email: null,
    password: null
  });
  const [ready] = useFontLoader();
  const {
    isAuthenticated,
    signupUser,
    signinUser,
    signoutUser,
    authError
  } = useFirebase({
    config: firebaseConfig
  });

  React.useEffect(() => {
    // emailRef.current.focus();
    // emailRef.current.shake();
  }, []);

  React.useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  validateForm = () => {
    let isValid = false;

    if (!email) {
      setErrors({ ...errors, ...{ email: "invalid email" } });
      return isValid;
    }

    setErrors({ ...errors, ...{ email: null } });

    if (!password) {
      setErrors({ ...errors, ...{ password: "invalid password" } });
      return isValid;
    }

    setErrors({ ...errors, ...{ password: null } });
    isValid = true;

    return isValid;
  };

  handleSignup = () => {
    signupUser({ email, password });
  };

  handleSignIn = () => {
    const hasError = false;
    if (validateForm()) {
      signinUser({ email, password });
    }
  };

  return (
    <View style={styles.container}>
      <Icon raised name="user" type="entypo" size={32} color={`#2089DC`} />
      <Text style={{ color: `red`, padding: 10 }}>
        {authError && authError.message}
      </Text>

      {isAuthenticated && (
        <>
          <Button
            containerStyle={{ width: `100%`, marginTop: 10 }}
            title="Sign out"
            type="solid"
            onPress={() => signoutUser()}
          />
        </>
      )}

      {isAuthenticated == false && (
        <>
          <InputWrapper>
            <Input
              ref={emailRef}
              placeholder="email"
              label="E-mail"
              onChangeText={val => {
                if (!val) {
                  setErrors({ ...errors, ...{ email: "invalid email" } });
                } else {
                  setErrors({ ...errors, ...{ email: null } });
                }
                setEmail(val);
              }}
              onBlur={() => {
                passwordRef.current.focus();
              }}
              containerStyle={{
                marginBottom: 20
              }}
            />
            <ErrorStatus>{errors.email}</ErrorStatus>
            <Input
              ref={passwordRef}
              onChangeText={val => {
                if (!val) {
                  setErrors({ ...errors, ...{ password: "invalid password" } });
                } else {
                  setErrors({ ...errors, ...{ password: null } });
                }

                setPassword(val);
              }}
              secureTextEntry={true}
              placeholder="password"
              label="Password"
              containerStyle={{
                marginBottom: 20
              }}
            />

            <ErrorStatus>{errors.password}</ErrorStatus>
            {formType != "login" && (
              <Input
                onChangeText={val => setPassword2(val)}
                secureTextEntry={true}
                placeholder="confirm password"
                label="Confirm Password"
              />
            )}
          </InputWrapper>
          <Button
            containerStyle={{ width: `100%`, marginTop: 10 }}
            title={formType === "login" ? `Login` : `Sign Up`}
            type="solid"
            onPress={() => {
              if (formType === "login") {
                // signinUser({ email, password });
                handleSignIn();
                return;
              }

              signupUser({ email, password });
            }}
          />
          <FormFooter>
            <Button type="clear" title="Forgot Password" />
            <Button
              type="clear"
              title={formType === "login" ? `Sign Up` : `Cancel`}
              onPress={() =>
                setFormType(formType === "login" ? "signup" : "login")
              }
            />
          </FormFooter>

          <Button
            containerStyle={{
              width: `100%`,
              marginTop: 10
            }}
            icon={
              <Icon
                type="foundation"
                name="social-google-plus"
                size={32}
                color="red"
              />
            }
            title="Signin with Google"
            titleStyle={{ marginLeft: 10 }}
            type="clear"
            onPress={() => console.log("login with goog on press")}
          />
        </>
      )}
    </View>
  );
}
