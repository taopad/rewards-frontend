import { useContractRead } from "wagmi"
import { DistributionUnitState, DistributionUnit } from "@/types"
import { DistributorContract } from "@/config/contracts"

export function useDistributionUnitState(unit: DistributionUnit): DistributionUnitState {
    const { chainId, token, root } = unit

    const onChainRoot = useContractRead({
        chainId,
        ...DistributorContract,
        functionName: "roots",
        args: [token],
        watch: true,
    })

    if (onChainRoot.data === undefined) {
        return "loading"
    }

    return root === onChainRoot.data ? "claimable" : "pending"
}
