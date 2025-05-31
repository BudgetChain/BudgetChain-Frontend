'use client';

import { ChevronUp, ChevronDown, FileX } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Transaction {
  id: string;
  sn: number;
  project: string;
  currency: string;
  amount: string;
  address: string;
  note: string;
  dateTime: string;
  status: 'successful' | 'canceled';
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  sortConfig: SortConfig;
  onSort: (config: SortConfig) => void;
}

export function TransactionTable({
  transactions,
  loading,
  error,
  sortConfig,
  onSort,
}: TransactionTableProps) {
  const handleSort = (key: string) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key, direction });
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const tableHeaders = [
    { key: 'sn', label: 'S/N' },
    { key: 'project', label: 'Project' },
    { key: 'currency', label: 'Currency' },
    { key: 'amount', label: 'Amount' },
    { key: 'address', label: 'Address/Account' },
    { key: 'note', label: 'Note' },
    { key: 'dateTime', label: 'Date/Time' },
    { key: 'status', label: 'Status' },
  ];

  if (loading) {
    return (
      <div className="bg-[#1E1E2A] rounded-lg overflow-hidden border border-[#42415B]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#42415B]">
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.key}
                  className="text-gray-300 font-medium h-16 px-6"
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i} className="border-[#42415B] h-16">
                {[...Array(8)].map((_, j) => (
                  <TableCell key={j} className="px-6 py-4">
                    <Skeleton className="h-4 w-full bg-[#2A2A3A]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-900/20 border-red-800">
        <AlertDescription className="text-red-300">{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-[#171720] rounded-lg overflow-hidden border border-[#42415B]">
      <Table>
        <TableHeader>
          <TableRow className="border-[#42415B] bg-[#2B2B46] hover:bg-[#2B2B46]">
            {tableHeaders.map((header) => (
              <TableHead
                key={header.key}
                className="text-gray-300 font-medium cursor-pointer hover:text-white transition-colors h-16 px-6"
                onClick={() => handleSort(header.key)}
              >
                <div className="flex items-center gap-1">
                  {header.label}
                  <SortIcon column={header.key} />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="border-[#42415B] hover:bg-[#2A2A3A]/50 h-16"
              >
                <TableCell className="text-gray-300 px-6 py-4">
                  {transaction.sn}
                </TableCell>
                <TableCell className="text-white px-6 py-4">
                  {transaction.project}
                </TableCell>
                <TableCell className="text-gray-300 px-6 py-4">
                  {transaction.currency}
                </TableCell>
                <TableCell className="text-white font-medium px-6 py-4">
                  {transaction.amount}
                </TableCell>
                <TableCell className="text-gray-300 font-mono text-sm px-6 py-4">
                  {transaction.address}
                </TableCell>
                <TableCell className="text-gray-400 max-w-48 truncate px-6 py-4">
                  {transaction.note}
                </TableCell>
                <TableCell className="text-gray-300 px-6 py-4">
                  {transaction.dateTime}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={
                      transaction.status === 'successful'
                        ? 'bg-[#10B981] hover:bg-[#10B981]/90 text-white border-none px-3 py-1'
                        : 'bg-[#EF4444] hover:bg-[#EF4444]/90 text-white border-none px-3 py-1'
                    }
                  >
                    {transaction.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="border-[#42415B]">
              <TableCell colSpan={8} className="h-60 text-center">
                <div className="flex flex-col items-center justify-center py-10">
                  <FileX className="h-16 w-16 text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-300">
                    No transactions found
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
