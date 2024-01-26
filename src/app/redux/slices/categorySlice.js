"use client";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    type: "",
  },
  reducers: {
    setCategory: (state, action) => {
      state.type = action.payload;
    },
    clearCategory: (state) => {
      state.type = "";
    },
  },
});

export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
