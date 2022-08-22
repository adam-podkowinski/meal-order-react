import React, { useEffect, useState } from "react";

const cartStorageId = "cart";

const CartContext = React.createContext({
  cartOpen: false,
  cartItems: [],
  ordering: false,
  orderState: null,
  page: 0,
  addItem: (item, amount) => {},
  removeItem: (name) => {},
  openCart: () => {},
  closeCart: () => {},
  clearCart: () => {},
  setOrdering: (val) => {},
  setOrderState: (val) => {},
  setPage: (num) => {},
});

export const CartContextProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [orderState, setOrderState] = useState(null);
  const [page, setPage] = useState(0);

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
    setOrderState(null);
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

      return prev.concat({ item, amount });
    });
    setPage(0);
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

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      className="Provider"
      value={{
        cartItems: cartItems,
        cartOpen: cartOpen,
        ordering: ordering,
        page: page,
        orderState: orderState,
        addItem: addItem,
        removeItem: removeItem,
        openCart: openCart,
        closeCart: closeCart,
        clearCart: clearCart,
        setOrdering: setOrdering,
        setOrderState: setOrderState,
        setPage: setPage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
