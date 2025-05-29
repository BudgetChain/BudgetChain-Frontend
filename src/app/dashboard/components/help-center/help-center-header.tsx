"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/app/hooks/use-mobile"

interface HelpCenterHeaderProps {
  toggleSearch: () => void
}

export function HelpCenterHeader({ toggleSearch }: HelpCenterHeaderProps) {
  const isMobile = useIsMobile()

  return (
    <div className="z-10 bg-transparent border-r-3 pb-2 pt-4 border-radius: 0.125rem" >
      <div className="flex flex-col space-y-2 p-2 md:p-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Help Center</h1>
        <p className="text-sm md:text-base text-blue-200">
          Find answers to common questions or contact our support team.
        </p>
      </div>

      <div className="flex items-center justify-between px-2 md:px-4 mb-4">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Button
            variant="outline"
            role="combobox"
            onClick={toggleSearch}
            className="w-full justify-between pl-8 text-left bg-[#E5E7EB] border-[#1a365d] text-black hover:bg-[#94A3B8] "
          >
            <span className="truncate">{isMobile ? "Search..." : "Search help articles..."}</span>
            <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-indigo-900 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </div>
    </div>
  )
}
