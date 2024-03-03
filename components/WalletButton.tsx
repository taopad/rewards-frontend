"use client"

import { useAccount } from "wagmi"
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/Spinner"

export function WalletButton() {
    const { openChainModal } = useChainModal()
    const { openConnectModal } = useConnectModal()
    const { openAccountModal } = useAccountModal()
    const { isConnected, isConnecting, isReconnecting, chain, address } = useAccount()

    if (isConnecting || isReconnecting) {
        return (
            <Button className="w-48" disabled>
                <Spinner /> Connecting
            </Button>
        )
    }

    if (!isConnected) {
        return (
            <Button className="w-48" onClick={openConnectModal}>
                Connect wallet
            </Button>
        )
    }

    if (chain === undefined) {
        return (
            <Button className="w-48" variant="destructive" onClick={openChainModal}>
                Wrong chain
            </Button>
        )
    }

    return (
        <Button className="w-48" onClick={openAccountModal}>
            {formatAddress(address)}
        </Button>
    )
}

function formatAddress(address: `0x${string}` | undefined) {
    return address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : ""
}
