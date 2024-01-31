"use client"

import { Spinner } from "@/components/Spinner"
import { DistributionUnit } from "@/components/DistributionUnit"
import { useDistributionUnitList } from "@/hooks/useDistributionUnitList"

export function DistributionUnitList() {
    const units = useDistributionUnitList()

    if (units.isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }

    if (!units.isSuccess) {
        return null
    }

    return (
        <div className="flex flex-col gap-4">
            <h1>Distributions</h1>
            <div className="flex flex-col gap-4">
                {
                    units.data.map(unit => (
                        <DistributionUnit key={`${unit.chainId}:${unit.token}`} unit={unit} />
                    ))
                }
            </div>
        </div>
    )
}
