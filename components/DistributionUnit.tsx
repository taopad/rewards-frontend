import Image from "next/image"

import { DistributionUnit } from "@/types"
import { ClaimForm } from "@/components/ClaimForm"
import { RewardTokenAmount } from "@/components/RewardTokenAmount"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { DistributionUnitState } from "@/components/DistributionUnitState"
import { selectChainInfo } from "@/utils/selectChainInfo"

export function DistributionUnit({ unit }: { unit: DistributionUnit }) {
    const { chain, logo } = selectChainInfo(unit.chainId)

    return (
        <div className="flex gap-4 items-center border p-4">
            <Image className="h-12 w-12" width={1} height={1} src={`/logos/${logo}.svg`} alt={chain.name} />
            <div className="flex flex-col gap-2 flex-1">
                <p><RewardTokenSymbol unit={unit} /></p>
                <p><input type="text" value={unit.token} readOnly className="w-full border-0 flex-1 focus:outline-none focus:ring-0" /></p>
                <p><RewardTokenAmount unit={unit} /></p>
                <p>Status: <DistributionUnitState unit={unit} /></p>
                <ClaimForm unit={unit} />
            </div>
        </div>
    )
}
