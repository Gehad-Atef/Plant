import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/context/UserProvider";
import { getCartItems } from "@/api/cartService";
function useCartQuery() {
    const { user } = useUserContext();
    const { data: cart } = useQuery({
        queryKey: ["cart", user?.id],
        queryFn: async function () {
            const data = await getCartItems({ userId: user?.id });
            return data;
        },
        enabled: !!user?.id,
    });

    return { cart };
}

export default useCartQuery;
