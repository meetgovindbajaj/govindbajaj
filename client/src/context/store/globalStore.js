import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../features/Reducer";
const globalStore = configureStore({
  reducer: {
    Reducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export default globalStore;
