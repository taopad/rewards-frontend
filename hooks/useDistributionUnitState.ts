import { useContractRead } from "wagmi"
import { DistributionUnit } from "@/types"
import { DistributorContract } from "@/config/contracts"

type RewardTokenState = "loading" | "ready" | "pending"

export function useDistributionUnitState(unit: DistributionUnit): RewardTokenState {
    const { chainId, token, root } = unit

    const onChainRoot = useContractRead({
        chainId,
        ...DistributorContract,
        functionName: "roots",
        args: [token],
        watch: true,
    })

    if (onChainRoot.data === null) {
        return "loading"
    }

    return root === onChainRoot.data ? "ready" : "pending"
}
