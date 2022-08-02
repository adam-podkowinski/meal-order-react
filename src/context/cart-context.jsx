import React, { useEffect, useState } from "react";

const cartStorageId = "cart";

const CartContext = React.createContext({
  cartOpen: false,
  cartItems: [],
  addItem: (item, amount) => {},
  removeItem: (name) => {},
  openCart: () => {},
  closeCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(cartStorageId);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const addItem = (item, amount) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((element) => element.item.name === item.name);

      if (idx >= 0) {
        const newItems = [...prev];
        const newItem = { ...newItems[idx] };
        newItem.amount += amount;
        newItems[idx] = newItem;
        return newItems;
      }

      return [{ item, amount }, ...prev];
    });
  };

  useEffect(() => {
    localStorage.setItem(cartStorageId, JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItem = (name) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((e) => e.item.name === name);
      if (idx < 0) {
        return prev;
      }
      const items = [...prev];
      if (items[idx].amount > 1) {
        const newItem = { ...items[idx] };
        newItem.amount--;
        items[idx] = newItem;
        return items;
      }
      items.splice(idx, 1);
      return items;
    });
  };

  return (
    <CartContext.Provider
      className="Provider"
      value={{
        cartItems: cartItems,
        cartOpen: cartOpen,
        addItem: addItem,
        removeItem: removeItem,
        openCart: openCart,
        closeCart: closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
