"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { formatAmount } from "@/utils/formatAmount"

export function RewardAmountReceived({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const params = useProofParams(unit)
    const metadata = useTokenMetadata(chainId, token)

    const amount = params.data?.amount ?? 0n
    const decimals = metadata.data?.decimals ?? 0

    if (!params.isSuccess || !metadata.isSuccess) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(amount, decimals)}>
            {formatAmount(amount, decimals)}
        </span>
    )
}
