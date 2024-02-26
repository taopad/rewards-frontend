import { erc20Abi as abi } from "viem"
import { useReadContracts } from "wagmi"

export function useTokenMetadata(chainId: number, address: `0x${string}`) {
    return useReadContracts({
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
        allowFailure: false,
        query: {
            select: ([symbol, decimals]) => ({ symbol, decimals }),
        },
    })
}
