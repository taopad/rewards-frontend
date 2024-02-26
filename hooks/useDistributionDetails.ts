import { useAccount } from "wagmi"
import { useQuery } from "@tanstack/react-query"
import { DistributionDetails } from "@/types"

type DistributionDetailsJson = {
    chainId: number
    token: `0x${string}`
    block_number: string
    balance: string
    amount: string
}

export const useDistributionDetails = (chainId: number, token: `0x${string}`) => {
    const { address } = useAccount()

    return useQuery({
        enabled: address !== undefined,
        queryKey: ["distribution-details", chainId, token, address],
        queryFn: async (): Promise<DistributionDetails[]> => {
            const url = `/api/distributions/${chainId}/${token}/details/${address}`

            const response = await fetch(url)

            const data: DistributionDetailsJson[] = await response.json()

            return data.map(item => ({
                ...item,
                blockNumber: BigInt(item.block_number),
                balance: BigInt(item.balance),
                amount: BigInt(item.amount),
            }))
        },
    })
}
