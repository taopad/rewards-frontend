"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"

export function RewardAmountReceived({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const proof = useProofParams(unit)
    const metadata = useTokenMetadata(chainId, token)

    const amount = proof.data?.amount
    const decimals = metadata.data?.decimals.result

    if (amount === undefined || decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(amount, decimals)}</span>
}
