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
        const item = cartItems.find((i) => i.id === id);
        if (item) {
            const newQuantity = item.quantity + 1;
            updateItem({
                userId: user.id,
                itemId: id,
                quantity: newQuantity,
            }).then(() => {
                setCartItems(
                    cartItems.map((i) =>
                        i.id === id ? { ...i, quantity: newQuantity } : i
                    )
                );
            });
        }
    };

    const decreaseQty = (id) => {
        const item = cartItems.find((i) => i.id === id);
        if (item && item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            updateItem({
                userId: user.id,
                itemId: id,
                quantity: newQuantity,
            }).then(() => {
                setCartItems(
                    cartItems.map((i) =>
                        i.id === id ? { ...i, quantity: newQuantity } : i
                    )
                );
            });
        }
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-xl font-semibold">Loading cart...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-xl font-semibold text-red-500">
                    There was an error loading your cart. Please try again.
                </div>
            </div>
        );
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                updateQuantity,
                isLoading, // يمكن استخدامه في مكونات أخرى إذا لزم الأمر
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
