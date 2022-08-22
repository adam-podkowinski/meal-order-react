import classes from "./OrderStatus.module.scss";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

const OrderStatus = () => {
  const ctx = useContext(CartContext);

  const loading = (
    <>
      <div className={classes.loadingRing} />
      <h2>Ordering...</h2>
    </>
  );

  const { orderState, closeCart } = ctx;

  const orderFinished = (
    <div className={classes.orderInfo}>
      <h1>{orderState ? "🥳" : "😭"}</h1>
      <h2>
        {orderState
          ? "Order successfully placed!"
          : "Failed to place an order!"}
      </h2>
      <button
        className={"button"}
        onClick={
          orderState
            ? closeCart
            : () => {
                ctx.setOrderState(null);
              }
        }
      >
        {orderState ? "OK" : "Try Again"}
      </button>
    </div>
  );

  return (
    <div className={classes.orderStatus}>
      {orderState === null ? loading : orderFinished}
    </div>
  );
};

export default OrderStatus;
