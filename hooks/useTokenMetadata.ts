import { useContractReads } from "wagmi"
import abi from "@/config/abi/IERC20Metadata"

export function useTokenMetadata(chainId: number, address: `0x${string}`) {
    return useContractReads({
        contracts: [
            {
                abi,
                address,
                chainId,
                functionName: "symbol",
            },
            {
                abi,
                address,
                chainId,
                functionName: "decimals",
            },
        ],
        select: (data) => ({
            symbol: data[0],
            decimals: data[1],
        }),
    })
}
