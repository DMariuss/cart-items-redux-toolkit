import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Navigation from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  // voi folosi dispatch pt a trimite actiunile starii pt notificarea din ui.
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  // useEffect-ul in care preiau datele de pe server
  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  // useEffect ce-mi permite sa trimit datele pe server
  useEffect(() => {
    // conditie necesara pt a evita suprascrierea cu lista goala la fiecare reinitializare a paginii
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      // am implementat modelul cu 'action creator'
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]); // dispatch nu se modifica (ne asigura React-Redux..)

  return (
    <>
      {notification && <Navigation notification={notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
