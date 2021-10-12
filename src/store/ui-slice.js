// aceasta bucata va contine toate starile legate de UI

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
