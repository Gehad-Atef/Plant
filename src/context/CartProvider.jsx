import useCartQuery from "@/hooks/useCartQuery";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const {
        cart,
        isLoading,
        isError,
        refetch,
        addItem,
        updateItem,
        deleteItem,
    } = useCartQuery();
    console.log(cart);
    const [cartItems, setCartItems] = useState([]);
    const { user } = useUserContext();
    useEffect(() => {
        if (cart) {
            setCartItems(cart);
        }
    }, [cart]);

    const addToCart = (item) => {
        const exists = cartItems.find((i) => i.id === item.id);
        if (exists) {
            updateItem({ cartId: exists.id, quantity: item.quantity }).then(
                () => {
                    setCartItems(
                        cartItems.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: item.quantity }
                                : i
                        )
                    );
                }
            );
        } else {
            addItem({
                userId: user.id,
                plantId: item.id,
                plantName: item.name,
                quantity: item.quantity,
            }).then(() => {
                setCartItems([...cartItems, { ...item }]);
            });
        }
    };

    const removeFromCart = (id) => {
        const itemToRemove = cartItems.find((item) => item.id === id);
        if (itemToRemove) {
            deleteItem(itemToRemove.id).then(() => {
                setCartItems(cartItems.filter((item) => item.id !== id));
            });
        }
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
                isLoading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
