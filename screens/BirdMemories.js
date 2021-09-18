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
} from "./../components/styles";

import BirdMemory from "../components/BirdMemory";

const BirdMemories = ({ navigation }) => {
  return (
    <>
      {/* Changed style to "dark" to keep status bar visible */}
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle birdMemories={true}>Bird Memories Gallery</PageTitle>
          <StyledFormArea>
            {/* Insert styled horizontal line component */}
            <Line />
            <BirdMemory resizeMode="cover" />
            {/* Insert the style component for a button */}
            <StyledButton
              // Take the user back to Welcome screen upon selection of button
              onPress={() => navigation.navigate("Welcome")}
            >
              {/* Insert the styled button text */}
              <ButtonText>Go Home</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default BirdMemories;
