import { mainnet, arbitrum } from "wagmi/chains"
import { createConfig, http, fallback } from "wagmi"
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
    [mainnet.id]: "https://rpc.ankr.com/eth",
    [arbitrum.id]: "https://rpc.ankr.com/arbitrum",
}

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

export const wagmiConfig = createConfig({
    ssr: true,
    connectors,
    chains: [mainnet, arbitrum],
    transports: {
        [mainnet.id]: fallback([http(rpcs[mainnet.id]), http()]),
        [arbitrum.id]: fallback([http(rpcs[arbitrum.id]), http()]),
    },
})
