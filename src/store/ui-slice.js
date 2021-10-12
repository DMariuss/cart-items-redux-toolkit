// aceasta bucata va contine toate starile legate de UI

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = action.payload; // primesc un obiect cu 3 propr: {status, title, message}
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
