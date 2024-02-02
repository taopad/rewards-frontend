"use client"

import { DistributionUnit } from "@/types"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { useClaimableAmount } from "@/hooks/useClaimableAmount"
import { formatAmount } from "@/utils/formatAmount"

export function RewardAmountClaimable({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const metadata = useTokenMetadata(chainId, token)
    const claimable = useClaimableAmount(unit)

    const amount = claimable.data
    const decimals = metadata.data?.decimals.result

    if (amount === undefined || decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatAmount(amount, decimals)}</span>
}
