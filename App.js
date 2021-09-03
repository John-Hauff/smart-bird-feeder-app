import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

// import RootStack, which has navigator for screens
import RootStack from "./navigators/RootStack";

export default function App() {
  return <RootStack />;
}
