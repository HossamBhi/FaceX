import React from "react";
import { useWindowDimensions, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import MedicationDay from "../components/medication/MedicationDay";
import { primary_color_light } from "../utils/colors";

const Activities = (props) => {
  const { height, width } = useWindowDimensions();
  const { medications } = useSelector((state) => state.medications);
  console.log("medi: ", medications);
  return (
    <LinearGradient
      colors={[
        "#ffffff",
        primary_color_light,
        primary_color_light,
        primary_color_light,
        "#8C81F7",
      ]}
      style={{ paddingHorizontal: "5%", flex: 1, minHeight: height - 60 }}
    >
      <PageHeader text={"Activities"} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={Object.keys(medications)}
        renderItem={({ item }) => (
          <MedicationDay date={item} items={medications[item]} />
        )}
        keyExtractor={(item) => item}
      />
    </LinearGradient>
  );
};

export default Activities;
