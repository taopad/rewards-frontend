"use client"

import { useRewardTokenState } from "@/hooks/useRewardTokenState"

export function RewardTokenState({ chainId, token, blockNumber }: { chainId: number, token: `0x${string}`, blockNumber: bigint }) {
    const state = useRewardTokenState(chainId, token, blockNumber)

    if (state === "loading") {
        return <span>-</span>
    }

    if (state === "ready") {
        return <span>Ready</span>
    }

    return <span>Pending</span>
}
