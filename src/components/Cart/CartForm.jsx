import classes from "./CartForm.module.scss";
import { useForm } from "react-hook-form";
import { api } from "/src/constants";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

const emailPatternRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
const emailPatternMessage = "Invalid e-mail";
const emailPattern = {
  value: emailPatternRegex,
  message: emailPatternMessage,
};

// TODO: extract each input box to a separate component
const CartForm = ({ isEmpty, visible, cartItems }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onTouched" });

  const ctx = useContext(CartContext);

  const onSubmit = async (d) => {
    ctx.setOrdering(true);
    reset();
    let orderState = true;
    try {
      const result = await fetch(`${api}/orders.json`, {
        method: "POST",
        body: JSON.stringify({
          recipient: d,
          order: cartItems,
        }),
      });

      if (!result.ok) orderState = false;
    } catch (_) {
      orderState = false;
    }
    ctx.setOrdering(false);
    ctx.setOrderState(orderState);
    if (orderState) ctx.clearCart();
  };

  const { firstName, lastName, email, country, address, payment } = errors;

  const errorMessage = (input) => {
    if (input?.type === null) return null;
    if (input?.type === "required") return "Field is required";
    if (input?.type === "pattern") return "Invalid e-mail";
  };

  return (
    <form
      style={visible ? {} : { display: "none" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`${classes.inputBox} ${
          firstName?.type ? classes.invalidInput : undefined
        }`}
      >
        <div className={classes.infoBox}>
          <label htmlFor={"first-name"}>First Name: </label>
          <p>{errorMessage(firstName)}</p>
        </div>
        <input
          {...register("firstName", { required: true })}
          type="text"
          id={"first-name"}
          placeholder={"John"}
        />
      </div>
      <div
        className={`${classes.inputBox} ${
          lastName?.type ? classes.invalidInput : undefined
        }`}
      >
        <div className={classes.infoBox}>
          <label htmlFor={"last-name"}>Last Name: </label>
          <p>{errorMessage(lastName)}</p>
        </div>
        <input
          {...register("lastName", { required: true })}
          type="text"
          id={"last-name"}
          placeholder={"Smith"}
        />
      </div>
      <div
        className={`${classes.inputBox} ${
          email?.type ? classes.invalidInput : undefined
        }`}
      >
        <div className={classes.infoBox}>
          <label htmlFor={"email"}>E-mail: </label>
          <p>{errorMessage(email)}</p>
        </div>
        <input
          {...register("email", {
            required: true,
            pattern: emailPattern,
          })}
          type="email"
          id={"email"}
          placeholder={"email@mail.com"}
        />
      </div>
      <div
        className={`${classes.inputBox} ${
          country?.type ? classes.invalidInput : undefined
        }`}
      >
        <div className={classes.infoBox}>
          <label htmlFor={"country"}>Country: </label>
          <p>{errorMessage(country)}</p>
        </div>
        <input
          {...register("country", { required: true })}
          type="text"
          id={"country"}
          placeholder={"United States"}
        />
      </div>
      <div
        className={`${classes.inputBox} ${
          address?.type ? classes.invalidInput : undefined
        }`}
      >
        <div className={classes.infoBox}>
          <label htmlFor={"address"}>Address: </label>
          <p>{errorMessage(address)}</p>
        </div>
        <input
          {...register("address", { required: true })}
          type="text"
          id={"address"}
          placeholder={"9970 Pilgrim Street Brooklyn, NY 11214"}
        />
      </div>
      <div
        className={`${classes.inputBox} ${
          payment?.type ? classes.invalidInput : undefined
        }`}
      >
        <div className={classes.infoBox}>
          <label htmlFor={"payment"}>Payment: </label>
          <p>{errorMessage(payment)}</p>
        </div>
        <select {...register("payment", { required: true })} id="payment">
          <option value="">Select...</option>
          <option value="onDelivery">Cash on delivery</option>
        </select>
      </div>
      <button
        type={"submit"}
        disabled={isEmpty}
        className={`button ${classes.orderButton} ${
          isEmpty && classes.orderButtonDisabled
        }`}
      >
        Order
      </button>
    </form>
  );
};

export default CartForm;
