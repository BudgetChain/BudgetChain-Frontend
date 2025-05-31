'use client';

import { useState } from 'react';
import { TransactionStats } from './transaction-stats';
import { TransactionFilters } from './transaction-filters';
import { TransactionTable } from './transaction-table';
import { TransactionPagination } from './transaction-pagination';
import { useTransactions } from '@/app/hooks/use-transactions';

// Define the SortConfig type to match what TransactionTable expects
type SortConfig = {
  key: string | null;
  direction: 'asc' | 'desc';
};

export function TransactionDashboardSection() {
  const [filters, setFilters] = useState({
    dao: 'all',
    project: 'all',
    action: 'all',
    dateRange: null,
    status: 'all',
    search: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  // Fix the type definition to match the expected SortConfig type
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });

  const { transactions, stats, isLoading, isInitialLoading, error } =
    useTransactions(filters, currentPage, sortConfig);

  // Create a handler function that matches the expected type
  const handleSortChange = (config: SortConfig) => {
    setSortConfig(config);
  };

  return (
    <div className="min-h-screen bg-[#121218] text-white">
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <TransactionStats stats={stats} loading={isInitialLoading} />

        <TransactionFilters filters={filters} onFiltersChange={setFilters} />

        <TransactionTable
          transactions={transactions}
          loading={isInitialLoading}
          isProcessing={isLoading && !isInitialLoading}
          error={error}
          sortConfig={sortConfig}
          onSort={handleSortChange}
        />

        <TransactionPagination
          currentPage={currentPage}
          totalPages={Math.ceil((stats?.total || 0) / 10)}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
