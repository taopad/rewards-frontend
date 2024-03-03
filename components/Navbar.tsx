import Link from "next/link"
import { WalletButton } from "@/components/WalletButton"
import { NavbarLogo } from "./NavbarLogo"

export function Navbar() {
    return (
        <div className="flex container mx-auto py-4 justify-between items-center">
            <Link href="/" className="block w-40 lg:w-48">
                <NavbarLogo />
            </Link>
            <WalletButton />
        </div>
    )
}
