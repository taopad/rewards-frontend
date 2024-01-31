"use client"

import { formatUnits } from "viem"
import { useRewardToken } from "@/hooks/useRewardToken"
import { useTokenMetadata } from "@/hooks/useTokenMetadata"

export function RewardTokenAmount({ chainId, token, blockNumber }: { chainId: number, token: `0x${string}`, blockNumber: bigint }) {
    const metadata = useTokenMetadata(chainId, token)
    const reward = useRewardToken(chainId, token, blockNumber)

    const decimals = metadata.data?.decimals.result

    if (reward.isLoading || !reward.isSuccess || decimals === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(reward.data.amount, decimals)}</span>
}
