import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default ({ right, text, left, style }) => (
  <View style={[styles.container, style]}>
    {left}
    <Text style={styles.text}>{text}</Text>
    {right}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: "5%",
    paddingTop: 20,
    paddingBottom: 25,
    alignItems: "center",
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
  },
});
