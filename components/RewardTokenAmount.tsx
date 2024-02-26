"use client"

import { formatUnits } from "viem"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"

export function RewardTokenAmount({ chainId, token, amount }: { chainId: number, token: `0x${string}`, amount: bigint }) {
    const metadata = useTokenMetadata(chainId, token)

    const decimals = metadata.data?.decimals

    if (decimals === undefined) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(amount, decimals)}>
            {formatUnits(amount, decimals)}
        </span>
    )
}
