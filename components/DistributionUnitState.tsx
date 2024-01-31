"use client"

import { DistributionUnit } from "@/types"
import { useDistributionUnitState } from "@/hooks/useDistributionUnitState"

export function DistributionUnitState({ unit }: { unit: DistributionUnit }) {
    const state = useDistributionUnitState(unit)

    if (state === "loading") {
        return <span>-</span>
    }

    if (state === "claimable") {
        return <span>Claimable</span>
    }

    return <span>Pending</span>
}
