"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TransactionPagination({ currentPage, totalPages, onPageChange }: TransactionPaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-[#1E1E2A] border-[#2A2A3A] text-white hover:bg-[#2A2A3A] h-9 px-3"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={
            page === currentPage
              ? "bg-[#6C5DD3] hover:bg-[#6C5DD3]/90 text-white border-none h-9 px-4"
              : "bg-[#1E1E2A] border-[#2A2A3A] text-white hover:bg-[#2A2A3A] h-9 px-4"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-[#1E1E2A] border-[#2A2A3A] text-white hover:bg-[#2A2A3A] h-9 px-3"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
