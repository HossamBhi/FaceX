import React from "react";
import { Pressable, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import { primary_color } from "../../utils/colors";
import { FONT_REGULAR } from "../../utils/fonts";

export default ({
  text,
  checked,
  setChecked,
  checkColor,
  TStyle,
  style,
  uncheckedColor,
}) => (
  <Pressable
    style={[
      {
        flexDirection: "row",
        alignItems: "flex-start",
        marginLeft: -7,
      },
      style,
    ]}
    onPress={() => setChecked(!checked)}
  >
    <Checkbox
      status={checked ? "checked" : "unchecked"}
      onPress={() => setChecked(!checked)}
      color={checkColor || primary_color}
      uncheckedColor={uncheckedColor ? uncheckedColor : "#979797"}
    />
    <Text
      style={[
        {
          fontSize: 14,
          fontFamily: FONT_REGULAR,
          color: "#333333",
          flex: 1,
          fontWeight: "400",
        },
        TStyle,
      ]}
    >
      {text}
    </Text>
  </Pressable>
);
