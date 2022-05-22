import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { primary_color } from "../../utils/colors";
import { FONT_REGULAR } from "../../utils/fonts";
import MedicationItem from "./MedicationItem";

export default ({ date, items, isShowDate }) => (
  <View style={styles.container}>
    {isShowDate !== false && <Text style={styles.day}>{date}</Text>}
    {items.map((m, i) => (
      <MedicationItem {...m} date={date} key={i} />
    ))}
  </View>
);
const styles = StyleSheet.create({
  container: { flex: 1 },
  day: {
    color: primary_color,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontFamily: FONT_REGULAR,
  },
});
