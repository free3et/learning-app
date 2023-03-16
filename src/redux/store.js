import { lessonsSlice } from "./lessonsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [lessonsSlice.reducerPath]: lessonsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lessonsSlice.middleware),
});
