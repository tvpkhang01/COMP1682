import "react-native-url-polyfill/auto";
import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRegistry } from "react-native";
import AppState from "./context/AppState";
import App from "./App";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <AppState>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="App" component={App} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppState>
  );
};

AppRegistry.registerComponent("main", () => Main);
