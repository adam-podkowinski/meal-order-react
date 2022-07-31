import classes from "./MenuItem.module.scss";
import { HiPlus } from "react-icons/hi";

const MenuItem = ({ name, description, price }) => {
  return (
    <li className={classes.menuItem}>
      <div>
        <h2 className={classes.name}>{name}</h2>
        <p className={classes.description}>{description}</p>
        <p className={classes.price}>${price}</p>
      </div>
      <div className={classes.actionBox}>
        <div className={classes.amountBox}>
          <span>Amount</span>
          <input type="number" min={1} max={100} />
        </div>
        <button className={classes.addButton}>
          <HiPlus />
          Add
        </button>
      </div>
    </li>
  );
};

export default MenuItem;
