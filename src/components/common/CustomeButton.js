import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default ({
  onPress,
  style = {},
  textStyle = {},
  text,
  disabled,
  icon,
}) => (
  <TouchableOpacity
    disabled={disabled ? true : false}
    style={[{}, style, disabled && { opacity: 0.5 }]}
    onPress={onPress}
  >
    {icon && icon}
    {text && <Text style={[{}, textStyle]}>{text}</Text>}
  </TouchableOpacity>
);
