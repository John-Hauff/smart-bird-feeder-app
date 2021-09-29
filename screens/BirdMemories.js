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
import axios from "axios";

const BirdMemories = ({ navigation }) => {
  // Handle moving to next bird memory in the image gallery
  const handleNext = () => {
    // axios.get;
  };

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
            <BirdMemory />
            {/* Insert the style component for a button */}
            <StyledButton
              // Load the next bird memory
              onPress={() => navigation.navigate("Home")}
            >
              {/* Insert the styled button text */}
              <ButtonText>Previous</ButtonText>
            </StyledButton>
            <StyledButton
              // Load the next bird memory
              onPress={() => navigation.navigate("Welcome")}
            >
              {/* Insert the styled button text */}
              <ButtonText>Next</ButtonText>
            </StyledButton>
            <StyledButton
              // Take the user back to Home screen upon selection of button
              onPress={() => navigation.navigate("Home")}
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
