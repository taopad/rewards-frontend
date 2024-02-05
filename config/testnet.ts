import { Chain } from "viem";

export const testnet = {
    id: 14439,
    name: "TaoPad testnet",
    network: "testnet",
    nativeCurrency: { name: "BB ETH", symbol: "BBETH", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://rpc.buildbear.io/official-domino-40fda970"],
        },
        public: {
            http: ["https://rpc.buildbear.io/official-domino-40fda970"],
        },
    },
    blockExplorers: {
        etherscan: { name: "Buildbear scan", url: "https://explorer.buildbear.io/official-domino-40fda970" },
        default: { name: "Buildbear scan", url: "https://explorer.buildbear.io/official-domino-40fda970" },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 14353601,
        },
    },
} as const satisfies Chain
