"use client"

import Image from "next/image"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

export function NavbarLogo() {
    return (
        <AspectRatio ratio={16 / 7}>
            <Image src="/TaoPadLogo.png" alt="TaoPad" fill className="object-contain" />
        </AspectRatio>
    )
}
