"use client"

import Link from "next/link"
import { formatUnits } from "viem"
import { Spinner } from "@/components/Spinner"
import { RewardTokenAmount } from "@/components/RewardTokenAmount"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { useDistributionDetails } from "@/hooks/useDistributionDetails"
import { formatAmount } from "@/utils/formatAmount"
import { selectChainInfo } from "@/utils/selectChainInfo"
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table"

export function DistributionDetails({ chainId, token, address }: { chainId: number, token: `0x${string}`, address: `0x${string}` }) {
    const { chain } = selectChainInfo(chainId)
    const list = useDistributionDetails(chainId, token, address)

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
                Your snapshot history for <RewardTokenSymbol chainId={chainId} token={token} /> on {chain.name}.
            </p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Block number
                        </TableHead>
                        <TableHead>
                            Tpad balance
                        </TableHead>
                        <TableHead>
                            Cumulative rewards
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        list.data.map(({ blockNumber, balance, amount }) => (
                            <TableRow key={blockNumber.toString()}>
                                <TableCell>
                                    <Link href={`https://etherscan.io/block/${blockNumber}`} target="_blank">
                                        {blockNumber.toString()}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <span title={formatUnits(balance, 18)}>
                                        {formatAmount(balance, 18)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <RewardTokenAmount chainId={chainId} token={token} amount={amount} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
