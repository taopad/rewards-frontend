import { useAccount } from "wagmi"
import { useQuery } from "@tanstack/react-query"
import { DistributionUnit, ProofParams } from "@/types"

type ProofParamsJson = {
    amount: string
    proof: `0x${string}`[]
}

export const useProofParams = (unit: DistributionUnit) => {
    const { address } = useAccount()

    const { chainId, token, blockNumber } = unit

    return useQuery({
        enabled: address !== undefined,
        queryKey: ["proof-params", chainId, token, blockNumber.toString(), address],
        queryFn: async (): Promise<ProofParams> => {
            const url = `/api/distributions/${chainId}/${token}/proofs/${blockNumber}/${address}`

            const response = await fetch(url)

            const data: ProofParamsJson = await response.json()

            return {
                ...data, amount: BigInt(data.amount)
            }
        },
    })
}
