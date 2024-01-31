import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { WalletProvider } from "@/components/WalletProvider"
import { ReactQueryProvider } from "@/components/ReactQueryProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Taopad app",
    description: "Taopad app",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <WalletProvider>
                    <ReactQueryProvider>
                        <div className="flex flex-col gap-8 w-96 container mx-auto lg:w-[48rem]">
                            <div className="flex-grow-0">
                                <ConnectButton />
                            </div>
                            {children}
                        </div>
                    </ReactQueryProvider>
                </WalletProvider>
            </body>
        </html>
    )
}
