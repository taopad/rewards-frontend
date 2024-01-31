import DistributorAbi from "./abi/Distributor"

if (!process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS) throw Error("NEXT_PUBLIC_DISTRIBUTOR_ADDRESS env variable must be set")

export const DistributorContract = {
    abi: DistributorAbi,
    address: process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS as `0x${string}`,
}
