import prisma from "@/db"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    const distributions = []

    const results = await prisma.distributions.groupBy({
        by: ['chain_id', 'token'],
        _max: {
            block_number: true
        },
        orderBy: {
            _max: {
                block_number: "desc",
            },
        },
    })

    for (const { chain_id, token, _max: { block_number } } of results) {
        const result = await prisma.distributions.findFirst({
            select: {
                root: true,
            },
            where: {
                chain_id: { equals: chain_id },
                token: { equals: token, mode: "insensitive" },
                block_number: { equals: block_number ?? 0n },
            },
        })

        const root = result?.root

        if (root === undefined) {
            throw new Error("malformated distributions")
        }

        distributions.push({
            chainId: chain_id,
            token: token as `0x${string}`,
            blockNumber: (block_number ?? 0n).toString(),
            root: root as `0x${string}`,
        })
    }

    return Response.json(distributions)
}
