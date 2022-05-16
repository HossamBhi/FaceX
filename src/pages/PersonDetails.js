import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { primary_color, primary_color_light } from "../utils/colors";
import LinearGradient from "react-native-linear-gradient";
import PageHeader from "../components/common/PageHeader";
import { Entypo } from "@expo/vector-icons";
import CustomeButton from "../components/common/CustomeButton";
import { FONT_BOLD } from "../utils/fonts";
import RowDetail from "../components/persons/RowDetail";

const PersonDetails = ({ navigation, route }) => {
  const { height, width } = useWindowDimensions();
  const person = route.params;

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          "#ffffff",
          primary_color_light,
          primary_color_light,
          primary_color_light,
          "#8C81F7",
        ]}
        style={{ flex: 1 }}
      >
        <View style={[styles.container, { minHeight: height - 60 }]}>
          <View style={styles.topSection}>
            <PageHeader
              style={{ paddingHorizontal: 0 }}
              left={
                <CustomeButton
                  onPress={() => navigation.replace("PersonsPage")}
                  icon={
                    <View style={styles.back}>
                      <Entypo name="chevron-left" size={28} color="#ffffff" />
                    </View>
                  }
                />
              }
              text="People"
            />
            <TextInput
              placeholder="Search"
              style={styles.search}
              placeholderTextColor="#BDBDBD"
            />
            <Image
              source={
                person.image === null
                  ? require("../assets/noUser.png")
                  : { uri: person.image[0].uri }
              }
              style={[styles.image, { right: width / 2 - 75 }]}
              resizeMode="center"
            />
          </View>
          <View style={styles.bottomSection}>
            <CustomeButton
              style={styles.dotts}
              icon={
                <Entypo
                  name="dots-three-horizontal"
                  size={32}
                  color="#9747FF"
                />
              }
              onPress={() => navigation.replace("AddPerson", { person })}
            />
            <View style={{ paddingHorizontal: 16, paddingTop: 15 }}>
              <Text style={styles.name}>{person.name}</Text>
              <RowDetail name="Relation" value={person.relation} />
              <RowDetail name="Age" value={person.age} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingBottom: 100,
  },
  back: {
    backgroundColor: primary_color,
    borderRadius: 1000,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  topSection: {
    backgroundColor: "#AAA1FA",
    paddingHorizontal: "5%",
    borderBottomEndRadius: 26,
    borderBottomStartRadius: 26,
    paddingBottom: 90,
  },
  search: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 1000,
    textAlignVertical: "center",
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 4,
    position: "absolute",
    bottom: -70,
  },
  bottomSection: {
    paddingHorizontal: "5%",
  },
  dotts: { alignSelf: "flex-end", paddingTop: 35 },
  border: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  name: {
    textAlign: "center",
    fontFamily: FONT_BOLD,
    fontSize: 24,
  },
});

export default PersonDetails;
