// aceasta bucata va contine toate starile legate de cart

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id, title, quantity, total, price }
  itemsNumber: 0,
  changed: false, // stare extra pt ca vreau sa conditionez updatarea cartului local
  //        solutie la problema pe care o aveam cand preluam datele de pe server, imi trimitea din nou
  //        o solicitare cu postarea datelor pe server (pt ca se modifica starea cartului)
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // mai adaug o metoda ce preia cosul de cumparaturi de pe server(in cazul unei reinitializari)
    replace(state, action) {
      state.items = action.payload.items || []; // pt cazul in care nu am nimic pe server
      state.itemsNumber = action.payload.itemsNumber;
    },
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
      state.changed = true;
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
      state.changed = true;
    },
  },
});

// aici pot folosi Action Creators (asemanatoare cu celelalte ce sunt create automat)
// practic creez o functie ce-mi intoarce alta functie ce are dispatch-ul cu actiunea respectiva
// aceasta metoda imi permite sa 'intarzii' dispatch-ul acceptand si alt cod inainte de a trimite actiunea
// 🢣 🢣 🢣 pentru convenienta si claritate am pus aceste functii in alt fisier

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
