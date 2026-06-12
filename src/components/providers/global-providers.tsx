"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/query/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "@/components/providers/theme-provider";

const  Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;