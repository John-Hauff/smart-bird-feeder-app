import React from "react";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Welcome from "../screens/Welcome";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          options={{ headerTintColor: "#FFFFFF" }}
          name="Welcome"
          component={Welcome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
