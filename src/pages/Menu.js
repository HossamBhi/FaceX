import React from "react";
import { View, StyleSheet, ScrollView, Linking, Text } from "react-native";
import CustomeButton from "../components/common/CustomeButton";
import PageHeader from "../components/common/PageHeader";
import { FONT_MEDIUM, FONT_REGULAR } from "../utils/fonts";
import { primary_color } from "../utils/colors";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { logOutAction } from "../redux/reducers/users";
import { useDispatch } from "react-redux";

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(logOutAction());
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <PageHeader
        text={"Menu"}
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
      />
      <ScrollView style={{ flex: 2 }}>
        <CustomeButton
          text="Profile"
          icon={<AntDesign name="user" size={28} color={primary_color} />}
          textStyle={styles.itemText}
          style={styles.item}
          onPress={() => navigation.navigate("Profile")}
        />
        <CustomeButton
          text="Emergency Call"
          icon={<AntDesign name="phone" size={28} color={primary_color} />}
          textStyle={styles.itemText}
          style={styles.item}
          onPress={() => Linking.openURL("tel:123")}
        />
        <CustomeButton
          text="Language"
          icon={
            <Ionicons name="language-outline" size={28} color={primary_color} />
          }
          textStyle={styles.itemText}
          style={styles.item}
          onPress={() => alert("Coming Soon.")}
        />
        <CustomeButton
          text="Contact Us"
          icon={<AntDesign name="message1" size={28} color={primary_color} />}
          textStyle={styles.itemText}
          style={styles.item}
          onPress={() => Linking.openURL("tel:01099086281")}
        />
        <CustomeButton
          text="Logout"
          icon={<Entypo name="log-out" size={28} color={primary_color} />}
          textStyle={styles.itemText}
          style={styles.item}
          onPress={handleLogoutUser}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ©2021 - 2022 Mindr. All rights reserved
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingTop: 20,
    marginHorizontal: 20,
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemText: { fontFamily: FONT_MEDIUM, fontSize: 16, color: "#000000" },
  back: {
    backgroundColor: primary_color,
    borderRadius: 1000,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
  },
  footerText: {
    fontFamily: FONT_REGULAR,
    fontSize: 12,
  },
});
