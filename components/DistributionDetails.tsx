"use client"

import Link from "next/link"
import { formatUnits } from "viem"
import { DistributionDetails } from "@/types"
import { Spinner } from "@/components/Spinner"
import { RewardTokenAmount } from "@/components/RewardTokenAmount"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { useDistributionDetails } from "@/hooks/useDistributionDetails"
import { selectChainInfo, formatAmount } from "@/lib/utils"
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table"

export function DistributionDetails({ chainId, token }: { chainId: number, token: `0x${string}` }) {
    const { chain } = selectChainInfo(chainId)
    const list = useDistributionDetails(chainId, token)

    if (list.isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }

    if (!list.isSuccess) {
        return null
    }

    return (
        <div className="flex flex-col gap-4">
            <h1>Snapshots</h1>
            <p>
                Snapshot history of connected address for <RewardTokenSymbol chainId={chainId} token={token} /> on {chain.name}.
            </p>
            {list.data.length === 0 ? <NoData /> : <SnapshotTable chainId={chainId} token={token} distributions={list.data} />}
        </div>
    )
}

function NoData() {
    return (
        <p>
            No snapshot for the connected wallet.
        </p>
    )
}

function SnapshotTable({ chainId, token, distributions }: { chainId: number, token: `0x${string}`, distributions: DistributionDetails[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Block number
                    </TableHead>
                    <TableHead>
                        Active TPAD
                    </TableHead>
                    <TableHead>
                        Your TPAD balance
                    </TableHead>
                    <TableHead>
                        Cumulative rewards
                    </TableHead>
                    <TableHead>
                        Your cumulative rewards
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    distributions.map(({ blockNumber, balance, amount, totalShares }) => {
                        return (
                            <TableRow key={blockNumber.toString()}>
                                <TableCell>
                                    <Link href={`https://etherscan.io/block/${blockNumber}`} target="_blank">
                                        {blockNumber.toString()}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <span title={formatUnits(totalShares, 18)}>
                                        {formatAmount(totalShares, 18, 0)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span title={formatUnits(balance, 18)}>
                                        {formatAmount(balance, 18, 2)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <RewardTokenAmount chainId={chainId} token={token} amount={cumulativeRewards(blockNumber, distributions)} />
                                </TableCell>
                                <TableCell>
                                    <RewardTokenAmount chainId={chainId} token={token} amount={amount} />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

function cumulativeRewards(blockNumber: bigint, distributions: DistributionDetails[]) {
    return distributions
        .filter(distribution => distribution.blockNumber <= blockNumber)
        .map(distribution => distribution.totalRewards)
        .reduce((acc, current) => acc + current, 0n)
}
