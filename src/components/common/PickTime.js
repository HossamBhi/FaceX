import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FONT_MEDIUM, FONT_REGULAR } from "../../utils/fonts";
import { formatAMPM } from "../../utils/helper";

export default ({ time, setTime, style, iconChild, text }) => {
  const [open, setOpen] = useState(false);
  const onChange = (event, selectedDate) => {
    setOpen(false);
    selectedDate && setTime(selectedDate);
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.container, style]}
      >
        {iconChild && iconChild}
        <Text style={styles.text}>{text ? text : formatAMPM(time)}</Text>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode={"time"}
          onChange={onChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 15,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    marginBottom: 17,
  },
  text: {
    fontSize: 14,
    fontFamily: FONT_MEDIUM,
    lineHeight: 23,
    color: "#252525",
  },
});
