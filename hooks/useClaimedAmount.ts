import { useAccount, useContractRead } from "wagmi"
import { DistributionUnit } from "@/types"
import { DistributorContract } from "@/config/contracts"

export function useClaimedAmount(unit: DistributionUnit) {
    const { chainId, token } = unit

    const { isConnected, address } = useAccount()

    return useContractRead({
        chainId,
        ...DistributorContract,
        functionName: "claimed",
        args: [address ?? "0x", token],
        scopeKey: address,
        enabled: isConnected && address !== undefined,
        watch: true,
    })
}
