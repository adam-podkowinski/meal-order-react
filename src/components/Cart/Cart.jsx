import classes from "./Cart.module.scss";
import ReactDOM from "react-dom";
import { useContext } from "react";
import CartContext from "../../context/cart-context";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "./CartItem";

const Cart = () => {
  const ctx = useContext(CartContext);

  const total = ctx.cartItems
    .reduce((prev, current) => {
      return prev + current.item.price * current.amount;
    }, 0)
    .toFixed(2);

  const listNotEmpty = (
    <ul>
      {ctx.cartItems.map(({ item, amount }) => (
        <CartItem
          name={item.name}
          amount={amount}
          price={item.price}
          key={item.name}
        />
      ))}
    </ul>
  );

  const isEmpty = ctx.cartItems.length <= 0;

  return ReactDOM.createPortal(
    <div
      className={`${classes.backdrop} ${ctx.cartOpen && classes.backdropOpen}`}
      onClick={() => ctx.closeCart()}
    >
      <div
        className={classes.cart}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={classes.padding}>
          <header>
            <h1>Cart</h1>
            <button
              onClick={() => {
                ctx.closeCart();
              }}
              className={classes.closeButton}
            >
              <AiOutlineClose />
            </button>
          </header>
          <hr />
          {isEmpty ? <h2>No items in a cart.</h2> : listNotEmpty}
        </div>
        <div className={classes.total}>
          <h2>
            Total: <span className={classes.totalPrice}>${total}</span>
          </h2>
          {isEmpty || (
            <button
              onClick={() => console.log(`Ordering: ${ctx.cartItems}`)}
              className={`button ${classes.order}`}
            >
              Order
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("cart")
  );
};

export default Cart;
