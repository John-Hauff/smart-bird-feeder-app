import React from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// import screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import BirdMemories from '../screens/BirdMemories';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { CredentialsContext } from '../components/CredentialsContext';

const loadInitialScreen = (storedCredentials) => {
  if (storedCredentials) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Bird Memories') {
              iconName = focused ? 'ios-images' : 'ios-images-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
        initialRouteName="Login"
      >
        <>
          <Tab.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Welcome}
          />
          <Tab.Screen
            name="Bird Memories"
            options={{ headerShown: false }}
            component={BirdMemories}
          />
        </>
      </Tab.Navigator>
    );
  }

  return (
    // Otherwise, return stack navigator with sctacked screens of the Login and Signup screens
    <Stack.Navigator
      screenOptions={{
        headerStyled: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#1F2937',
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
    >
      <Stack.Screen name="Login" headerShown={false} component={Login} />
      <Stack.Screen name="Signup" headerShown={false} component={Signup} />
    </Stack.Navigator>
  );
};

const RootTab = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          {/* Immediately move to Welcome screen if storedCredentials is not nullish */}
          {/* Load the Welcome screen if credentials are stored, else load login screen */}
          {loadInitialScreen(storedCredentials)}
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootTab;
