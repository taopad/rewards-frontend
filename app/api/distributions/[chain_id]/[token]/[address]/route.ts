import prisma from "@/db"

type Params = {
    chain_id: string
    token: string
    address: string
}

export async function GET(request: Request, { params }: { params: Params }) {
    const distributions = []

    const chainId = parseInt(params.chain_id)
    const token = params.token
    const address = params.address

    const results = await prisma.distributions.findMany({
        select: {
            block_number: true,
        },
        where: {
            chain_id: { equals: chainId },
            token: { equals: token },
        },
        orderBy: { block_number: "desc" },
    })

    for (const distribution of results) {
        const result1 = await prisma.snapshots.findFirst({
            select: {
                balance: true,
            },
            where: {
                block_number: { equals: distribution.block_number },
                address: { equals: address },
            },
        })

        const result2 = await prisma.distributions_proofs.findFirst({
            select: {
                amount: true,
            },
            where: {
                chain_id: { equals: chainId },
                token: { equals: token },
                block_number: { equals: distribution.block_number },
                address: { equals: address },
            },
        })

        distributions.push({
            chain_id: chainId,
            token: token,
            block_number: Number(distribution.block_number),
            balance: result1?.balance ?? "0",
            rewards: result2?.amount ?? "0",
        })
    }

    return Response.json(distributions)
}
