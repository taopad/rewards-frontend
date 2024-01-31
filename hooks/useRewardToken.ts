import { useAccount } from "wagmi"
import { useQuery } from "@tanstack/react-query"

type RewardToken = {
    amount: bigint
    proofs: `0x${string}`[]
}

type RewardTokenJson = {
    amount: string
    proofs: `0x${string}`[]
}

export const useRewardToken = (chainId: number, token: `0x${string}`, blockNumber: bigint) => {
    const { address } = useAccount()

    return useQuery({
        enabled: address !== undefined,
        queryKey: ["reward-token", chainId, token, blockNumber.toString(), address],
        queryFn: async (): Promise<RewardToken> => {
            const url = `/api/proofs/${chainId}/${token}/${blockNumber}/${address}`

            const response = await fetch(url)

            const data: RewardTokenJson = await response.json()

            return {
                ...data, amount: BigInt(data.amount)
            }
        },
    })
}
