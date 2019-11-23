/**
 *
 * <PasswordField onChange={} ref={} error={} />
 */

import React from "react";
import styled from "styled-components";

import { View, Text } from "react-native";
import { Input, Icon } from "react-native-elements";

const ErrorStatus = styled(Text)({
  marginTop: -20,
  padding: 10
});

const PasswordField = React.forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = React.useState();

  return (
    <View style={{ position: `relative` }}>
      <Input
        ref={ref}
        onChangeText={val => props.onChangeText && props.onChangeText(val)}
        secureTextEntry={!showPassword}
        placeholder={props.label || "password"}
        label={props.label || "Password"}
        containerStyle={{
          marginBottom: 20
        }}
      />

      <Icon
        containerStyle={{
          position: `absolute`,
          top: 20,
          right: 10,
          width: 40,
          height: 40,
          justifyContent: `center`
        }}
        name={showPassword ? "eye" : "eye-with-line"}
        type="entypo"
        size={16}
        color={`#2089DC`}
        onPress={() => setShowPassword(!showPassword)}
      />

      <ErrorStatus>{props.error}</ErrorStatus>
    </View>
  );
});

export default PasswordField;
