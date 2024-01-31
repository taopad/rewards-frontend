"use client"

import { RewardToken } from "@/components/RewardToken"
import { useRewardTokenList } from "@/hooks/useRewardTokenList"

export function RewardTokenList() {
    const rewards = useRewardTokenList()

    if (rewards.isLoading) {
        return "loading"
    }

    if (!rewards.isSuccess) {
        return null
    }

    if (rewards.data.length === 0) {
        return "no rewards"
    }

    return (
        <div className="flex flex-col gap-4">
            {
                rewards.data.map(reward => (
                    <RewardToken key={`${reward.chainId}:${reward.token}`} {...reward} />
                ))
            }
        </div>
    )
}
