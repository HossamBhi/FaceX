import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import { primary_color, primary_color_light } from "../utils/colors";
import LinearGradient from "react-native-linear-gradient";
import PageHeader from "../components/common/PageHeader";
import { Entypo } from "@expo/vector-icons";
import CustomeButton from "../components/common/CustomeButton";
import CustomeTextInput from "../components/common/CustomeTextInput";
import { useSelector } from "react-redux";
import { FONT_MEDIUM } from "../utils/fonts";

const Profile = ({ navigation }) => {
  const { logedUser } = useSelector((state) => state.users);
  const { height } = useWindowDimensions();
  const [name, setName] = useState(logedUser?.name || "");
  const [Email, setEmail] = useState(logedUser?.email || "");

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          "#ffffff",
          primary_color_light,
          primary_color_light,
          primary_color_light,
          "#8C81F7",
        ]}
        style={{ paddingHorizontal: "5%", flex: 1 }}
      >
        <View style={[styles.container, { minHeight: height }]}>
          <PageHeader
            style={{ paddingEnd: 50, paddingHorizontal: 0 }}
            left={
              <CustomeButton
                onPress={() => navigation.goBack()}
                icon={
                  <View style={styles.back}>
                    <Entypo name="chevron-left" size={28} color="#ffffff" />
                  </View>
                }
              />
            }
            // text={logedUser.type}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.pickProfile}>
              <Image
                source={
                  logedUser.type === 2
                    ? require("../assets/patient_active.png")
                    : require("../assets/doctor_active.png")
                }
                resizeMode="contain"
                style={{ maxWidth: "50%", minWidth: 140, height: 200 }}
              />
            </View>
          </View>
          <CustomeTextInput
            placeholder={"Name"}
            value={name}
            onChangeText={setName}
            disabled={true}
          />
          <CustomeTextInput
            placeholder={"Email"}
            value={Email}
            disabled={true}
            onChangeText={setEmail}
          />
          <CustomeTextInput
            placeholder={"Age"}
            disabled={true}
            keyBoardType="numeric"
          />
          <CustomeButton
            text={"Edit"}
            style={[styles.btn, { marginTop: 40 }]}
            textStyle={styles.btnText}
            onPress={() => alert("Coming Soon")}
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", paddingBottom: 100 },
  back: {
    backgroundColor: primary_color,
    borderRadius: 1000,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  pickProfile: {
    marginTop: 10,
    marginBottom: 30,
    position: "relative",
    borderRadius: 10000,
  },
  plus: {
    bottom: 5,
    right: 5,
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 10000,
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

export default Profile;
