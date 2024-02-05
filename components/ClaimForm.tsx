"use client"

import { useNetwork, useAccount } from "wagmi"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useClaimableAmount } from "@/hooks/useClaimableAmount"
import { useDistributionUnitState } from "@/hooks/useDistributionUnitState"
import { Spinner } from "@/components/Spinner"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { RewardAmountClaimable } from "@/components/RewardAmountClaimable"
import { selectChainInfo } from "@/utils/selectChainInfo"
import { DistributorContract } from "@/config/contracts"
import { Button } from "@/components/ui/button"

const useClaim = (unit: DistributionUnit) => {
    const { token } = unit

    const { chain } = useNetwork()
    const { isConnected, address } = useAccount()
    const state = useDistributionUnitState(unit)
    const params = useProofParams(unit)

    const amount = params.data?.amount
    const proof = params.data?.proof

    const prepare = usePrepareContractWrite({
        ...DistributorContract,
        functionName: "claim",
        args: [address ?? "0x", token, amount ?? 0n, proof ?? []],
        scopeKey: address,
        enabled: isConnected &&
            state === "claimable" &&
            chain !== undefined &&
            address !== undefined &&
            amount !== undefined &&
            proof !== undefined &&
            amount > 0n
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({ hash: action.data?.hash })

    return { state, prepare, action, wait }
}

export function ClaimForm({ unit }: { unit: DistributionUnit }) {
    const { prepare, action, wait } = useClaim(unit)

    const loading = prepare.isLoading || action.isLoading || wait.isLoading || !action.write
    const disabled = loading || !prepare.isSuccess

    return (
        <form onSubmit={e => {
            e.preventDefault()
            action.write?.()
        }}>
            <ClaimButton loading={loading} disabled={disabled} unit={unit} />
        </form>
    )
}

function ClaimButton({ loading, disabled, unit }: { loading: boolean, disabled: boolean, unit: DistributionUnit }) {
    const { chainId } = unit

    const { chain } = useNetwork()
    const { isConnected } = useAccount()
    const state = useDistributionUnitState(unit)
    const claimable = useClaimableAmount(unit)

    const amount = claimable.data

    if (state === "loading") {
        return <EmptyButton />
    }

    if (!isConnected || chain === undefined) {
        return <ConnectWalletButton />
    }

    if (chain.id !== chainId) {
        return <SwitchChainButton chainId={chainId} />
    }

    if (amount === 0n) {
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
