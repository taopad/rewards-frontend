import { useContractRead } from "wagmi"
import { DistributorContract } from "@/config/contracts"
import { useRewardToken } from "./useRewardToken"

type RewardTokenState = "loading" | "ready" | "pending"

export function useRewardTokenState(chainId: number, token: `0x${string}`, blockNumber: bigint): RewardTokenState {
    const reward = useRewardToken(chainId, token, blockNumber)

    const root = useContractRead({
        chainId,
        ...DistributorContract,
        functionName: "roots",
        args: [token],
    })

    if (reward.isLoading || !reward.isSuccess || root.data === null) {
        return "loading"
    }

    return reward.data.root === root.data ? "ready" : "pending"
}
