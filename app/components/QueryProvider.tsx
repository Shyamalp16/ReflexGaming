"use client";

import React from "react";
import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance.
  // It's important to create the client inside the component or with useState to avoid sharing the client between requests.
  const [queryClient] = React.useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // Global default options for queries if needed
          // staleTime: 5 * 60 * 1000, // 5 minutes
        },
      },
    });
  });

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryClientProvider>
  );
}

export default QueryClientProvider; 