import { formatUnits } from "viem"

export const formatAmount = (amount: bigint, decimals: number, max: number = 5) => {
    return parseFloat(formatUnits(amount, decimals)).toLocaleString("en-US", {
        maximumFractionDigits: max,
    })
}
