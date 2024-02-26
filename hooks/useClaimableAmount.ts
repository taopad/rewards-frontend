import { DistributionUnit } from "@/types"
import { useProofParams } from "./useProofParams"
import { useClaimedAmount } from "./useClaimedAmount"

export function useClaimableAmount(unit: DistributionUnit) {
    const result = useClaimedAmount(unit)
    const proof = useProofParams(unit)

    const claimed = result.data
    const received = proof.data?.amount

    if (claimed === undefined || received === undefined) {
        return { data: undefined }
    }

    const claimable = received - claimed

    return { data: claimable > 0n ? claimable : 0n }
}
