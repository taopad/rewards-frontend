import { chains } from "@/config/wallet"

export const selectChainInfo = (chainId: number) => {
    const chain = chains.filter(chain => chain.id === chainId).shift()

    if (chain === undefined) {
        return { chain: { name: "-" }, logo: "" }
    }

    const logo = chain.name.toLowerCase().replace(" ", "-")

    return { chain, logo }
}
