"use client"

import { useState, useEffect } from "react"

import { DistributionUnit } from "@/types"
import { Progress } from "@/components/ui/progress"
import { useProofParams } from "@/hooks/useProofParams"
import { useClaimedAmount } from "@/hooks/useClaimedAmount"

export function RewardAmountProgress({ unit }: { unit: DistributionUnit }) {
    const proof = useProofParams(unit)
    const claimed = useClaimedAmount(unit)
    const [progress, setProgress] = useState(0)

    const total = proof.data?.amount ?? 0n
    const current = claimed.data ?? 0n

    const newProgress = Number(total === 0n ? 0n : current * 100n / total)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(newProgress), 500)
        return () => clearTimeout(timer)
    }, [newProgress])

    return <Progress value={progress} />
}
