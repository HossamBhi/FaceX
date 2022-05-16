import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    // {
    //   id,
    //   name,
    //   email,
    //   password,
    //   type // 1 for doctor , 2 for patient
    // },
  ],
  logedUser: null,
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveNewUserAction: (state, { payload }) => {
      state.users = [...state.users, payload];
    },
    setLogedUserAction: (state, { payload }) => {
      state.logedUser = payload;
    },
    logOutAction: (state) => {
      state.logedUser = null;
    },
  },
});

export const { saveNewUserAction, setLogedUserAction, logOutAction } =
  users.actions;
export default users.reducer;
