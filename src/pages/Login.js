import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, BackHandler } from "react-native";
import CustomeTextInput from "../components/common/CustomeTextInput";
import PageHeader from "../components/common/PageHeader";
import { FONT_MEDIUM, FONT_REGULAR } from "../utils/fonts";
import CustomeButton from "../components/common/CustomeButton";
import { bg_color, primary_color } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction, setLogedUserAction } from "../redux/reducers/users";

const Login = ({ navigation, route }) => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isEEmail, setIsEEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEPass, setIsEPass] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  console.log("Users: ", users);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackHardwarePress);
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackHardwarePress
      );
  }, []);
  const handleBackHardwarePress = () => {
    if (route.name == "Login") {
      navigation.navigate("CreateAccount");
      return true;
    }
    return false;
  };
  const handleSubmitUser = () => {
    dispatch(logOutAction());

    // check email
    if (email.trim() === "") return setIsEEmail(true);
    else setIsEEmail(false);
    // check pass
    if (password.trim() === "") return setIsEPass(true);
    else setIsEPass(false);

    // check user in database
    const hasAccount = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (hasAccount) {
      console.log("hasAccount: ", hasAccount);
      dispatch(setLogedUserAction(hasAccount));
      navigation.navigate(
        hasAccount?.type === 1 ? "PersonsPage" : "TabNavigator"
      );
      setIsEPass(false);
      setIsEEmail(false);
      setErrorMsg(null);
    } else {
      setIsEEmail(true);
      setIsEPass(true);
      setErrorMsg(
        "The email address or password you entered is incorrect or the account does not exist"
      );
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg_color }}
      showsVerticalScrollIndicator={false}
    >
      <PageHeader text={"Login"} />
      <View style={[styles.container, {}]}>
        <View>
          <CustomeTextInput
            autoFocus={true}
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
          {errorMsg !== null && <Text style={styles.errorMsg}>{errorMsg}</Text>}
        </View>

        <View>
          <CustomeButton
            text="Log In"
            style={[styles.btn, { marginTop: "20%" }]}
            textStyle={styles.btnText}
            onPress={handleSubmitUser}
          />
          <CustomeButton
            text="Forgot your password?"
            textStyle={[
              styles.btnText,
              { color: primary_color, marginTop: 16 },
            ]}
            onPress={() => alert("Comming Soon.")}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: "space-between",
    backgroundColor: bg_color,
  },
  errorMsg: {
    textAlign: "center",
    fontFamily: FONT_MEDIUM,
    color: "red",
    fontSize: 12,
    paddingHorizontal: 16,
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
export default Login;
