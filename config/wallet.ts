import { arbitrum } from "wagmi/chains"
import { createConfig, createStorage, cookieStorage, http, fallback } from "wagmi"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import {
    injectedWallet,
    rainbowWallet,
    coinbaseWallet,
    walletConnectWallet,
    trustWallet,
    rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets"

const appName = "Taopad app"
const projectId = "031d4ad6ce63b830ab346fb92b96f328"

const rpcs = {
    [arbitrum.id]: "https://rpc.ankr.com/arbitrum",
}

const storage = createStorage({ storage: cookieStorage })

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Wallets',
            wallets: [
                injectedWallet,
                rainbowWallet,
                coinbaseWallet,
                walletConnectWallet,
                trustWallet,
                rabbyWallet,
            ],
        },
    ],
    { appName, projectId }
)

export const config = createConfig({
    ssr: true,
    storage,
    connectors,
    chains: [arbitrum],
    transports: {
        [arbitrum.id]: fallback([http(rpcs[arbitrum.id]), http()]),
    },
})
