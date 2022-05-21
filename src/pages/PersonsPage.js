import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { primary_color, primary_color_light } from "../utils/colors";
import LinearGradient from "react-native-linear-gradient";
import PageHeader from "../components/common/PageHeader";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import CustomeButton from "../components/common/CustomeButton";
import UserRow from "../components/persons/UserRow";

const PersonsPage = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const { persons } = useSelector((state) => state.persons);
  const [searchWord, setSearchWord] = useState("");

  const handleSearchPersons = (item) =>
    item.name.toLowerCase().includes(searchWord.toLocaleLowerCase()) ||
    item.relation.toLowerCase().includes(searchWord.toLocaleLowerCase()) ||
    item.age.toLowerCase().includes(searchWord.toLocaleLowerCase());

  return (
    <LinearGradient
      colors={[
        "#ffffff",
        primary_color_light,
        primary_color_light,
        primary_color_light,
        "#8C81F7",
      ]}
      style={{ paddingHorizontal: "5%", flex: 1, minHeight: height - 60 }}
    >
      <View style={[styles.container, { minHeight: height - 60 }]}>
        <PageHeader
          style={{ paddingHorizontal: 0 }}
          left={
            <CustomeButton
              onPress={() => navigation.goBack()}
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
          value={searchWord}
          onChangeText={setSearchWord}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          data={Object.values(persons).filter(handleSearchPersons)}
          renderItem={({ item }) => (
            <UserRow
              person={item}
              onPress={() => navigation.navigate("AddPerson", { person: item })}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <CustomeButton
          onPress={() => navigation.navigate("AddPerson")}
          style={styles.add}
          icon={
            <Image
              source={require("../assets/add.png")}
              style={{ width: 82, height: 82 }}
            />
          }
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  add: {
    position: "absolute",
    bottom: 20,
    right: 0,
    width: 82,
    height: 82,
  },
  back: {
    backgroundColor: primary_color,
    borderRadius: 1000,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
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
});

export default PersonsPage;
