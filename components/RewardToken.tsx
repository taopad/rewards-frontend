import Image from "next/image"

import { ClaimForm } from "@/components/ClaimForm"
import { RewardTokenState } from "@/components/RewardTokenState"
import { RewardTokenAmount } from "@/components/RewardTokenAmount"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { selectChainInfo } from "@/utils/selectChainInfo"

export function RewardToken({ chainId, token, blockNumber }: { chainId: number, token: `0x${string}`, blockNumber: bigint }) {
    const { chain, logo } = selectChainInfo(chainId)

    return (
        <div className="flex gap-4 items-center border p-4">
            <Image className="h-12 w-12" width={1} height={1} src={`/logos/${logo}.svg`} alt={chain.name} />
            <div className="flex flex-col gap-2 flex-1">
                <p><RewardTokenSymbol chainId={chainId} token={token} /></p>
                <p><input type="text" value={token} readOnly className="w-full border-0 flex-1 focus:outline-none focus:ring-0" /></p>
                <p><RewardTokenAmount chainId={chainId} token={token} blockNumber={blockNumber} /></p>
                <p>Status: <RewardTokenState chainId={chainId} token={token} blockNumber={blockNumber} /></p>
                <ClaimForm chainId={chainId} token={token} blockNumber={blockNumber} />
            </div>
        </div>
    )
}
