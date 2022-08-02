import classes from "./CartItem.module.scss";
import { BsFillPlusCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

const CartItem = ({ name, amount, price }) => {
  const ctx = useContext(CartContext);
  const onRemoveItem = () => {
    ctx.removeItem(name);
  };

  const onAddItem = () => {
    ctx.addItem({ name }, 1);
  };

  return (
    <li>
      <div className={classes.main}>
        <div>
          <h2 className={classes.name}>{name}</h2>
          <div className={classes.priceBox}>
            <h3 className={classes.price}>${price}</h3>
            <h3 className={classes.amount}>x{amount}</h3>
          </div>
        </div>

        <div className={classes.actionBox}>
          <button onClick={onAddItem} className={classes.actionButton}>
            <BsFillPlusCircleFill />
          </button>
          <button className={classes.actionButton} onClick={onRemoveItem}>
            <BsFillXCircleFill />
          </button>
        </div>
      </div>
      <hr className={classes.divider} />
    </li>
  );
};

export default CartItem;
