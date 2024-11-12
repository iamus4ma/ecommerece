"use client";
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      Swal.fire({
        title: "Item successfully added!",
        icon: "success",
        timer: 2000,
        showConfirmButton: true,
      });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
