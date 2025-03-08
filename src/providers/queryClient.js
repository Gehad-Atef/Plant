import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// Create React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1, // Retry failed requests once
    },
  },
});

// Create persister using localStorage or sessionStorage
export const persister = createSyncStoragePersister({
  storage: window.localStorage, // or window.sessionStorage
});
