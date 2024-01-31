"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"
import { useClaimedAmount } from "@/hooks/useClaimedAmount"

export function RewardAmountClaimable({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const proof = useProofParams(unit)
    const result = useClaimedAmount(unit)
    const metadata = useTokenMetadata(chainId, token)

    const claimed = result.data
    const received = proof.data?.amount
    const decimals = metadata.data?.decimals.result

    if (claimed === undefined || received === undefined || decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(received - claimed, decimals)}</span>
}
