import { wagmiConfig } from "@/config/wallet"

export const selectChainInfo = (chainId: number) => {
    const chain = wagmiConfig.chains.filter(chain => chain.id === chainId).shift()

    if (chain === undefined) {
        return { chain: { name: "-" }, logo: "" }
    }

    const logo = chain.name.toLowerCase().replace(" ", "-")

    return { chain, logo }
}
