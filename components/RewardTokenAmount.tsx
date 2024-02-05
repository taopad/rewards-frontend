"use client"

import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { formatAmount } from "@/utils/formatAmount"

export function RewardTokenAmount({ chainId, token, amount }: { chainId: number, token: `0x${string}`, amount: bigint }) {
    const metadata = useTokenMetadata(chainId, token)

    const decimals = metadata.data?.decimals.result

    if (decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatAmount(amount, decimals)}</span>
}