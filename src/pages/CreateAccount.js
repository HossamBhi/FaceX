import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import CustomeTextInput from "../components/common/CustomeTextInput";
import PageHeader from "../components/common/PageHeader";
import PickUser from "../components/createAccount/PickUser";
import { FONT_MEDIUM, FONT_REGULAR } from "../utils/fonts";
import { AntDesign } from "@expo/vector-icons";
import CustomeButton from "../components/common/CustomeButton";
import { bg_color, primary_color } from "../utils/colors";
import CheckBoxWithText from "../components/common/CheckBoxWithText";
import { saveNewUserAction } from "../redux/reducers/users";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueId } from "../utils/helper";
import { useNavigation } from "@react-navigation/native";

const CreateAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isEName, setIsEName] = useState("");
  const [email, setEmail] = useState("");
  const [isEEmail, setIsEEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEPass, setIsEPass] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [pickedUser, setPickedUser] = useState(null);
  const [isNews, setIsNews] = useState(false);

  const handleSubmitUser = () => {
    if (pickedUser === null) {
      return alert("Pick user type first.");
    }
    // check name
    if (name.trim() === "") return setIsEName(true);
    else setIsEName(false);
    // check email
    if (email.trim() === "") return setIsEEmail(true);
    else setIsEEmail(false);
    // check pass
    if (password.trim() === "") return setIsEPass(true);
    else setIsEPass(false);
    dispatch(
      saveNewUserAction({
        id: getUniqueId(),
        name,
        email,
        password,
        type: pickedUser,
      })
    );
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg_color }}
      showsVerticalScrollIndicator={false}
    >
      <PageHeader
        text={"Sign Up"}
        left={
          <CustomeButton
            icon={<AntDesign name="close" size={24} color="#BDBDBD" />}
            onPress={() => alert("Close")}
          />
        }
        right={
          <CustomeButton
            text="Login"
            textStyle={styles.login}
            onPress={() => navigation.navigate("Login")}
          />
        }
      />
      <View style={styles.container}>
        <PickUser pickedUser={pickedUser} setPickedUser={setPickedUser} />
        <CustomeTextInput
          placeholder={"Name"}
          value={name}
          onChangeText={setName}
          style={
            isEName === true
              ? { borderColor: "red" }
              : isEName === false && { borderColor: "green" }
          }
        />
        <CustomeTextInput
          placeholder={"Email"}
          value={email}
          onChangeText={setEmail}
          style={
            isEEmail === true
              ? { borderColor: "red" }
              : isEEmail === false && { borderColor: "green" }
          }
        />
        <CustomeTextInput
          placeholder={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isShowPass}
          iconChild={<Text style={styles.show}>Show</Text>}
          onPressIcon={() => setIsShowPass(!isShowPass)}
          style={
            isEPass === true
              ? { borderColor: "red" }
              : isEPass === false && { borderColor: "green" }
          }
        />
        <CheckBoxWithText
          text="I would like to receive your newsletter and other promotional information."
          checked={isNews}
          setChecked={setIsNews}
        />
        <CustomeButton
          text="Sign Up"
          style={[styles.btn, { marginTop: 40 }]}
          textStyle={styles.btnText}
          onPress={handleSubmitUser}
        />
        <CustomeButton
          text="Forgot your password?"
          textStyle={[styles.btnText, { color: primary_color, marginTop: 16 }]}
          onPress={() => alert("Comming Soon.")}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingTop: 20,
    paddingBottom: 50,
  },
  login: {
    fontSize: 14,
    color: "#7264E9",
    fontFamily: FONT_REGULAR,
  },
  show: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: "#7264E9",
    paddingStart: 16,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: primary_color,
    padding: 16,
    borderRadius: 1000,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
    color: "#FFFFFF",
  },
});
export default CreateAccount;
