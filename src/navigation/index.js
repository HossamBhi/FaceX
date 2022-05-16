import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import TabNavigator from "./tabs";

const Stack = createStackNavigator();

const MainStack = () => {
  const { logedUser } = useSelector((state) => state.users);
  return (
    <Stack.Navigator
      initialRouteName={logedUser === null ? "CreateAccount" : "TabNavigator"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default MainStack;
