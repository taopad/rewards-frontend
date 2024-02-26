import { DistributionUnit } from "@/types"
import { DistributorContract } from "@/config/contracts"
import { useAccount, useReadContract } from "wagmi"

export function useClaimedAmount(unit: DistributionUnit) {
    const { chainId, token } = unit

    const { isConnected, address } = useAccount()

    return useReadContract({
        chainId,
        ...DistributorContract,
        functionName: "claimed",
        args: [address ?? "0x", token],
        scopeKey: address,
        query: {
            enabled: isConnected && address !== undefined,
        },
    })
}
