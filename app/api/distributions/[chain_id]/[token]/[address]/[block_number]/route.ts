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
    const address = params.address
    const blockNumber = BigInt(params.block_number)

    if (isNaN(chainId)) {
        return Response.error()
    }

    if (!isAddress(token)) {
        return Response.error()
    }

    if (!isAddress(address)) {
        return Response.error()
    }

    const proofsResults = await prisma.distributions_proofs.findFirst({
        select: {
            amount: true,
            proofs: true,
        },
        where: {
            chain_id: { equals: chainId },
            token: { equals: token },
            block_number: { equals: blockNumber },
            address: { equals: address },
        },
    })

    return Response.json({
        amount: BigInt(proofsResults?.amount ?? 0n).toString(),
        proofs: (proofsResults?.proofs ?? []) as `0x${string}`[],
    })
}
