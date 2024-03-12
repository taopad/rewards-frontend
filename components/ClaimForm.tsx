"use client"

import { DistributionUnit } from "@/types"
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useProofParams } from "@/hooks/useProofParams"
import { useClaimedAmount } from "@/hooks/useClaimedAmount"
import { useDistributionUnitState } from "@/hooks/useDistributionUnitState"
import { Spinner } from "@/components/Spinner"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { RewardAmountClaimable } from "@/components/RewardAmountClaimable"
import { Button } from "@/components/ui/button"
import { selectChainInfo } from "@/utils/selectChainInfo"
import { DistributorContract } from "@/config/contracts"

const useSimulateClaim = (unit: DistributionUnit) => {
    const { token } = unit

    const params = useProofParams(unit)
    const claimed = useClaimedAmount(unit)
    const state = useDistributionUnitState(unit)
    const { isConnected, chain, address } = useAccount()

    const chainId = chain?.id ?? 0
    const userAddress = address ?? "0x"
    const claimedAmount = claimed.data ?? 0n
    const receivedAmount = params.data?.amount ?? 0n
    const proof = params.data?.proof ?? []

    return useSimulateContract({
        ...DistributorContract,
        chainId,
        functionName: "claim",
        args: [userAddress, token, receivedAmount, proof],
        account: address,
        scopeKey: address,
        query: {
            enabled: isConnected
                && params.isSuccess
                && claimed.isSuccess
                && state === "claimable"
                && !claimed.isRefetching
                && receivedAmount > claimedAmount,
        },
    })
}

export function ClaimForm({ unit }: { unit: DistributionUnit }) {
    const { chain } = useAccount()
    const claimed = useClaimedAmount(unit)

    const chainId = chain?.id ?? 0

    const { data, isLoading } = useSimulateClaim(unit)
    const { data: hash, isPending, writeContract } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash, chainId, confirmations: 1 })

    const loading = isLoading || isPending || isConfirming
    const disabled = loading || !Boolean(data?.request)

    return (
        <form onSubmit={e => {
            e.preventDefault()
            writeContract(data!.request, { onSuccess: () => { claimed.refetch() } })
        }}>
            <ClaimButton loading={loading} disabled={disabled} unit={unit} />
        </form>
    )
}

function ClaimButton({ loading, disabled, unit }: { loading: boolean, disabled: boolean, unit: DistributionUnit }) {
    const { chainId } = unit

    const params = useProofParams(unit)
    const claimed = useClaimedAmount(unit)
    const state = useDistributionUnitState(unit)
    const { isConnected, chain } = useAccount()

    const claimedAmount = claimed.data ?? 0n
    const receivedAmount = params.data?.amount ?? 0n
    const claimableAmount = receivedAmount - claimedAmount

    if (state === "loading") {
        return <EmptyButton />
    }

    if (!isConnected) {
        return <ConnectWalletButton />
    }

    if (chain === undefined || chain.id !== chainId) {
        return <SwitchChainButton chainId={chainId} />
    }

    if (claimableAmount === 0n) {
        return <NoRewardButton />
    }

    if (state === "pending") {
        return <PendingDistributionButton />
    }

    return (
        <Button type="submit" className="w-full" disabled={disabled}>
            <Spinner loading={loading} />
            <span>
                Claim <RewardAmountClaimable unit={unit} /> <RewardTokenSymbol chainId={unit.chainId} token={unit.token} />
            </span>
        </Button>
    )
}

function EmptyButton() {
    return (
        <Button type="button" className="w-full" disabled>
            -
        </Button>
    )
}

function ConnectWalletButton() {
    const { openConnectModal } = useConnectModal()

    return (
        <Button type="button" className="w-full" onClick={openConnectModal}>
            Connect wallet
        </Button>
    )
}

function SwitchChainButton({ chainId }: { chainId: number }) {
    const { chain } = selectChainInfo(chainId)

    const { openChainModal } = useChainModal()

    return (
        <Button type="button" className="w-full" onClick={openChainModal}>
            Switch to {chain.name}
        </Button>
    )
}

function NoRewardButton() {
    return (
        <Button type="button" className="w-full" disabled>
            Nothing to claim
        </Button>
    )
}

function PendingDistributionButton() {
    return (
        <Button type="button" className="w-full" disabled>
            Distribution is pending
        </Button>
    )
}
