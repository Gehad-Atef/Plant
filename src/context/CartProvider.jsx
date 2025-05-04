import useCartQuery from "@/hooks/useCartQuery";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { cart, isLoading, isError, refetch, addItem, updateItem, deleteItem } =
    useCartQuery();
  console.log(cart);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Lavender",
      price: 45,
      quantity: 1,
      imageUrl: "src/assets/Images/Lavende.png",
    },
    {
      id: 2,
      name: "Lewisia",
      price: 60,
      quantity: 1,
      imageUrl: "src/assets/Images/Lewisia.png",
    },
    {
      id: 3,
      name: "Lily",
      price: 30,
      quantity: 1,
      imageUrl: "src/assets/Images/Indoor.png",
    },
  ]);

  const addToCart = (item) => {
    const exists = cartItems.find((i) => i.id === item.id);
    if (exists) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: item.quantity } // هنا بنستبدل الكمية القديمة بالجديدة
            : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
