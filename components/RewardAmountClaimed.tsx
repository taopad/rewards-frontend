"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { useClaimedAmount } from "@/hooks/useClaimedAmount"

export function RewardAmountClaimed({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const claimed = useClaimedAmount(unit)
    const metadata = useTokenMetadata(chainId, token)

    const amount = claimed.data
    const decimals = metadata.data?.decimals.result

    if (amount === undefined || decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(amount, decimals)}</span>
}
