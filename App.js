import React from "react";
import styled from "styled-components";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import useFontLoader from "./hooks/useFontLoader";
import useFirebase from "./hooks/useFirebaseAuth";
import useFormValidator from "./hooks/useFormValidator";
import firebaseConfig from "./config/firebase";
import PasswordField from "./components/PasswordField";

const emailRef = React.createRef();
const passwordRef = React.createRef();
const passwordConfirmRef = React.createRef();

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

const iosClientID =
  "com.googleusercontent.apps.781702222550-nb8vl5ggu9fgnh5l0ehejojkioggg0h9";

export default function App() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setpasswordConfirm] = React.useState();
  const [formType, setFormType] = React.useState("login");
  const [errors, setErrors] = React.useState({
    email: null,
    password: null,
    passwordConfirm: null
  });

  const [ready] = useFontLoader();
  const { isValidEmail } = useFormValidator();
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

    if (!email || !isValidEmail(email)) {
      setErrors({ ...errors, ...{ email: "invalid email" } });
      return isValid;
    }

    setErrors({ ...errors, ...{ email: null } });

    if (!password) {
      setErrors({ ...errors, ...{ password: "invalid password" } });
      passwordRef.current.focus();
      return isValid;
    }

    setErrors({ ...errors, ...{ password: null } });
    isValid = true;

    return isValid;
  };

  handleSignIn = () => {
    const hasError = false;
    if (validateForm()) {
      signinUser({ email, password });
    }
  };

  handleSignup = () => {
    if (validateForm()) {
      if (password !== passwordConfirm) {
        setErrors({
          ...errors,
          ...{ passwordConfirm: "Password does not match " }
        });
        return;
      }

      signupUser({ email, password });
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
            onPress={() => {
              setFormType("login");
              signoutUser();
            }}
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
                if (!val || !isValidEmail(val)) {
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
            <PasswordField
              ref={passwordRef}
              error={errors.password}
              onChangeText={val => {
                if (!val) {
                  setErrors({
                    ...errors,
                    ...{ password: "invalid password" }
                  });
                } else {
                  setErrors({ ...errors, ...{ password: null } });
                }

                setPassword(val);
              }}
            />

            {formType != "login" && (
              <>
                <PasswordField
                  label="Confirm Password"
                  ref={passwordConfirmRef}
                  error={errors.passwordConfirm}
                  onChangeText={val => {
                    if (!val) {
                      setErrors({
                        ...errors,
                        ...{
                          passwordConfirm: "Confirm password does not match"
                        }
                      });
                    } else {
                      setErrors({ ...errors, ...{ passwordConfirm: null } });
                    }
                    setpasswordConfirm(val);
                  }}
                />
              </>
            )}
          </InputWrapper>

          <Button
            containerStyle={{ width: `100%`, marginTop: 10 }}
            title={formType === "login" ? `Login` : `Sign Up`}
            type="solid"
            onPress={() => {
              if (formType === "login") {
                handleSignIn();
                return;
              }
              handleSignup();
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
