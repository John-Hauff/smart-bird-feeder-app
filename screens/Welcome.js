import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

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
} from './../components/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function postForm(path, form) {
  const str = [];
  for (let p in form) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(form[p]));
  }
  const body = str.join('&');
  const req = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };
  return fetch(path, req);
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
  // return postForm(PUSH_ENDPOINT, { token: t });
}

const Welcome = ({ navigation }) => {
  // Context variables
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email } = storedCredentials;

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const clearLogin = () => {
    AsyncStorage.removeItem('smartBirdFeederCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      {/* Changed style to "light" to keep status bar visible */}
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require('./../assets/bird_img_2.jpeg')}
        />
        <WelcomeContainer>
          <PageTitle welcome={true}>
            Welcome to the Smart Bird Feeder App!
          </PageTitle>
          <SubTitle welcome={true}>{name || 'John Doe'}</SubTitle>
          <SubTitle welcome={true}>{email || 'johndoe@gmail.com'}</SubTitle>
          <StyledFormArea>
            {/* Insert styled horizontal line component */}
            <Line />

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
