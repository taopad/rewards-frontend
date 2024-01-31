import Image from "next/image"

import { DistributionUnit } from "@/types"
import { ClaimForm } from "@/components/ClaimForm"
import { RewardAmountClaimed } from "@/components/RewardAmountClaimed"
import { RewardAmountReceived } from "@/components/RewardAmountReceived"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { RewardAmountProgress } from "@/components/RewardAmountProgress"
import { selectChainInfo } from "@/utils/selectChainInfo"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function DistributionUnit({ unit }: { unit: DistributionUnit }) {
    const { chain, logo } = selectChainInfo(unit.chainId)

    return (
        <div className="flex items-center bg-white rounded-xl">
            <div className="hidden lg:block">
                <Image className="h-16 w-16 px-4" width={1} height={1} src={`/logos/${logo}.svg`} alt={chain.name} />
            </div>
            <Card className="bg-black flex-1 rounded-l-none">
                <CardHeader>
                    <CardTitle><RewardTokenSymbol unit={unit} /> on {chain.name}</CardTitle>
                    <CardDescription>{unit.token}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span className="muted">Claimed</span>
                                <span className="muted">Received</span>
                            </div>
                            <div className="flex justify-between">
                                <RewardAmountClaimed unit={unit} />
                                <span><RewardAmountReceived unit={unit} /> <RewardTokenSymbol unit={unit} /></span>
                            </div>
                            <RewardAmountProgress unit={unit} />
                        </div>
                        <ClaimForm unit={unit} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
