import classes from "./CartForm.module.scss";
import { useForm } from "react-hook-form";

const emailPatternRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
const emailPatternMessage = "Provide a valid e-mail address.";
const emailPattern = {
  value: emailPatternRegex,
  message: emailPatternMessage,
};

//TODO: On bigger screens show order button and cart items on the side
const CartForm = ({ isEmpty, visible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (d) => {
    console.log(`Order: ${d}`);
  };

  const { firstName, lastName, email, country, city, address, payment } =
    errors;

  return (
    <form
      style={visible ? {} : { display: "none" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes.inputBox}>
        <div className={classes.infoBox}>
          <label htmlFor={"first-name"}>First Name: </label>
          <p>{firstName?.type}</p>
        </div>
        <input
          {...register("firstName", { required: true })}
          type="text"
          id={"first-name"}
        />
      </div>
      <div className={classes.inputBox}>
        <div className={classes.infoBox}>
          <label htmlFor={"last-name"}>Last Name: </label>
          <p>{lastName?.type}</p>
        </div>
        <input
          {...register("lastName", { required: true })}
          type="text"
          id={"last-name"}
        />
      </div>
      <div className={classes.inputBox}>
        <div className={classes.infoBox}>
          <label htmlFor={"email"}>E-mail: </label>
          <p>{email?.type}</p>
        </div>
        <input
          {...register("email", {
            required: true,
            pattern: emailPattern,
          })}
          type="email"
          id={"email"}
        />
      </div>
      <div className={classes.inputBox}>
        <div className={classes.infoBox}>
          <label htmlFor={"country"}>Country: </label>
          <p>{country?.type}</p>
        </div>
        <input
          {...register("country", { required: true })}
          type="text"
          id={"country"}
        />
      </div>
      <div className={classes.inputBox}>
        <div className={classes.infoBox}>
          <label htmlFor={"city"}>City: </label>
          <p>{city?.type}</p>
        </div>
        <input
          {...register("city", { required: true })}
          type="text"
          id={"city"}
        />
      </div>
      <div className={classes.inputBox}>
        <div className={classes.infoBox}>
          <label htmlFor={"address"}>Address: </label>
          <p>{address?.type}</p>
        </div>
        <input
          {...register("address", { required: true })}
          type="text"
          id={"address"}
        />
      </div>
      <div className={classes.inputBox}>
        <div className={classes.infoBox}>
          <label htmlFor={"payment"}>Payment: </label>
          <p>{payment?.type}</p>
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
