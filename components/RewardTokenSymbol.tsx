"use client"

import { DistributionUnit } from "@/types"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"

export function RewardTokenSymbol({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const metadata = useTokenMetadata(chainId, token)

    const symbol = metadata.data?.symbol.result

    if (symbol === undefined) {
        return "-"
    }

    return <span>${symbol}</span>
}
