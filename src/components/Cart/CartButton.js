import classes from "./CartButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const itemsNumber = useSelector((state) => state.cart.itemsNumber);

  const toggleCart = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsNumber}</span>
    </button>
  );
};

export default CartButton;
