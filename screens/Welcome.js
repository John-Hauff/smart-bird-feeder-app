import React from "react";
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
  Avatar,
} from "./../components/styles";

const Welcome = () => {
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
          <SubTitle welcome={true}>John Doe</SubTitle>
          <SubTitle welcome={true}>johndoe@gmail.com</SubTitle>
          <StyledFormArea>
            {/* Insert fancy welcome image! */}
            <Avatar
              resizeMode="cover"
              source={require("./../assets/birdman.jpg")}
            />
            {/* Insert styled horizontal line component */}
            <Line />
            {/* Insert the style component for a button */}
            <StyledButton onPress={() => {}}>
              {/* Insert the styled button text */}
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
