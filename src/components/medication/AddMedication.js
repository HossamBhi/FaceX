import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActivityAction,
  saveActivityAction,
  updateActivityAction,
} from "../../redux/reducers/activities";
import {
  removeMedicationAction,
  saveMedicationAction,
  updateMedicationAction,
} from "../../redux/reducers/medicines";
import { bg_color, primary_color } from "../../utils/colors";
import { FONT_MEDIUM } from "../../utils/fonts";
import { getDayByDateFormat, getUniqueId } from "../../utils/helper";
import { setLocaleNotification } from "../../utils/notificationHelper";
import CustomeButton from "../common/CustomeButton";
import CustomeTextInput from "../common/CustomeTextInput";
import PickDate from "../common/PickDate";
import PickTime from "../common/PickTime";

export default ({ header, isActivity, hideModal, editableItem }) => {
  const dispatch = useDispatch();
  const { logedUser } = useSelector((state) => state.users);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (editableItem) {
      setTitle(editableItem.title);
      setTime(editableItem.time);
      setDate(editableItem.date);
    } else {
      setTitle("");
      setTime(new Date());
      setDate(new Date());
    }
  }, [editableItem]);
  // item is activity or medicine
  const getValues = () => ({
    id: editableItem ? editableItem.id : getUniqueId(),
    date,
    time,
    title: title ? title : "( no title )",
    user: logedUser,
  });

  const handleAddItem = () => {
    isActivity
      ? dispatch(
          saveActivityAction({
            date: getDayByDateFormat(date),
            item: getValues(),
          })
        )
      : dispatch(
          saveMedicationAction({
            date: getDayByDateFormat(date),
            item: getValues(),
          })
        );
    handleSetNotification();
    hideModal();
  };

  const handleDeleteItem = () => {
    isActivity
      ? dispatch(
          removeActivityAction({
            date: getDayByDateFormat(editableItem.date),
            id: editableItem.id,
          })
        )
      : dispatch(
          removeMedicationAction({
            date: getDayByDateFormat(editableItem.date),
            id: editableItem.id,
          })
        );
    hideModal();
  };
  const hadnleEditItem = () => {
    isActivity
      ? dispatch(
          updateActivityAction({
            date: getDayByDateFormat(editableItem.date),
            item: { ...editableItem, ...getValues() },
          })
        )
      : dispatch(
          updateMedicationAction({
            date: getDayByDateFormat(editableItem.date),
            item: { ...editableItem, ...getValues() },
          })
        );
    handleSetNotification();
    hideModal();
  };

  const handleSetNotification = () =>
    setLocaleNotification(
      title ? title : "( no title )",
      "Remember me 💊",
      time
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <CustomeTextInput
        placeholder={"Title..."}
        value={title}
        onChangeText={setTitle}
        style={{ backgroundColor: bg_color }}
      />
      <PickDate date={date} setDate={setDate} style={{ marginBottom: 20 }} />
      <PickTime time={time} setTime={setTime} />
      {editableItem ? (
        <View style={styles.btns}>
          <CustomeButton
            text={"Delete"}
            style={[styles.twoBtn, { backgroundColor: "#B00020" }]}
            textStyle={styles.btnText}
            onPress={handleDeleteItem}
          />
          <CustomeButton
            text={"Edit"}
            style={[styles.twoBtn]}
            textStyle={styles.btnText}
            onPress={hadnleEditItem}
          />
        </View>
      ) : (
        <CustomeButton
          text={"Add"}
          style={[styles.btn]}
          textStyle={styles.btnText}
          onPress={handleAddItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bg_color,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  header: {
    fontSize: 18,
    fontFamily: FONT_MEDIUM,
    paddingBottom: 20,
    textAlign: "center",
    paddingTop: 20,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary_color,
    padding: 16,
    borderRadius: 1000,
    marginTop: 20,
    marginBottom: 20,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
    color: "#FFFFFF",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  twoBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary_color,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
});
