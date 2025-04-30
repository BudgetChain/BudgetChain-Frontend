"use client"

import { Book, HelpCircle, Ticket, Wrench } from "lucide-react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/app/hooks/use-mobile"

interface TabsNavigationProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function TabsNavigation({ }: TabsNavigationProps) {
  const isMobile = useIsMobile()

  // Hide on mobile since we're using bottom navigation
  if (isMobile) {
    return null
  }

  return (
    <div className="px-2 md:px-4 sticky top-[120px] z-10 bg-transparent border-[#1a365d]">
      <TabsList className="grid grid-cols-4 w-full bg-transparent border-[#1a365d]">
        <TabsTrigger value="faqs" className="flex items-center justify-center gap-1 md:gap-2 px-1 md:px-3 py-2">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">FAQs</span>
        </TabsTrigger>
        <TabsTrigger value="guides" className="flex items-center justify-center gap-1 md:gap-2 px-1 md:px-3 py-2">
          <Book className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Guides</span>
        </TabsTrigger>
        <TabsTrigger
          value="troubleshooting"
          className="flex items-center justify-center gap-1 md:gap-2 px-1 md:px-3 py-2"
        >
          <Wrench className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Troubleshooting</span>
        </TabsTrigger>
        <TabsTrigger value="support" className="flex items-center justify-center gap-1 md:gap-2 px-1 md:px-3 py-2">
          <Ticket className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Support</span>
        </TabsTrigger>
      </TabsList>
    </div>
  )
}
