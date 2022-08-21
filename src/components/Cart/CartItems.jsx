import CartItem from "./CartItem";

const CartItems = ({ cartItems, visible }) => {
  return (
    <ul style={visible ? {} : { display: "none" }}>
      {cartItems.map(({ item, amount }) => (
        <CartItem
          name={item.name}
          amount={amount}
          price={item.price}
          key={item.name}
        />
      ))}
    </ul>
  );
};

export default CartItems;
