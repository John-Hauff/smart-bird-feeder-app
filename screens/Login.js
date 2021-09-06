import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import { Formik } from "formik";

// API client
import axios from "axios";

// icons
import { Octicons, Ionicons } from "@expo/vector-icons";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "./../components/styles";
import { View, ActivityIndicator } from "react-native";

// import wrapper for view that avoids keyboard hiding components
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// Use the brand color for icons (for some reason won't work; forced to hardcode style)
// darkLight also will not work :(
// const { brand, darkLight } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  // State var to store the message
  const [message, setMessage] = useState();
  // A message can be a rejected error message or a success message
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials, setSubmitting) => {
    // Clear message board
    handleMessage(null);
    const url = "https://smartbirdfeeder.herokuapp.com/";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          // SUCCESS: Move to Welcome page
          navigation.navigate("Welcome", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        setSubmitting(false);
        // Likely bad user connection, so show msg to try again
        handleMessage("An error occurred. Check your network and try again");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("./../assets/birdhouse_retail.png")}
          />
          <PageTitle>Smart Bird Feeder App</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              // Move to Welcome screen
              // TODO: deal with acct auth
              // Check that no input fields empty
              if (values.email == "" || value.password == "") {
                handleMessage("Please fill out all the login fields");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address" // label above input text
                  icon="mail" // use imported icon image "mail"
                  placeholder="johndoe@gmail.com" // default display text
                  placeholderTextColor={"#9CA3AF"} // default text color
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={"#9CA3AF"}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password} // values.<name-passed-to-handleChange()>
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {/* Insert the style component for a button */}
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    {/* Insert the styled button text */}
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {/* If submitting, use an ActivityIndicator instead of onPress */}
                {/* This ActivityIndicator will show a loading animation on the button when pressed */}
                {isSubmitting && (
                  // Button will not respond to presses while it's loaded when disabled={true}
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={"#FFFFFF"} />
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {/* Insert styled horizontal line component */}
                <Line />
                {/* Insert Extra View component and place styled extra text into it */}
                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  {/* Follow no account query with a link to create account */}
                  {/* Insert style component to contain a link text component 
                  that takes user to Signup screen upon selection */}
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    {/* Insert style component for actual link text */}
                    {/* Notice how when you select the 'Signup' text, the TextLink component gives it opacity */}
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

// Make sure to wrap the parameter's properties in curly braces!
const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={"#6D28D9"} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <KeyboardAvoidingWrapper>
        <StyledTextInput {...props} />
      </KeyboardAvoidingWrapper>
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={"#6D28D9"}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
