import prisma from "@/db"

type Params = {
    chain_id: string
    token: string
    address: string
}

export async function GET(request: Request, { params }: { params: Params }) {
    const chainId = parseInt(params.chain_id)
    const token = params.token
    const address = params.address

    const results = await prisma.distributions_proofs.findMany({
        select: {
            block_number: true,
            balance: true,
            amount: true,
        },
        where: {
            chain_id: { equals: chainId },
            token: { equals: token },
            address: { equals: address },
        },
        orderBy: { block_number: "desc" },
    })

    return Response.json(results.map(r => ({
        chain_id: chainId,
        token: token,
        block_number: r.block_number.toString(),
        balance: r.balance,
        amount: r.amount,
    })))
}
