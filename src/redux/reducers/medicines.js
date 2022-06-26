import { createSlice } from "@reduxjs/toolkit";
import { getDayByDateFormat } from "../../utils/helper";

const initialState = {
  medications: {},
};

const medicationsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {
    saveMedicationAction: (state, { payload }) => {
      const { date, item } = payload;
      state.medications[date] = state.medications[date]
        ? [...state.medications[date], item]
        : [item];
    },
    changeMedicationStatusAction: (state, { payload }) => {
      const { id, date } = payload;
      state.medications[date].map((m) => {
        if (m.id === id) {
          m.checked = !m.checked;
        }
      });
      state.medications = state.medications;
    },
    updateMedicationAction: (state, { payload }) => {
      const { date, item } = payload;
      const newDate = getDayByDateFormat(item.date);
      const index = state.medications[date]?.findIndex(
        (ele) => ele.id == item.id
      );
      console.log("item: ", item);
      if (date != newDate) {
        state.medications[date].splice(index, 1);
        state.medications[newDate] = state.medications[newDate]
          ? [...state.medications[newDate], ...item]
          : [item];
      } else {
        state.medications[date][index] = item;
      }
      // const index = state.medications[date]?.findIndex(
      //   (ele) => ele.id == item.id
      // );
      // state.medications[date][index] = item;
    },
    removeMedicationAction: (state, { payload }) => {
      const { date, id } = payload;
      state.medications[date] = state.medications[date].filter(
        (ele) => ele.id != id
      );
    },
    reinitialMedicationsAction: (state) => initialState,
  },
});

export const {
  saveMedicationAction,
  removeMedicationAction,
  reinitialMedicationsAction,
  changeMedicationStatusAction,
  updateMedicationAction,
} = medicationsSlice.actions;

export default medicationsSlice.reducer;
