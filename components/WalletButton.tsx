"use client"

import { useAccount } from "wagmi"
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/Spinner"
import { useHasMounted } from "@/hooks/useHasMounted"

export function WalletButton() {
    const hasMounted = useHasMounted()
    const { openChainModal } = useChainModal()
    const { openConnectModal } = useConnectModal()
    const { openAccountModal } = useAccountModal()
    const { isConnected, chain, address } = useAccount()

    if (!hasMounted) return (
        <Button className="w-48" disabled>
            <Spinner /> Connect wallet
        </Button>
    )

    if (!isConnected) return (
        <Button className="w-48" onClick={openConnectModal}>
            Connect wallet
        </Button>
    )

    if (chain === undefined) return (
        <Button className="w-48" variant="destructive" onClick={openChainModal}>
            Wrong chain
        </Button>
    )

    return (
        <Button className="w-48" onClick={openAccountModal}>
            {formatAddress(address)}
        </Button>
    )
}

function formatAddress(address: `0x${string}` | undefined) {
    return address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : ""
}
