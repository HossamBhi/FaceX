import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FONT_MEDIUM } from "../../utils/fonts";

const CustomeTextInput = ({
  iconChild,
  onPressIcon,
  placeholder,
  TIStyle = {},
  style,
  value,
  onChangeText,
  numberOfLines,
  disabled,
  secureTextEntry,
  returnKeyType,
  onBlur,
  keyBoardType,
  autoFocus,
}) => (
  <View style={[styles.container, style]}>
    <TextInput
      style={[styles.input, TIStyle]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      numberOfLines={numberOfLines ? numberOfLines : 1}
      // placeholderTextColor="#252525"
      placeholderTextColor="#BDBDBD"
      multiline={numberOfLines ? true : false}
      editable={!disabled ? true : false}
      returnKeyType={returnKeyType ? returnKeyType : "default"}
      secureTextEntry={secureTextEntry ? true : false}
      keyBoardType={keyBoardType ? keyBoardType : "default"}
      onBlur={onBlur}
      autoFocus={autoFocus}
    />
    {iconChild && (
      <TouchableOpacity style={styles.icon} onPress={onPressIcon}>
        {iconChild}
      </TouchableOpacity>
    )}
  </View>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#252525",
    fontFamily: FONT_MEDIUM,
    paddingVertical: 0,
  },
});

export default CustomeTextInput;
