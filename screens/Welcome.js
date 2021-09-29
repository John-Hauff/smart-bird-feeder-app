import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
} from "./../components/styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "../components/CredentialsContext";

const Welcome = ({ navigation }) => {
  // Context variables
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext
  );
  const { name, email } = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem("smartBirdFeederCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* Changed style to "light" to keep status bar visible */}
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("./../assets/bird_img_2.jpeg")}
        />
        <WelcomeContainer>
          <PageTitle welcome={true}>
            Welcome to the Smart Bird Feeder App!
          </PageTitle>
          <SubTitle welcome={true}>{name || "John Doe"}</SubTitle>
          <SubTitle welcome={true}>{email || "johndoe@gmail.com"}</SubTitle>
          <StyledFormArea>
            {/* Insert styled horizontal line component */}
            <Line />
            {/* Insert the style component for a button */}
            <StyledButton
              // Take the user back to Login screen upon selection of Logout button
              onPress={() => navigation.navigate("Bird Memories")}
            >
              {/* Insert the styled button text */}
              <ButtonText>View Bird Memories</ButtonText>
            </StyledButton>

            <StyledButton
              // Take the user back to Login screen upon selection of Logout button
              onPress={clearLogin}
            >
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
