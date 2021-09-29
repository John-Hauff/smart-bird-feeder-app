import React from "react";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Ionicons } from "@expo/vector-icons";

// import screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Welcome from "../screens/Welcome";
import BirdMemories from "../screens/BirdMemories";

const Tab = createBottomTabNavigator();

import { CredentialsContext } from "../components/CredentialsContext";

const RootTab = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
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
                  iconName = focused ? "ios-videocam" : "ios-videocam-outline";
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "purple",
              tabBarInactiveTintColor: "gray",
            })}
            initialRouteName="Login"
          >
            {/* Immediately move to Welcome screen if storedCredentials is not null */}
            {storedCredentials ? (
              <>
                <Tab.Screen
                  options={{ headerTintColor: "#FFFFFF" }}
                  name="Home"
                  component={Welcome}
                />
                <Tab.Screen name="Bird Memories" component={BirdMemories} />
              </>
            ) : (
              <>
                {/* Otherwise, return Tab Navigation for the Login and Signup screens */}
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Signup" component={Signup} />
              </>
            )}
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootTab;
