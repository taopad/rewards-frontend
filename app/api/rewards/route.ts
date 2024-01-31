import prisma from "@/db"

export async function GET(request: Request) {
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

    return Response.json(results.map(result => ({
        chainId: result.chain_id,
        token: result.token as `0x${string}`,
        blockNumber: (result._max.block_number ?? 0n).toString(),
    })))
}
