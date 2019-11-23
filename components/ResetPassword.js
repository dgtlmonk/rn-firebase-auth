import React from "react";
import styled from "styled-components";
import { Overlay, Input, Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";

import useFormValidator from "../hooks/useFormValidator";

const InputWrapper = styled(View)({
  width: `100%`
});

const ErrorStatus = styled(Text)({
  marginTop: -20,
  padding: 10
});

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

export default ({ isVisible = false, onSubmit, onCancel }) => {
  const { isValidEmail } = useFormValidator();
  const [email, setEmail] = React.useState();
  const [error, setError] = React.useState(null);
  const forgotEmailRef = React.createRef();

  React.useEffect(() => {
    if (isVisible) {
      forgotEmailRef.current.focus();
    }
  }, [isVisible]);

  return (
    <Overlay isVisible={isVisible} height={`50%`}>
      <View style={styles.container}>
        <InputWrapper>
          <Input
            placeholder="email"
            label="E-mail"
            ref={forgotEmailRef}
            onChangeText={val => {
              if (!val || !isValidEmail(val)) {
                setError("Invalid Email");
              } else {
                setError(null);
              }

              setEmail(val);
            }}
            containerStyle={{
              marginBottom: 20
            }}
          />
          <ErrorStatus>{error}</ErrorStatus>
          <Button
            title="Reset Password"
            onPress={() => {
              if (isValidEmail(email)) {
                onSubmit(email);
              } else {
                setError("Invalid email");
              }
            }}
            containerStyle={{ width: `100%`, marginBottom: 10 }}
          />
          <Button
            onPress={onCancel}
            title="Cancel"
            containerStyle={{ width: `100%` }}
          />
        </InputWrapper>
      </View>
    </Overlay>
  );
};
