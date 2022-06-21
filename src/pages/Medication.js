import React, { useState } from "react";
import { useWindowDimensions, FlatList, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import CustomeButton from "../components/common/CustomeButton";
import ModalContainer from "../components/common/ModalContainer";
import PageHeader from "../components/common/PageHeader";
import AddMedication from "../components/medication/AddMedication";
import MedicationDay from "../components/medication/MedicationDay";
import { primary_color_light } from "../utils/colors";

const Medication = (props) => {
  const { logedUser } = useSelector((state) => state.users);
  const { height } = useWindowDimensions();
  const { medications } = useSelector((state) => state.medications);
  const [modalVisible, setModalVisible] = useState(false);
  const [editableItem, setEditabeItem] = useState(null);

  return (
    <LinearGradient
      colors={[
        "#ffffff",
        primary_color_light,
        primary_color_light,
        primary_color_light,
        "#8C81F7",
      ]}
      style={{
        paddingHorizontal: "5%",
        flex: 1,
        minHeight: height - 60,
        position: "relative",
      }}
    >
      <PageHeader text={"Medication"} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={Object.keys(medications)}
        renderItem={({ item }) => (
          <MedicationDay
            date={item}
            items={medications[item].filter(
              (item) => item?.user?.id === logedUser.id
            )}
            isShowDate={false}
            setEditabeItem={setEditabeItem}
            showEditableModal={() => setModalVisible(true)}
          />
        )}
        keyExtractor={(item) => item}
      />
      <CustomeButton
        onPress={() => {
          setEditabeItem(null);
          setModalVisible(true);
        }}
        style={styles.add}
        icon={
          <Image
            source={require("../assets/add.png")}
            style={{ width: 82, height: 82 }}
          />
        }
      />
      <ModalContainer
        isVisible={modalVisible}
        hideModal={() => setModalVisible(false)}
        child={
          <AddMedication
            header={"Add Medication"}
            isActivity={false}
            hideModal={() => setModalVisible(false)}
            editableItem={editableItem}
          />
        }
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  add: { position: "absolute", bottom: 20, right: 20, width: 82, height: 82 },
});
export default Medication;
