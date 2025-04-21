"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a client instance for the QueryClientProvider using useState because we want to create the client only once
  // and not on every render. This is important for performance reasons.
  // If we used const client = new QueryClient() instead of useState, the client would be created on every render, which would cause performance issues.
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 10, // 10 minutes
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
