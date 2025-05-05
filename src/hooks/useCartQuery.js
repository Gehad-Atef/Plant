import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/UserProvider";
import {
    getCartItems,
    addToCart,
    updateCartItem,
    deleteCartItem,
} from "@/api/cartService";

// Get cart items
export default function useCartQuery() {
    const queryClient = useQueryClient();
    const { user } = useUserContext();
    const query = useQuery({
        queryKey: ["cart", user?.id],
        queryFn: () => getCartItems({ userId: user.id }),
        enabled: !!user?.id,
    });
    const { mutateAsync: addItem } = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });

    console.log("user inside useCartQuery", user);

    const { mutateAsync: updateItem } = useMutation({
        mutationFn: updateCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });
    const { mutateAsync: deleteItem } = useMutation({
        mutationFn: deleteCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });
    return {
        cart: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
        addItem,
        updateItem,
        deleteItem,
    };
}
