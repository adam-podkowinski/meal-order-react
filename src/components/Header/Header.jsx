import classes from "./Header.module.scss";
import { HiShoppingCart } from "react-icons/hi";

const Header = () => {
  return (
    <>
      <nav className={classes.header}>
        <a href={"#"} className={"link"}>
          Meal order
        </a>
        <button className={"button"}>
          <HiShoppingCart />
          Cart
        </button>
      </nav>
    </>
  );
};

export default Header;
