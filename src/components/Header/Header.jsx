import classes from "./Header.module.scss";
import { HiShoppingCart } from "react-icons/hi";
import Button from "../common/Button/Button";

const Header = () => {
  return (
    <>
      <nav className={classes.header}>
        <a href={"#"} className={"link"}>
          Meal order
        </a>
        <Button>
          <HiShoppingCart />
          Cart
        </Button>
      </nav>
    </>
  );
};

export default Header;
