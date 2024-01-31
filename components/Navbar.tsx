import Link from "next/link"
import Image from "next/image"
import { WalletButton } from "@/components/WalletButton"

export function Navbar() {
    return (
        <div className="container mx-auto py-4 flex justify-between items-center">
            <div>
                <Link href="/" className="block relative w-32 h-16 lg:w-48">
                    <Image src="/TaoPadLogo.png" alt="TaoPad" fill sizes="1" style={{ objectFit: "contain" }} />
                </Link>
            </div>
            <WalletButton />
        </div>
    )
}
