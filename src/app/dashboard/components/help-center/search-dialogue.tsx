"use client"

import { Book, HelpCircle, Wrench } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  setActiveTab: (tab: string) => void
  trackArticleView: (articleId: string) => void
}

export function SearchDialog({ open, setOpen, setActiveTab, trackArticleView }: SearchDialogProps) {
  return (
    <div className="bg-[#0a192f]">
      <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search help articles..."
        className="bg-[#0f2547] text-white border-[#1a365d] text-sm"
      />
      <CommandList className="bg-[#0f2547] text-white">
        <CommandEmpty className="text-xs md:text-sm">No results found.</CommandEmpty>
        <CommandGroup heading="FAQs">
          <CommandItem
            onSelect={() => {
              setOpen(false)
              setActiveTab("faqs")
              trackArticleView("faq-1")
            }}
            className="text-xs md:text-sm"
          >
            <HelpCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span>How do I change my password?</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              setActiveTab("faqs")
              trackArticleView("faq-2")
            }}
            className="text-xs md:text-sm"
          >
            <HelpCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span>How do I update my billing information?</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              setActiveTab("faqs")
              trackArticleView("faq-5")
            }}
            className="text-xs md:text-sm"
          >
            <HelpCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span>How do I invite team members?</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Guides">
          <CommandItem
            onSelect={() => {
              setOpen(false)
              setActiveTab("guides")
              trackArticleView("guide-1")
            }}
            className="text-xs md:text-sm"
          >
            <Book className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span>Getting Started Guide</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              setActiveTab("guides")
              trackArticleView("guide-2")
            }}
            className="text-xs md:text-sm"
          >
            <Book className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span>Advanced Features</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Troubleshooting">
          <CommandItem
            onSelect={() => {
              setOpen(false)
              setActiveTab("troubleshooting")
              trackArticleView("troubleshoot-1")
            }}
            className="text-xs md:text-sm"
          >
            <Wrench className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span>Login Issues</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              setActiveTab("troubleshooting")
              trackArticleView("troubleshoot-2")
            }}
            className="text-xs md:text-sm"
          >
            <Wrench className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span>Performance Issues</span>
          </CommandItem>
        </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
    
  )
}
