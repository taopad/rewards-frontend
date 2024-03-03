import { config } from "@/config/wallet"

export const selectChainInfo = (chainId: number) => {
    const chain = config.chains.filter(chain => chain.id === chainId).shift()

    if (chain === undefined) {
        return { chain: { name: "-" }, logo: "" }
    }

    const logo = chain.name.toLowerCase().replace(" ", "-")

    return { chain, logo }
}
