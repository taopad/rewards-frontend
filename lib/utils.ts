import { formatUnits } from "viem"
import { config } from "@/config/wallet"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAmount = (amount: bigint, decimals: number, max: number = 5) => {
  return parseFloat(formatUnits(amount, decimals)).toLocaleString("en-US", {
    maximumFractionDigits: max,
    useGrouping: false,
  })
}

export const selectChainInfo = (chainId: number) => {
  const chain = config.chains.filter(chain => chain.id === chainId).shift()

  if (chain === undefined) {
    return { chain: { name: "-" }, logo: "" }
  }

  const logo = chain.name.toLowerCase().replace(" ", "-")

  return { chain, logo }
}
