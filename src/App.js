import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Navigation from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";

const url = process.env.REACT_APP_FIREBASE_URL;

let isInitial = true;

function App() {
  // voi folosi dispatch pt a trimite actiunile starii pt notificarea din ui.
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    // definesc o functie asincrona in care trimit solicitarea
    const sendRequest = async () => {
      // trimit o actiune catre Redux ui-slice
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      const response = await fetch(`${url}/redux-cart-items.json`, {
        method: "PUT", // pt tot timpul il voi suprascrie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the request!");
      }

      // modifica starea 'notificare' pt a afisa un rezultat favorabil
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sending cart items successfully!",
        })
      );
    };

    // conditie necesara pt a evita suprascrierea cu lista goala la fiecare reinitializare a paginii
    if (isInitial) {
      isInitial = false;
      return;
    }

    // cu .catch prind orice eroare se poate intampla in aceasta functie..(plus ca este o promisiune)
    sendRequest().catch((error) => {
      // trimite eroarea catre store -> in ui-slice pe care o putem accesa in componenta Notify(ce preia diferitele mesaje)
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart items failed!",
        })
      );
    });

    // extra: am adaugat un timeout pt a demonta componenta ce afiseaza notificarea
    const timeoutID = setTimeout(() => {
      dispatch(uiActions.showNotification(null));
    }, 2000);

    // in functia de clean-up termin timeout-ul precedent
    return () => {
      clearTimeout(timeoutID);
      console.log("cleared the timeout: ", timeoutID);
    };
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
