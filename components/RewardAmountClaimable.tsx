"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useClaimedAmount } from "@/hooks/useClaimedAmount"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { formatAmount } from "@/utils/formatAmount"

export function RewardAmountClaimable({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const params = useProofParams(unit)
    const claimed = useClaimedAmount(unit)
    const metadata = useTokenMetadata(chainId, token)

    const claimedAmount = claimed.data ?? 0n
    const receivedAmount = params.data?.amount ?? 0n
    const amount = receivedAmount - claimedAmount
    const decimals = metadata.data?.decimals ?? 0

    if (!claimed.isSuccess || !params.isSuccess || !metadata.isSuccess) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(amount, decimals)}>
            {formatAmount(amount, decimals)}
        </span>
    )
}
