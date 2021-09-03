// TODO: datetimepicker works fine on android but not on iOS
import React, { useState } from "react";
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
import { View, TouchableOpacity } from "react-native";

// Allows user to choose dates and/or times from a drop-down calendar view
import DateTimePicker from "@react-native-community/datetimepicker";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// Use the brand color for icons (for some reason won't work; forced to hardcode style)
// darkLight also will not work :(
// const { brand, darkLight } = Colors;

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));

  // User DOB to be sent
  const [dob, setDob] = useState();

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
            />
          )}

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              dateOfBirth: "",
              password: "",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="John Doe"
                  placeholderTextColor={"#9CA3AF"}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />

                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="johndoe@gmail.com"
                  placeholderTextColor={"#9CA3AF"}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="DD/MM/YYY"
                  placeholderTextColor={"#9CA3AF"}
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
                  placeholderTextColor={"#9CA3AF"}
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
                  placeholderTextColor={"#9CA3AF"}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmpassword")}
                  value={values.confirmpassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MsgBox>...</MsgBox>
                {/* Insert the style component for a button */}
                <StyledButton onPress={handleSubmit}>
                  {/* Insert the styled button text */}
                  <ButtonText>Sign Up</ButtonText>
                </StyledButton>
                {/* Insert styled horizontal line component */}
                <Line />
                {/* Insert Extra View component and place styled extra text into it */}
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  {/* Follow no account query with a link to create account */}
                  {/* Insert style component to contain a link text component */}
                  <TextLink>
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
        <Octicons name={icon} size={30} color={"#6D28D9"} />
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
            color={"#6D28D9"}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
