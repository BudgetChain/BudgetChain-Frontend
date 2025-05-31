
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface FilterState {
  dao: string
  project: string
  action: string
  dateRange: any
  status: string
  search: string
}

interface TransactionFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function TransactionFilters({ filters, onFiltersChange }: TransactionFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const selectTriggerClass =
    "bg-[#1E1E2A] border-[#2A2A3A] text-white hover:bg-[#2A2A3A] focus:ring-purple-500 focus:ring-opacity-50"
  const selectContentClass = "bg-[#1E1E2A] border-[#2A2A3A] text-white"

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={filters.dao} onValueChange={(value) => updateFilter("dao", value)}>
          <SelectTrigger className={cn("w-32 h-9", selectTriggerClass)}>
            <SelectValue placeholder="All DAOs" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">All DAOs</SelectItem>
            <SelectItem value="eth2">Eth2 DAO</SelectItem>
            <SelectItem value="defi">DeFi DAO</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.project} onValueChange={(value) => updateFilter("project", value)}>
          <SelectTrigger className={cn("w-36 h-9", selectTriggerClass)}>
            <SelectValue placeholder="All Project" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">All Project</SelectItem>
            <SelectItem value="fragma">Fragma</SelectItem>
            <SelectItem value="nulda">Nulda</SelectItem>
            <SelectItem value="starkz">Starkz</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm">Filter by:</span>
        <Select value={filters.action} onValueChange={(value) => updateFilter("action", value)}>
          <SelectTrigger className={cn("w-36 h-9", selectTriggerClass)}>
            <SelectValue placeholder="One Action" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="one">One Action</SelectItem>
            <SelectItem value="multiple">Multiple Actions</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
