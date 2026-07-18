'use client'

import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props{
    children: React.ReactNode;
}



export default function TanStackProvider({ children }: Props) {
    const [queryClient] = useState(()=> new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}