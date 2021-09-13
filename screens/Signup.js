// TODO: datetimepicker works fine on android but not on iOS
import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

import { Formik } from "formik";

// icons
import { Octicons, Ionicons } from "@expo/vector-icons";

import {
  StyledContainer,
  InnerContainer,
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
import { View, TouchableOpacity, ActivityIndicator } from "react-native";

// Allows user to choose dates and/or times from a drop-down calendar view
import DateTimePicker from "@react-native-community/datetimepicker";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "../components/CredentialsContext";
import { DarkTheme } from "@react-navigation/native";

// Use the brand color for icons
const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  // State var to store the message
  const [message, setMessage] = useState();
  // A message can be a rejected error message or a success message
  const [messageType, setMessageType] = useState();

  // User DOB to be sent
  const [dob, setDob] = useState();

  // Context variables
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext
  );

  // onChange runs when the selected value of DOB changes
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); // hide the date picker window
    setDate(currentDate);
    setDob(currentDate);
  };

  // Function to display the date picker window
  const showDatePicker = () => {
    setShow(true);
  };

  // Handle signup forms
  const handleSignup = (credentials, setSubmitting) => {
    // Clear message board
    handleMessage(null);
    const url = "https://smart-bird-feeder-api.herokuapp.com/user/signup";
    // const url = "http://localhost:3000/user/signup";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          // SUCCESS: Move to Welcome page
          // Signup return data is not an array, so just spread `data`
          persistLogin({ ...data }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        // Likely bad user connection, so show msg to try again
        handleMessage("An error occurred. Check your network and try again");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem(
      "smartBirdFeederCredentials",
      JSON.stringify(credentials)
    )
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Persisting login failed");
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Smart Bird Feeder App</PageTitle>
          <SubTitle>Account Signup</SubTitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date" // Changed this from `mode` to 'date'
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{ width: 320, backgroundColor: "white" }}
            />
          )}

          <Formik
            initialValues={{
              name: "",
              email: "",
              dateOfBirth: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              // Check that no input fields empty
              // Formik can't handle the datetimeopicker input, so deal w/ it manually
              values = { ...values, dateOfBirth: dob };
              if (
                values.email == "" ||
                values.password == "" ||
                values.name == "" ||
                values.dateOfBirth == ""
              ) {
                handleMessage("Please fill out all the Signup fields");
                console.log(
                  values.name,
                  values.email,
                  values.dateOzfBirth,
                  values.password
                );
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage("Passwords do not match");
              } else {
                handleSignup(values, setSubmitting);
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
                  label="Full Name"
                  icon="person"
                  placeholder="John Doe"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />

                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="johndoe@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  value={dob ? dob.toDateString() : ""}
                  isDate={true} // If this true, make changes to input field
                  // We do not want the date field editable
                  // We only want the user to select their DOB from the date picker
                  editable={false}
                  showDatePicker={showDatePicker}
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
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
                    <ButtonText>Signup</ButtonText>
                  </StyledButton>
                )}

                {/* If submitting, use an ActivityIndicator instead of onPress */}
                {/* This ActivityIndicator will show a loading animation on the button when pressed */}
                {isSubmitting && (
                  // Button will not respond to presses while it's loaded when disabled={true}
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                    <ButtonText>Signup</ButtonText>
                  </StyledButton>
                )}

                {/* Insert styled horizontal line component */}
                <Line />
                {/* Insert Extra View component and place styled extra text into it */}
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  {/* Follow no account query with a link to create account */}
                  {/* Insert style component to contain a link text component 
                  that takes user to Login screen upon selection */}
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    {/* Insert style component for actual link text */}
                    {/* Notice how when you select the 'Signup' text, the TextLink component gives it opacity */}
                    <TextLinkContent>Login</TextLinkContent>
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
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {/* 1st condition: if isData is false, pass text input component as usual */}
      {!isDate && <StyledTextInput {...props} />}
      {/* else, wrap the whole text input component in TouchableOpacity style component */}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={brand}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
