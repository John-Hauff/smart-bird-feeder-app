import React from "react";

// import RootStack, which has navigator for screens
import RootStack from "./navigators/RootStack";

import AppLoading from "expo-app-loading";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "./components/CredentialsContext";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("smartBirdFeederCredentials") // get item from item key
      .then((result) => {
        if (result !== null) {
          setStoredCredential(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={}
        onFinish={() => {
          setAppReady(true);
        }}
        onError={console.warn}
      />
    );
  }
  return (
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >
      <RootStack />
    </CredentialsContext.Provider>
  );
}
