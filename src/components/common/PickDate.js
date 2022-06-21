import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { getDayByDateFormat } from "../../utils/helper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FONT_MEDIUM } from "../../utils/fonts";

export default ({ date, setDate, style, iconChild, textStyle }) => {
  const [open, setOpen] = useState(false);
  const onChange = (event, selectedDate) => {
    setOpen(false);
    selectedDate && setDate(selectedDate);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => setOpen(true)}
      >
        {iconChild && iconChild}
        <Text style={[styles.text, !iconChild && { textAlign: "center" }]}>
          {getDayByDateFormat(date)}
        </Text>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
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
