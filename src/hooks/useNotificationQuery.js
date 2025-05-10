import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/context/UserProvider";
import { getNotifications } from "@/api/notificationService";

export default function useNotificationQuery() {
    const { user } = useUserContext();

    const query = useQuery({
        queryKey: ["notifications", user?.id],
        queryFn: () => getNotifications({ userId: user.id }),
        enabled: !!user?.id,
    });

    return {
        notifications: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
    };
}
