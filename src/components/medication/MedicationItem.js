import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import { useDispatch } from "react-redux";
import { changeActivityStatusAction } from "../../redux/reducers/activities";
import { changeMedicationStatusAction } from "../../redux/reducers/medicines";
import { primary_color } from "../../utils/colors";
import { FONT_MEDIUM } from "../../utils/fonts";
import { formatAMPM, getDayByDateFormat } from "../../utils/helper";

const MedicationItem = ({
  isActivity,
  setEditabeItem,
  item,
  showEditableModal,
}) => {
  const { date, id, title, time, checked } = item;
  const dispatch = useDispatch();

  const handleCheckChange = () => {
    isActivity
      ? dispatch(
          changeActivityStatusAction({ date: getDayByDateFormat(date), id })
        )
      : dispatch(
          changeMedicationStatusAction({ date: getDayByDateFormat(date), id })
        );
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setEditabeItem(item);
        showEditableModal();
      }}
    >
      <Text style={styles.time}>{formatAMPM(time)}</Text>
      <Text style={styles.title}>{title}</Text>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={handleCheckChange}
        color="#5DB075"
        uncheckedColor={primary_color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 14,
  },
  time: {
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
    color: "#000000",
  },
  title: {
    flex: 1,
    paddingHorizontal: 16,
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
  },
});

export default MedicationItem;
