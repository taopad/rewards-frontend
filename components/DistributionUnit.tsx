import Image from "next/image"

import { DistributionUnit } from "@/types"
import { ClaimForm } from "@/components/ClaimForm"
import { SnapshotLink } from "@/components/SnapshotLink"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { RewardAmountClaimed } from "@/components/RewardAmountClaimed"
import { RewardAmountProgress } from "@/components/RewardAmountProgress"
import { RewardAmountReceived } from "@/components/RewardAmountReceived"
import { selectChainInfo } from "@/utils/selectChainInfo"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function DistributionUnit({ unit }: { unit: DistributionUnit }) {
    const { chain, logo } = selectChainInfo(unit.chainId)

    return (
        <div className="flex items-center bg-white rounded-xl">
            <div className="hidden lg:block">
                <Image className="h-16 w-16 px-4" width={1} height={1} src={`/logos/${logo}.svg`} alt={chain.name} />
            </div>
            <Card className="bg-black flex-1 lg:rounded-l-none">
                <CardHeader>
                    <CardTitle>
                        <RewardTokenSymbol chainId={unit.chainId} token={unit.token} /> on {chain.name}
                    </CardTitle>
                    <CardDescription>
                        <input
                            type="text"
                            value={unit.token}
                            className="bg-transparent w-full border-0 flex-1 focus:outline-none focus:ring-0"
                            readOnly
                        />
                    </CardDescription>
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
                                <span>
                                    <RewardAmountReceived unit={unit} /> <RewardTokenSymbol chainId={unit.chainId} token={unit.token} />
                                </span>
                            </div>
                            <RewardAmountProgress unit={unit} />
                        </div>
                        <ClaimForm unit={unit} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <SnapshotLink unit={unit}>
                        <span className="muted">Your snapshots details</span>
                    </SnapshotLink>
                </CardFooter>
            </Card>
        </div>
    )
}
