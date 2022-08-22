import classes from "./Cart.module.scss";
import ReactDOM from "react-dom";
import { useContext, useState } from "react";
import CartContext from "../../context/cart-context";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CartItems from "./CartItems";
import CartForm from "./CartForm";
import OrderStatus from "./OrderStatus";

const Cart = () => {
  const ctx = useContext(CartContext);

  const total = ctx.cartItems
    .reduce((prev, current) => {
      return prev + current.item.price * current.amount;
    }, 0)
    .toFixed(2);

  const isEmpty = ctx.cartItems.length <= 0;

  const cartContent = (
    <>
      <CartItems visible={!ctx.page} cartItems={ctx.cartItems} />
      <CartForm
        visible={ctx.page}
        cartItems={ctx.cartItems}
        isEmpty={isEmpty}
      />
    </>
  );

  const cartEmpty = <h2>No items in a cart.</h2>;

  const backdropClasses = `${classes.backdrop} ${
    ctx.cartOpen && classes.backdropOpen
  }`;

  const isButtonActive = (num) => {
    if (isEmpty || ctx.ordering || ctx.orderState !== null) return false;
    return ctx.page !== num;
  };

  const cartOnClick = (event) => event.stopPropagation();

  return ReactDOM.createPortal(
    <div className={backdropClasses} onClick={ctx.closeCart}>
      <div className={classes.cart} onClick={cartOnClick}>
        <header>
          <div className={classes.cartHeader}>
            <h1>Cart</h1>
            <button onClick={ctx.closeCart} className={classes.closeButton}>
              <AiOutlineClose />
            </button>
          </div>
          <hr />
        </header>
        {ctx.ordering || ctx.orderState !== null ? (
          <OrderStatus />
        ) : (
          <div className={classes.cartContent}>
            {isEmpty ? cartEmpty : cartContent}
          </div>
        )}
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
              onClick={() => ctx.setPage(0)}
            >
              <FiChevronLeft />
            </button>
            <button
              disabled={!isButtonActive(1)}
              className={`button ${classes.pageButton}
                ${!isButtonActive(1) && classes.pageButtonDisabled}
            `}
              onClick={() => ctx.setPage(1)}
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
