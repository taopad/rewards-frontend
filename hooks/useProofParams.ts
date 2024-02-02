import { useAccount } from "wagmi"
import { useQuery } from "@tanstack/react-query"
import { DistributionUnit, ProofParams } from "@/types"

type ProofParamsJson = {
    root: `0x${string}`
    amount: string
    proofs: `0x${string}`[]
}

export const useProofParams = (unit: DistributionUnit) => {
    const { address } = useAccount()

    const { chainId, token, blockNumber } = unit

    return useQuery({
        enabled: address !== undefined,
        queryKey: ["reward-token", chainId, token, address, blockNumber.toString()],
        queryFn: async (): Promise<ProofParams> => {
            const url = `/api/distributions/${chainId}/${token}/${address}/${blockNumber}`

            const response = await fetch(url)

            const data: ProofParamsJson = await response.json()

            return {
                ...data, amount: BigInt(data.amount)
            }
        },
    })
}
