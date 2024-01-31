"use client"

import { useNetwork, useAccount } from "wagmi"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { useChainModal } from "@rainbow-me/rainbowkit"
import { useRewardToken } from "@/hooks/useRewardToken"
import { useRewardTokenState } from "@/hooks/useRewardTokenState"
import { selectChainInfo } from "@/utils/selectChainInfo"
import { DistributorContract } from "@/config/contracts"

const useClaim = (chainId: number, token: `0x${string}`, blockNumber: bigint) => {
    const { chain } = useNetwork()
    const { isConnected, address } = useAccount()
    const state = useRewardTokenState(chainId, token, blockNumber)
    const reward = useRewardToken(chainId, token, blockNumber)

    const amount = reward.data?.amount
    const proofs = reward.data?.proofs

    const prepare = usePrepareContractWrite({
        ...DistributorContract,
        functionName: "claim",
        args: [address ?? "0x", token, amount ?? 0n, proofs ?? []],
        scopeKey: address,
        enabled: isConnected &&
            state === "ready" &&
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

export function ClaimForm({ chainId, token, blockNumber }: { chainId: number, token: `0x${string}`, blockNumber: bigint }) {
    const { chain } = useNetwork()
    const { prepare, action, wait } = useClaim(chainId, token, blockNumber)

    if (chain === undefined) {
        return null
    }

    if (chain.id !== chainId) {
        return <SwitchChainButton chainId={chainId} />
    }

    const loading = prepare.isLoading || action.isLoading || wait.isLoading || !action.write
    const disabled = loading || !prepare.isSuccess

    return (
        <form onSubmit={e => {
            e.preventDefault()
            alert("claim")
        }}>
            <ClaimButton loading={loading} disabled={disabled} />
        </form>
    )
}

function SwitchChainButton({ chainId }: { chainId: number }) {
    const { chain } = selectChainInfo(chainId)

    const { openChainModal } = useChainModal()

    return (
        <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={openChainModal}
        >
            Switch to {chain.name}
        </button>
    )
}

function ClaimButton({ loading, disabled }: { loading: boolean, disabled: boolean }) {
    return (
        <button
            type="submit"
            className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            disabled={disabled}
        >
            Claim
        </button>
    )
}
