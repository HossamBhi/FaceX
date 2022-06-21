import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import TabNavigator from "./tabs";
import Menu from "../pages/Menu";
import Profile from "../pages/Profile";
import PersonsPage from "../pages/PersonsPage";
import AddPerson from "../pages/AddPerson";
import PersonDetails from "../pages/PersonDetails";

const Stack = createStackNavigator();

const MainStack = () => {
  const { logedUser } = useSelector((state) => state.users);
  return (
    <Stack.Navigator
      // initialRouteName={"TabNavigator"}
      initialRouteName={
        logedUser === null
          ? "CreateAccount"
          : logedUser?.type === 1
          ? "PersonsPage"
          : "TabNavigator"
      }
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PersonsPage" component={PersonsPage} />
      <Stack.Screen name="AddPerson" component={AddPerson} />
      <Stack.Screen name="PersonDetails" component={PersonDetails} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      {/* {logedUser?.type === 1 ? (
        <>
          <Stack.Screen name="PersonsPage" component={PersonsPage} />
          <Stack.Screen name="AddPerson" component={AddPerson} />
          <Stack.Screen name="PersonDetails" component={PersonDetails} />
        </>
      ) : (
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      )} */}
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStack;
