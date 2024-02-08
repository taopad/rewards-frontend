"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { formatAmount } from "@/utils/formatAmount"

export function RewardAmountReceived({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const proof = useProofParams(unit)
    const metadata = useTokenMetadata(chainId, token)

    const amount = proof.data?.amount
    const decimals = metadata.data?.decimals.result

    if (amount === undefined || decimals === undefined) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(amount, decimals)}>
            {formatAmount(amount, decimals)}
        </span>
    )
}
