import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medications: {
    "20/10/2022": [
      {
        id: 1,
        title: "Medicine",
        checked: true,
        dueDate: 1545640410000,
      },
      {
        id: 2,
        title: "Medicine 2 ",
        checked: false,
        dueDate: 1545640410000,
      },
    ],
    "22/10/2022": [
      {
        id: 3,
        title: "Medicine",
        checked: true,
        dueDate: 1545640412200,
      },
      {
        id: 4,
        title: "Medicine 2 ",
        checked: false,
        dueDate: 1545640410000,
      },
    ],
    "22/10/2022": [
      {
        id: 5,
        title: "Medicine",
        checked: true,
        dueDate: 1545640412200,
      },
      {
        id: 6,
        title: "Medicine 2 ",
        checked: false,
        dueDate: 1545640410000,
      },
    ],
    "22/8/2022": [
      {
        id: 7,
        title: "Medicine",
        checked: true,
        dueDate: 1545640412200,
      },
      {
        id: 8,
        title: "Medicine 2 ",
        checked: false,
        dueDate: 1545640410000,
      },
    ],
    "22/6/2022": [
      {
        id: 9,
        title: "Medicine",
        checked: true,
        dueDate: 1545640412200,
      },
      {
        id: 10,
        title: "Medicine 2 ",
        checked: false,
        dueDate: 1545640410000,
      },
    ],
    "25/10/2022": [
      {
        id: 11,
        title: "Medicine",
        checked: true,
        dueDate: 1545640412200,
      },
      {
        id: 12,
        title: "Medicine 2 ",
        checked: false,
        dueDate: 1545640410000,
      },
    ],

    /* 
    "20/10/2022": [{
        id,
        title,
        checked,
        dueDate, 
    }]
     */
  },
};

const medicationsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {
    saveMedicationAction: (state, { payload }) => {
      const { date, medication } = payload;
      state.medications = {
        ...state.medications,
        [date]: [...state.medications[date], ...medication],
      };
    },
    changeMedicationStatusAction: (state, { payload }) => {
      const { id, date } = payload;
      state.medications[date].map((m) => {
        if (m.id === id) {
          m.checked = !m.checked;
        }
      });
      state.medications = state.medications;
      // const medication = state.medications[date].find((m) => m.id === id);
      // medication.checked = !medication.checked;
      // state.medications = {
      //   ...state.medications,
      //   [date]: [
      //     ...state.medications[date].map((m) => {
      //       if (m.id !== id) {
      //         return m;
      //       } else {
      //         return { ...m, checked: !m.checked };
      //       }
      //     }),
      //     //   medication,
      //   ],
      // };
    },
    removeMedica1tionAction: (state, { payload }) => {},
    reinitialMedicationsAction: (state) => initialState,
  },
});

export const {
  saveMedicationAction,
  removeMedicationAction,
  reinitialMedicationsAction,
  changeMedicationStatusAction,
} = medicationsSlice.actions;

export default medicationsSlice.reducer;
