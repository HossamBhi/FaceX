import { Image, View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Medication from "../pages/Medication";
import Homepage from "../pages/Homepage";
import Activities from "../pages/Activities";
import PersonsPage from "../pages/PersonsPage";
import { primary_color } from "../utils/colors";
import { FONT_MEDIUM } from "../utils/fonts";
import { createStackNavigator } from "@react-navigation/stack";
import AddPerson from "../pages/AddPerson";
import PersonDetails from "../pages/PersonDetails";
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const PersonsStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="PersonsPage"
  >
    <Stack.Screen name="PersonsPage" component={PersonsPage} />
    <Stack.Screen name="AddPerson" component={AddPerson} />
    <Stack.Screen name="PersonDetails" component={PersonDetails} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    shifting={false}
    screenOptions={{
      tabBarActiveTintColor: primary_color,
      tabBarInactiveTintColor: "#000",
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingTop: 10,
        paddingBottom: 5,
        height: 60,
        shadowColor: "#9E9E9E33",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.5,
        elevation: 5,
      },
    }}
  >
    <Tab.Screen
      name="HomePage"
      component={Homepage}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <View style={styles.tabBarIcon}>
            <Image
              source={require("../assets/home.png")}
              resizeMode="contain"
              style={{ width: focused ? 26 : 24, height: focused ? 26 : 24 }}
            />
            {focused && <Text style={[styles.tabLabel, { color }]}>Home</Text>}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Medication"
      component={Medication}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <View style={styles.tabBarIcon}>
            <Image
              source={require("../assets/medication.png")}
              resizeMode="contain"
              style={{ width: focused ? 26 : 24, height: focused ? 26 : 24 }}
            />
            {focused && (
              <Text style={[styles.tabLabel, { color }]}>Medication</Text>
            )}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Activities"
      component={Activities}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <View style={styles.tabBarIcon}>
            <Image
              source={require("../assets/activities.png")}
              resizeMode="contain"
              style={{ width: focused ? 26 : 24, height: focused ? 26 : 24 }}
            />
            {focused && (
              <Text style={[styles.tabLabel, { color }]}>Activities</Text>
            )}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="PersonsStack"
      component={PersonsStack}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <View style={styles.tabBarIcon}>
            <Image
              source={require("../assets/persons.png")}
              resizeMode="contain"
              style={{ width: focused ? 26 : 24, height: focused ? 26 : 24 }}
            />
            {focused && (
              <Text style={[styles.tabLabel, { color }]}>Medication</Text>
            )}
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarIcon: { alignItems: "center", justifyContent: "center" },
  tabLabel: { fontFamily: FONT_MEDIUM, fontSize: 10 },
});
