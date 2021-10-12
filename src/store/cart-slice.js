// aceasta bucata va contine toate starile legate de cart

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id, title, quantity, total, price }
  itemsNumber: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //caut articolul in lista, daca exista actualizez item-ul, iar daca nu exista il adaug
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.total + newItem.price;
      } else {
        // adaug aici articolul nou
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          total: newItem.price,
          quantity: 1,
        });
      }

      state.itemsNumber++;
    },
    removeItem(state, action) {
      // caut articolul si scad cate un articol, daca ajunge la 0 il inlatur definitiv
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }

      state.itemsNumber--;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
