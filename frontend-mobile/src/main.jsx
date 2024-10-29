import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";
import AppState from "./context/AppState";
import { useFonts } from "expo-font";

function Main() {
  const [fontsLoaded] = useFonts({
    Roboto: require("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <AppState>
        <App />
      </AppState>
    </NavigationContainer>
  );
}

registerRootComponent(Main);
