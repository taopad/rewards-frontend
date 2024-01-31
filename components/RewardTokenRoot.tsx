"use client"

import { useRewardToken } from "@/hooks/useRewardToken"

export function RewardTokenRoot({ chainId, token, blockNumber }: { chainId: number, token: `0x${string}`, blockNumber: bigint }) {
    const reward = useRewardToken(chainId, token, blockNumber)

    if (reward.isLoading || !reward.isSuccess) {
        return <span>-</span>
    }

    return <span>{reward.data.root}</span>
}
