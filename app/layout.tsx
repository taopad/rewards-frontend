import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Navbar } from "@/components/Navbar"
import { WalletProvider } from "@/components/WalletProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Taopad app",
    description: "Taopad app",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark mb-32`}>
                <WalletProvider>
                    <div className="flex flex-col gap-8">
                        <Navbar />
                        <div className="px-8 w-full lg:w-[48rem] mx-auto">
                            {children}
                        </div>
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
