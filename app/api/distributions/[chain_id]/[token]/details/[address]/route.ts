import prisma from "@/db"

export const dynamic = "force-dynamic"

type Params = {
    chain_id: string
    token: string
    address: string
}

type Distribution = {
    block_number: bigint
    total_shares: string
    total_rewards: string
}

const match = (block_number: bigint, distributions: Distribution[]) => {
    const distribution = distributions.find(distribution => distribution.block_number === block_number)

    if (distribution === undefined) {
        throw new Error()
    }

    return distribution
}

export async function GET(request: Request, { params }: { params: Params }) {
    const chainId = parseInt(params.chain_id)
    const token = params.token
    const address = params.address

    const distributions = await prisma.distributions.findMany({
        select: {
            block_number: true,
            total_shares: true,
            total_rewards: true,
        },
        where: {
            chain_id: { equals: chainId },
            token: { equals: token },
        },
        orderBy: { block_number: "desc" },
    })

    const proofs = await prisma.distributions_proofs.findMany({
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

    return Response.json(proofs.map(({ block_number, balance, amount }) => {
        const { total_shares, total_rewards } = match(block_number, distributions)

        return {
            chain_id: chainId,
            token,
            block_number: block_number.toString(),
            balance,
            amount,
            total_shares,
            total_rewards,
        }
    }))
}
