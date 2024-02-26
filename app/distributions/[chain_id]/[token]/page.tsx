import { DistributionDetails } from "@/components/DistributionDetails"

export default function Page({ params }: { params: { chain_id: string, token: `0x${string}` } }) {
    return (
        <main>
            <DistributionDetails chainId={Number(params.chain_id)} token={params.token} />
        </main>
    )
}
