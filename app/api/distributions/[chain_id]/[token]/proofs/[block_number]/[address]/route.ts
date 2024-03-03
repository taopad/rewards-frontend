import prisma from "@/db"
import { isAddress } from "viem"

type Params = {
    chain_id: string
    token: string
    block_number: string
    address: string
}

export async function GET(request: Request, { params }: { params: Params }) {
    const chainId = parseInt(params.chain_id)
    const token = params.token
    const blockNumber = BigInt(params.block_number)
    const address = params.address

    if (isNaN(chainId)) {
        return Response.error()
    }

    if (!isAddress(token)) {
        return Response.error()
    }

    if (!isAddress(address)) {
        return Response.error()
    }

    const result = await prisma.distributions_proofs.findFirst({
        select: {
            amount: true,
            proof: true,
        },
        where: {
            chain_id: { equals: chainId },
            token: { equals: token, mode: "insensitive" },
            block_number: { equals: blockNumber },
            address: { equals: address, mode: "insensitive" },
        },
    })

    return Response.json({
        amount: BigInt(result?.amount ?? 0n).toString(),
        proof: (result?.proof ?? []) as `0x${string}`[],
    })
}
