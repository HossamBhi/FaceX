import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FONT_MEDIUM } from "../../utils/fonts";
export default ({ name, value }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.value}>{value || " - "}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: FONT_MEDIUM,
    fontSize: 16,
    color: "#000000",
  },
  value: {
    fontFamily: FONT_MEDIUM,
    fontSize: 16,
    color: "#BDBDBD",
  },
});
