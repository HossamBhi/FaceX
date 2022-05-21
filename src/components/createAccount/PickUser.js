import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import CustomeButton from "../common/CustomeButton";

const PickUser = ({ pickedUser, setPickedUser }) => {
  return (
    <View>
      <Text style={styles.header}>
        I am a {pickedUser === 1 && "Doctor"}
        {pickedUser === 2 && "Patient"}
      </Text>
      <View style={styles.images}>
        <CustomeButton
          onPress={() => setPickedUser(1)}
          style={{ justifyContent: "center", alignItems: "center" }}
          icon={
            <Image
              style={[
                styles.image,
                pickedUser === 1
                  ? styles.active
                  : pickedUser && { height: 100 },
              ]}
              source={
                pickedUser === 1
                  ? require("../../assets/doctor_active.png")
                  : require("../../assets/doctor.png")
              }
              resizeMode="contain"
            />
          }
        />
        <CustomeButton
          onPress={() => setPickedUser(2)}
          style={{ justifyContent: "center", alignItems: "center" }}
          icon={
            <Image
              style={[
                styles.image,
                pickedUser === 2
                  ? styles.active
                  : pickedUser && { height: 120 },
              ]}
              source={
                pickedUser === 2
                  ? require("../../assets/patient_active.png")
                  : require("../../assets/patient.png")
              }
              resizeMode="contain"
            />
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  images: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  active: { maxWidth: "50%", minWidth: 160 },
  image: { maxWidth: "40%", minWidth: 120, height: 160 },
  header: { paddingHorizontal: 20, fontSize: 16, fontWeight: "600" },
});

export default PickUser;
