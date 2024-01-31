"use client"

import { useNetwork, useAccount } from "wagmi"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { DistributionUnit } from "@/types"
import { useProofParams } from "@/hooks/useProofParams"
import { useClaimableAmount } from "@/hooks/useClaimableAmount"
import { useDistributionUnitState } from "@/hooks/useDistributionUnitState"
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol"
import { RewardAmountClaimable } from "@/components/RewardAmountClaimable"
import { selectChainInfo } from "@/utils/selectChainInfo"
import { DistributorContract } from "@/config/contracts"

const buttonClass = "w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"

const useClaim = (unit: DistributionUnit) => {
    const { token } = unit

    const { chain } = useNetwork()
    const { isConnected, address } = useAccount()
    const state = useDistributionUnitState(unit)
    const params = useProofParams(unit)

    const amount = params.data?.amount
    const proofs = params.data?.proofs

    const prepare = usePrepareContractWrite({
        ...DistributorContract,
        functionName: "claim",
        args: [address ?? "0x", token, amount ?? 0n, proofs ?? []],
        scopeKey: address,
        enabled: isConnected &&
            state === "claimable" &&
            chain !== undefined &&
            address !== undefined &&
            amount !== undefined &&
            proofs !== undefined &&
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
    const state = useDistributionUnitState(unit)
    const claimable = useClaimableAmount(unit)

    const amount = claimable.data

    if (state === "loading" || amount === undefined) {
        return <EmptyButton />
    }

    if (chain === undefined) {
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
        <button type="submit" className={buttonClass} disabled={disabled}>
            {loading && <span>loading</span>}
            <span>
                Claim <RewardAmountClaimable unit={unit} /> <RewardTokenSymbol unit={unit} />
            </span>
        </button>
    )
}

function EmptyButton() {
    return (
        <button type="button" className={buttonClass} disabled>
            -
        </button>
    )
}

function ConnectWalletButton() {
    const { openConnectModal } = useConnectModal()

    return (
        <button type="button" className={buttonClass} onClick={openConnectModal}>
            Connect wallet
        </button>
    )
}

function SwitchChainButton({ chainId }: { chainId: number }) {
    const { chain } = selectChainInfo(chainId)

    const { openChainModal } = useChainModal()

    return (
        <button type="button" className={buttonClass} onClick={openChainModal}>
            Switch to {chain.name}
        </button>
    )
}

function NoRewardButton() {
    return (
        <button type="button" className={buttonClass} disabled>
            Nothing to claim
        </button>
    )
}

function PendingDistributionButton() {
    return (
        <button type="button" className={buttonClass} disabled>
            Distribution is pending
        </button>
    )
}
