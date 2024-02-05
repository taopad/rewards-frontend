export type DistributionUnitState = "loading" | "pending" | "claimable"

export type DistributionUnit = {
    chainId: number
    token: `0x${string}`
    blockNumber: bigint
    root: `0x${string}`
}

export type ProofParams = {
    root: `0x${string}`
    amount: bigint
    proof: `0x${string}`[]
}

export type DistributionDetails = {
    chainId: number
    token: `0x${string}`
    blockNumber: bigint
    balance: bigint
    amount: bigint
}
