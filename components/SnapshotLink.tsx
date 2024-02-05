import Link from "next/link"

import { useAccount } from "wagmi"
import { DistributionUnit } from "@/types"

export function SnapshotLink({ unit, children }: { unit: DistributionUnit, children: React.ReactNode }) {
    const { chainId, token } = unit

    const { address } = useAccount()

    if (address === undefined) {
        return <span>{children}</span>
    }

    return (
        <Link href={`/distributions/${chainId}/${token}/${address}`} target="_blank">
            {children}
        </Link>
    )
}
