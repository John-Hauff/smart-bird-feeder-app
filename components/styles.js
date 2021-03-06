// TODO: Use more % in styles rather than explicit px values
//  https://medium.com/@shanerudolfworktive/7-tips-to-develop-react-native-uis-for-all-screen-sizes-7ec5271be25c
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

const StatusBarHeight = Constants.statusBarHeight;

const win = Dimensions.get('window');
const WIN_WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

// Get ratio to scale image height
const ratio = win.width / 1280; // 1280 is width of actual image

// colors
export const Colors = {
  primary: '#FFFFFF',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#6D28D9',
  green: '#10B981',
  red: '#EF4444',
  black: '#000000',
};

// Create an object for each color so we can refer to each by name
const { primary, secondary, tertiary, darkLight, brand, green, red, black } =
  Colors;

// May want to modify padding-top to be platform-specific
// See expo-status-bar or just use Contants w/ tertiary
export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

// Since WelcomeContainer is similar to the InnerContainer,
// we can just pass in all the styles from InnerContainer
// as a param, then add a few extra styles as well
export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 300px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: -15px;
`;

// Styles for user's avatar (profile pic)
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
  height: 50%;
  max-width: 100%;
`;

// DEPRECATED
export const StyledBirdMemory = styled.Image`
  width: ${win.width + 'px'};
  height: ${720 * ratio + 'px'};
  border-width: 1px;
  border-color: ${black};
  resize-mode: ${'contain'};
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const BirdMemoriesContainer = styled.View`
  background-color: ${'white'}};
  align-items: center;
`;

export const CarouselContainer = styled.View`
  flex: ${6};
  align-items: center;
  ${'' /* padding: ${(WIN_WIDTH - ITEM_WIDTH) / 2 + "px"}; */}
  padding-left: ${(WIN_WIDTH - ITEM_WIDTH) / 2 + 'px'};
  ${'' /* padding-left: 0px; */}
  padding-top: 20px;
`;

export const BirdMemoriesPageTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${brand};
  text-align: center;
  margin-top: 50px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;

export const BirdMemorySpeciesText = styled.Text`
  color: ${black};
  font-size: 28px;
  font-weight: bold;
  padding-left: 20px;
  padding-top: 10px;
`;

export const BirdMemoryDescText = styled.Text`
  color: ${black};
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ImageIndexTextContainer = styled.View`
  margin-top: 0px;
  padding-horizontal: 32px;
  margin-bottom: 20px;
  align-self: ${'flex-end'};
  flex: 2;
`;

export const ImageIndexText = styled.Text`
  color: ${tertiary};
  font-size: 22px;
  text-align: ${'right'};
`;

export const MyFlatList = styled.FlatList`
  position: ${'absolute'};
  bottom: 90px;
  flex: 1;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

// Call it LeftIcon because icon is left of text field
export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-vertical: 5px;
  height: 60px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 18px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

// Styles a horizontal line to break up the page
export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

// Style for extra text at bottom of screen
export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 0px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

// Opacity click effect for text link
export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

// Size and color of link text
export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;
