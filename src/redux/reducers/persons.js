import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  persons: {
    /* id: {
      id,
      name,
      age,
      relation,
      bitmap,user,
    } */
  },
};

const personsSlice = createSlice({
  name: "Persons",
  initialState,
  reducers: {
    savePersonAction: (state, { payload }) => {
      state.persons = { ...state.persons, [payload.id]: payload };
    },
    removePersonAction: (state, { payload: id }) => {
      const { [id]: value, ...remainingValues } = state.persons;
      state.persons = remainingValues;
    },
    reinitialPersonsAction: (state) => {
      return initialState;
    },
  },
});

export const { savePersonAction, removePersonAction, reinitialPersonsAction } =
  personsSlice.actions;

export default personsSlice.reducer;
