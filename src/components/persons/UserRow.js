import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CustomeButton from "../common/CustomeButton";
import { FONT_MEDIUM } from "../../utils/fonts";

export default ({ person, onPress }) => {
  const { name, relation, image, age } = person;

  return (
    <View style={styles.container}>
      <Image
        source={
          image === null
            ? require("../../assets/noUser.png")
            : { uri: image[0].uri }
        }
        style={styles.image}
        resizeMode="center"
      />
      <View style={[styles.centerSection, styles.border]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.relation}>{relation}</Text>
      </View>
      <CustomeButton
        icon={<Entypo name="dots-three-horizontal" size={24} color="#9747FF" />}
        onPress={onPress}
        style={styles.border}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 4,
  },
  centerSection: {
    flex: 1,
    paddingBottom: 30,
    marginStart: 16,
    paddingEnd: 16,
  },
  name: {
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
    paddingBottom: 8,
  },
  relation: {},
  border: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    height: "100%",
  },
});
