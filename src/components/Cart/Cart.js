import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  const cartContent = cartItems.map((item) => (
    <CartItem key={item.id} item={item} />
  ));
  const cartIsEmpty = cartContent.length === 0;

  return (
    <Card className={classes.cart}>
      <h2>
        Your Shopping Cart{" "}
        {cartIsEmpty ? (
          <span className={classes["empty-cart"]}>cart is empty</span>
        ) : null}
      </h2>
      <ul>{cartContent}</ul>
    </Card>
  );
};

export default Cart;
