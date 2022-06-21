import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import users from "./users";
import persons from "./persons";
import medications from "./medicines";
import activities from "./activities";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  users,
  persons,
  medications,
  activities,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [
      //     FLUSH,
      //     REHYDRATE,
      //     PAUSE,
      //     PERSIST,
      //     PURGE,
      //     REGISTER,
      //     "your/action/type",
      //   ],
      //   // Ignore these field paths in all actions
      //   ignoredActionPaths: ["meta.arg", "payload.timestamp"],
      //   // Ignore these paths in the state
      //   ignoredPaths: ["items.dates"],
      // },
    }),
});
