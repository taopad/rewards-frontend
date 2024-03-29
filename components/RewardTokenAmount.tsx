"use client"

import { formatUnits } from "viem"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { formatAmount } from "@/lib/utils"

export function RewardTokenAmount({ chainId, token, amount }: { chainId: number, token: `0x${string}`, amount: bigint }) {
    const metadata = useTokenMetadata(chainId, token)

    const decimals = metadata.data?.decimals ?? 0

    if (!metadata.isSuccess) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(amount, decimals)}>
            {formatAmount(amount, decimals)}
        </span>
    )
}
