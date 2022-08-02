import classes from "./MenuItem.module.scss";
import { HiPlus } from "react-icons/hi";
import { useContext, useRef } from "react";
import CartContext from "../../context/cart-context";

const MenuItem = ({ name, description, price }) => {
  const cartContext = useContext(CartContext);
  const amountRef = useRef();

  const onAdd = (event) => {
    event.preventDefault();
    const amount = +amountRef.current["value"];
    cartContext.addItem({ name, description, price }, amount);
  };

  return (
    <li className={classes.menuItem}>
      <div>
        <h2 className={classes.name}>{name}</h2>
        <p className={classes.description}>{description}</p>
        <p className={classes.price}>${price}</p>
      </div>
      <form className={classes.actionBox} onSubmit={onAdd}>
        <div className={classes.amountBox}>
          <span>Amount</span>
          <input
            ref={amountRef}
            defaultValue={1}
            type="number"
            min={1}
            max={100}
          />
        </div>
        <button type={"submit"} className={classes.addButton}>
          <HiPlus />
          Add
        </button>
      </form>
    </li>
  );
};

export default MenuItem;
