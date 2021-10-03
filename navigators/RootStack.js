// THIS FILE IS DEPRECATED AND IS NO LONGER BEING USED IN APPLICATION
import React from "react";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Welcome from "../screens/Welcome";
import BirdMemories from "../screens/BirdMemories";
import LivestreamScreen from "../screens/Livestream";

const Stack = createNativeStackNavigator();

import { CredentialsContext } from "../components/CredentialsContext";

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyled: {
                backgroundColor: "transparent",
              },
              headerTintColor: "#1F2937",
              headerTransparent: true,
              headerTitle: "",
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
            initialRouteName="Login"
          >
            {/* Immediately move to Welcome screen if storedCredentials is not null */}
            {storedCredentials ? (
              <>
                <Stack.Screen
                  options={{ headerTintColor: "#FFFFFF" }}
                  name="Welcome"
                  component={Welcome}
                />
                <Stack.Screen name="Bird Memories" component={BirdMemories} />
                <Stack.Screen name="Livestream" component={LivestreamScreen} />
              </>
            ) : (
              <>
                {/* Otherwise, return stack of the Login and Signup screens */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
