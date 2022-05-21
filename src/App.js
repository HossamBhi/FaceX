import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Constants from "expo-constants";
import MainStack from "./navigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  // import fonts 
  const [loaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!loaded) return null;

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <CreateAccount /> */}
        {/* <Login /> */}
        <MainStack />
        <StatusBar style="dark" animated={true} />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 20 : Constants.statusBarHeight,
  },
});
