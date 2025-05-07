"use client"

import { Book, HelpCircle, Ticket, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f2547] border-t border-[#1a365d] md:hidden z-10">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => onTabChange("faqs")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs transition-colors bg- blue-400",
            activeTab === "faqs" ? "text-blue-400" : "text-blue-300",
          )}
          aria-label="FAQs"
        >
          <HelpCircle className="h-5 w-5 mb-1" />
          <span>FAQs</span>
        </button>
        <button
          onClick={() => onTabChange("guides")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
            activeTab === "guides" ? "text-blue-400" : "text-blue-300",
          )}
          aria-label="Guides"
        >
          <Book className="h-5 w-5 mb-1" />
          <span>Guides</span>
        </button>
        <button
          onClick={() => onTabChange("troubleshooting")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs transition-colors ",
            activeTab === "troubleshooting" ? "text-blue-400" : "text-blue-300",
          )}
          aria-label="Troubleshooting"
        >
          <Wrench className="h-5 w-5 mb-1" />
          <span>Help</span>
        </button>
        <button
          onClick={() => onTabChange("support")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
            activeTab === "support" ? "text-blue-400" : "text-blue-300",
          )}
          aria-label="Support"
        >
          <Ticket className="h-5 w-5 mb-1" />
          <span>Support</span>
        </button>
      </div>
    </div>
  )
}
