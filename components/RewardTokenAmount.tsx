"use client"

import { formatUnits } from "viem"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"

export function RewardTokenAmount({ unit }: { unit: DistributionUnit }) {
    const { chainId, token } = unit

    const metadata = useTokenMetadata(chainId, token)
    const reward = useProofParams(unit)

    const decimals = metadata.data?.decimals.result

    if (reward.isLoading || !reward.isSuccess || decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(reward.data.amount, decimals)}</span>
}
