import { formatUnits } from "viem"

export const formatAmount = (amount: bigint, decimals: number) => {
    return parseFloat(formatUnits(amount, decimals)).toLocaleString("en-US", {
        maximumFractionDigits: 5,
    })
}
