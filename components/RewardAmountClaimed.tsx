"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { useClaimedAmount } from "@/hooks/useClaimedAmount"
import { formatAmount } from "@/utils/formatAmount"

export function RewardAmountClaimed({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const claimed = useClaimedAmount(unit)
    const metadata = useTokenMetadata(chainId, token)

    const amount = claimed.data
    const decimals = metadata.data?.decimals

    if (amount === undefined || decimals === undefined) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(amount, decimals)}>
            {formatAmount(amount, decimals)}
        </span>
    )
}
