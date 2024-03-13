"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { useClaimedAmount } from "@/hooks/useClaimedAmount"
import { formatAmount } from "@/lib/utils"

export function RewardAmountClaimed({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const claimed = useClaimedAmount(unit)
    const metadata = useTokenMetadata(chainId, token)

    const amount = claimed.data ?? 0n
    const decimals = metadata.data?.decimals ?? 0

    if (!claimed.isSuccess || !metadata.isSuccess) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(amount, decimals)}>
            {formatAmount(amount, decimals)}
        </span>
    )
}
