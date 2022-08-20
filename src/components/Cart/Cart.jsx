import classes from "./Cart.module.scss";
import ReactDOM from "react-dom";
import { useContext, useState } from "react";
import CartContext from "../../context/cart-context";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "./CartItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Cart = () => {
  const ctx = useContext(CartContext);
  const [page, setPage] = useState(0);

  const total = ctx.cartItems
    .reduce((prev, current) => {
      return prev + current.item.price * current.amount;
    }, 0)
    .toFixed(2);

  const cartProducts = (
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

  const orderButton = (
    <button
      onClick={() => console.log(`Ordering: ${ctx.cartItems}`)}
      disabled={isEmpty}
      className={`button ${classes.orderButton} ${
        isEmpty && classes.orderButtonDisabled
      }`}
    >
      Order
    </button>
  );

  const cartForm = <div>{orderButton}</div>;

  const cartItems = page ? cartForm : cartProducts;

  const backdropClasses = `${classes.backdrop} ${
    ctx.cartOpen && classes.backdropOpen
  }`;

  const isButtonActive = (num) => {
    if (isEmpty) return false;
    return page !== num;
  };

  const cartOnClick = (event) => event.stopPropagation();

  return ReactDOM.createPortal(
    <div className={backdropClasses} onClick={ctx.closeCart}>
      <div className={classes.cart} onClick={cartOnClick}>
        <header>
          <div className={classes.cartHeader}>
            <h1>Cart</h1>
            <button
              onClick={() => {
                ctx.closeCart();
              }}
              className={classes.closeButton}
            >
              <AiOutlineClose />
            </button>
          </div>
          <hr />
        </header>
        <div className={classes.cartContent}>
          {isEmpty ? <h2>No items in a cart.</h2> : cartItems}
        </div>
        <div className={classes.cartTotal}>
          <h2>
            Total: <span className={classes.totalPrice}>${total}</span>
          </h2>
          <div className={classes.pageActions}>
            <button
              disabled={!isButtonActive(0)}
              className={`button ${classes.pageButton} ${
                !isButtonActive(0) && classes.pageButtonDisabled
              }`}
              onClick={() => setPage(0)}
            >
              <FiChevronLeft />
            </button>
            <button
              disabled={!isButtonActive(1)}
              className={`button ${classes.pageButton}
                ${!isButtonActive(1) && classes.pageButtonDisabled}
            `}
              onClick={() => setPage(1)}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("cart")
  );
};

export default Cart;
