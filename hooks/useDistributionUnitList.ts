import { useQuery } from "@tanstack/react-query"
import { DistributionUnit } from "@/types"

type DistributionUnitJson = {
    chainId: number
    token: `0x${string}`
    blockNumber: string
    root: `0x${string}`
}

export const useDistributionUnitList = () => {
    return useQuery({
        queryKey: ["distribution-unit-list"],
        queryFn: async (): Promise<DistributionUnit[]> => {
            const url = "/api/distributions"

            const response = await fetch(url)

            const data: DistributionUnitJson[] = await response.json()

            return data.map(item => ({
                ...item, blockNumber: BigInt(item.blockNumber)
            }))
        },
    })
}
