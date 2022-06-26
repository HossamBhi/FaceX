import { createSlice } from "@reduxjs/toolkit";
import { getDayByDateFormat } from "../../utils/helper";

const initialState = { activities: {} };

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    saveActivityAction: (state, { payload }) => {
      const { date, item } = payload;
      state.activities[date] = state.activities[date]
        ? [...state.activities[date], ...item]
        : [item];
    },
    changeActivityStatusAction: (state, { payload }) => {
      const { id, date } = payload;
      state.activities[date].map((m) => {
        if (m.id === id) {
          m.checked = !m.checked;
        }
      });
      state.activities = state.activities;
    },
    updateActivityAction: (state, { payload }) => {
      const { date, item } = payload;
      const newDate = getDayByDateFormat(item.date);
      const index = state.activities[date]?.findIndex(
        (ele) => ele.id == item.id
      );
      if (date != newDate) {
        state.activities[date].splice(index, 1);
        state.activities[newDate] = state.activities[newDate]
          ? [...state.activities[newDate], ...item]
          : [item];
      } else {
        state.activities[date][index] = item;
      }
    },
    removeActivityAction: (state, { payload }) => {
      const { date, id } = payload;
      state.activities[date] = state.activities[date].filter(
        (ele) => ele.id != id
      );
    },
    reinitialActivitiesAction: (state) => initialState,
  },
});

export const {
  saveActivityAction,
  removeActivityAction,
  reinitialActivitiesAction,
  changeActivityStatusAction,
  updateActivityAction,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
