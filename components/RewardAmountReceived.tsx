"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"

export function RewardAmountReceived({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const proof = useProofParams(unit)
    const metadata = useTokenMetadata(chainId, token)

    const received = proof.data?.amount
    const decimals = metadata.data?.decimals.result

    if (received === undefined || decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(received, decimals)}</span>
}
