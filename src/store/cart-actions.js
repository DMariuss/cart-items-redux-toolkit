// creez aici acele functii 'action creators'  🢣 🢣 🢣 un design pattern

// pt ca folosesc aici dispatch pe uiActions, le import
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const url = process.env.REACT_APP_FIREBASE_URL;

let timeoutId = null;

// export aceasta functie 'action creator'
export const sendCartData = (cart) => {
  // va reintoarce functia ce va fi executata in dispatch: React-Redux identifica acest 'pattern'
  // si va executa functia aceasta
  return async (dispatch) => {
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
        body: JSON.stringify({
          items: cart.items,
          itemsNumber: cart.itemsNumber,
        }), // modificat pt ca am o extra stare pe care nu vreau sa o trimit
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the request!");
      }
    };

    try {
      await sendRequest(); // trimit solicitarea aici

      // modifica starea 'notificare' pt a afisa un rezultat favorabil
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sending cart items successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart items failed!",
        })
      );
    }

    // curat timeout-ul in cazul in care trimite datele continuu
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // extra: am adaugat un timeout pt a demonta componenta ce afiseaza notificarea
    timeoutId = setTimeout(() => {
      dispatch(uiActions.showNotification(null));
      timeoutId = null;
    }, 2000);
  };
};

// creez functia 'action creator' pt a prelua datele de pe server la initializarea aplicatiei
export const fetchCartData = () => {
  return async (dispatch) => {
    // declar functia ce-mi preia datele pt ca mai jos sa o apelez intr-un bloc de try(pt a prelua
    // eventualele erori)
    const fetchData = async () => {
      const response = await fetch(`${url}/redux-cart-items.json`);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = response.json();

      return data;
    };

    try {
      const data = await fetchData();

      // trimit actiunea pe aceasta metoda din reducer pt a prelua articolele
      dispatch(cartActions.replace(data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};
