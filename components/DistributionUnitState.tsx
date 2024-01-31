"use client"

import { DistributionUnit } from "@/types"
import { useDistributionUnitState } from "@/hooks/useDistributionUnitState"

export function DistributionUnitState({ unit }: { unit: DistributionUnit }) {
    const state = useDistributionUnitState(unit)

    if (state === "loading") {
        return <span>-</span>
    }

    if (state === "ready") {
        return <span>Ready</span>
    }

    return <span>Pending</span>
}
