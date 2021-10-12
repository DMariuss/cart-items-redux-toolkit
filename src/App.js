import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";
import { useEffect } from "react";

const url = process.env.REACT_APP_FIREBASE_URL;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart.items);

  useEffect(
    () =>
      fetch(`${url}/redux-cart-items.json`, {
        method: "PUT", // pt tot timpul il voi suprascrie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItems),
      }),
    [url, cart]
  );

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
