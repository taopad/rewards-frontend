"use client"

import { DistributionUnit } from "@/components/DistributionUnit"
import { useDistributionUnitList } from "@/hooks/useDistributionUnitList"

export function DistributionUnitList() {
    const units = useDistributionUnitList()

    if (units.isLoading) {
        return "loading"
    }

    if (!units.isSuccess) {
        return null
    }

    if (units.data.length === 0) {
        return "no units"
    }

    return (
        <div className="flex flex-col gap-4">
            {
                units.data.map(unit => (
                    <DistributionUnit key={`${unit.chainId}:${unit.token}`} unit={unit} />
                ))
            }
        </div>
    )
}
