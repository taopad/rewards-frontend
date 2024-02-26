"use client"

import { useTokenMetadata } from "@/hooks/useTokenMetadata"

export function RewardTokenSymbol({ chainId, token }: { chainId: number, token: `0x${string}` }) {
    const metadata = useTokenMetadata(chainId, token)

    const symbol = metadata.data?.symbol

    if (symbol === undefined) {
        return "-"
    }

    return <span>${symbol}</span>
}
