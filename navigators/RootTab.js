import React from "react";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Octicons, Ionicons } from "@expo/vector-icons";

// import screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Welcome from "../screens/Welcome";
import BirdMemories from "../screens/BirdMemories";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { CredentialsContext } from "../components/CredentialsContext";
import LivestreamScreen from "../screens/Livestream";

const RootTab = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          {/* Immediately move to Welcome screen if storedCredentials is not null */}
          {storedCredentials ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Home") {
                    iconName = focused ? "ios-home" : "ios-home-outline";
                  } else if (route.name === "Settings") {
                    iconName = focused
                      ? "ios-information-circle"
                      : "ios-information-circle-outline";
                  } else if (route.name === "Bird Memories") {
                    iconName = focused ? "ios-images" : "ios-images-outline";
                  } else if (route.name === "Livestream") {
                    iconName = focused
                      ? "ios-videocam"
                      : "ios-videocam-outline";
                  }
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "purple",
                tabBarInactiveTintColor: "gray",
              })}
              initialRouteName="Login"
            >
              <>
                <Tab.Screen
                  options={{ headerTintColor: "#FFFFFF" }}
                  name="Home"
                  component={Welcome}
                />
                <Tab.Screen name="Bird Memories" component={BirdMemories} />
                <Tab.Screen name="Livestream" component={LivestreamScreen} />
              </>
            </Tab.Navigator>
          ) : (
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
            >
              {/* Otherwise, return stack of the Login and Signup screens */}
              <Stack.Screen
                name="Login"
                headerShown={false}
                component={Login}
              />
              <Stack.Screen
                name="Signup"
                headerShown={false}
                component={Signup}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootTab;
