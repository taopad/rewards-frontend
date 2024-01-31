import { useQuery } from "@tanstack/react-query"

type RewardToken = {
    chainId: number
    token: `0x${string}`
    blockNumber: bigint
}

type RewardTokenJson = {
    chainId: number
    token: `0x${string}`
    blockNumber: string
}

export const useRewardTokenList = () => {
    return useQuery({
        queryKey: ["reward-token-list"],
        queryFn: async (): Promise<RewardToken[]> => {
            const url = "/api/rewards"

            const response = await fetch(url)

            const data: RewardTokenJson[] = await response.json()

            return data.map(item => ({
                ...item, blockNumber: BigInt(item.blockNumber)
            }))
        },
    })
}
