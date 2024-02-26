import Link from "next/link"

import { useAccount } from "wagmi"
import { DistributionUnit } from "@/types"

export function DistributionDetailsLink({ unit, children }: { unit: DistributionUnit, children: React.ReactNode }) {
    const { chainId, token } = unit

    return (
        <Link href={`/distributions/${chainId}/${token}`} target="_blank">
            {children}
        </Link>
    )
}
