"use client"

import "@rainbow-me/rainbowkit/styles.css"

import { useState } from "react"
import { WagmiProvider, cookieToInitialState } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { config } from "@/config/wallet"

export function WalletProvider({ cookie, children }: { cookie: string | null, children: React.ReactNode }) {
    const initialState = cookieToInitialState(config, cookie)
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
