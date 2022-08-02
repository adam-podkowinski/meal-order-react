import classes from "./Header.module.scss";
import { HiShoppingCart } from "react-icons/hi";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

const Header = () => {
  const ctx = useContext(CartContext);

  return (
    <>
      <nav className={classes.header}>
        <a href={"#"} className={"link"}>
          Meal order
        </a>
        <button className={"button"} onClick={ctx.openCart}>
          {ctx.cartItems.reduce((prev, current) => prev + current.amount, 0)}
          <HiShoppingCart />
          Cart
        </button>
      </nav>
    </>
  );
};

export default Header;
