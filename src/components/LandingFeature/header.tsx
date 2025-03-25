"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/LandingFeature/mobileNav"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})

export function Header() {
  return (
    <header className={`${montserrat.variable} font-montserrat p-4 flex items-center justify-between bg-[#171720]`}>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="relative w-full max-w-80 bg-[#171720] text-white mt-4">
        <Input placeholder="Search" className="border-none placeholder-white pl-3 shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]" />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4"/>
      </div>
      <div className="flex items-center gap-2 mr-6 mt-4">
        <div className="hidden md:block px-20 py-1.5 rounded-md shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-white">ELI's DAO</span>
          </div>
        </div>
        <div className="text-sm text-white text-muted-foreground hidden md:block px-16 py-1.5 rounded-md shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]">
          0x1F32...hF4DSG
        </div>
      </div>
    </header>
  )
}
