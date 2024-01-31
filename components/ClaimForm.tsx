"use client"

import { useNetwork } from "wagmi"
import { useChainModal } from "@rainbow-me/rainbowkit"
import { selectChainInfo } from "@/utils/selectChainInfo"

export function ClaimForm({ chainId }: { chainId: number }) {
    const { chain } = useNetwork()

    if (chain === undefined) {
        return null
    }

    if (chain.id !== chainId) {
        return <SwitchChainButton chainId={chainId} />
    }

    return <ClaimButton />
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

function ClaimButton() {
    return (
        <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            disabled
        >
            Claim
        </button>
    )
}
