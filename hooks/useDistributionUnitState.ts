import { useEffect } from "react"
import { useBlockNumber, useReadContract } from "wagmi"
import { DistributionUnitState, DistributionUnit } from "@/types"
import { DistributorContract } from "@/config/contracts"

export function useDistributionUnitState(unit: DistributionUnit): DistributionUnitState {
    const { chainId, token, root } = unit

    const { data: blockNumber } = useBlockNumber({ watch: true })

    const result = useReadContract({
        chainId,
        ...DistributorContract,
        functionName: "roots",
        args: [token],
    })

    useEffect(() => { result.refetch() }, [blockNumber])

    if (result.data === undefined) {
        return "loading"
    }

    return root === result.data ? "claimable" : "pending"
}
