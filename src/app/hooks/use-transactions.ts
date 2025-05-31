'use client';

import { useState, useEffect } from 'react';

type SortConfig = {
  key: string | null;
  direction: 'asc' | 'desc';
};

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

interface StatsData {
  total: number;
  canceled: number;
  successful: number;
}

// Mock data - replace with actual API calls
const mockTransactions: Transaction[] = [
  {
    id: '1',
    sn: 1,
    project: 'Fragma',
    currency: 'STRK',
    amount: '20,000 STRK',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '2',
    sn: 2,
    project: 'Fragma',
    currency: 'STRK',
    amount: '20,000 STRK',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'canceled',
  },
  {
    id: '3',
    sn: 3,
    project: 'Nulda',
    currency: 'STRK',
    amount: '2,000 STRK',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '4',
    sn: 4,
    project: 'Fragma',
    currency: 'USDC',
    amount: '$1,200',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '5',
    sn: 5,
    project: 'Nulda',
    currency: 'Fiat',
    amount: '$1,200',
    address: '0123*****',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '6',
    sn: 6,
    project: 'Starkz',
    currency: 'STRK',
    amount: '2,000 STRK $1,200',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'canceled',
  },
  {
    id: '7',
    sn: 7,
    project: 'Nulda',
    currency: 'Fiat',
    amount: '$1,200',
    address: '0256G*****',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '8',
    sn: 8,
    project: 'Fragma',
    currency: 'USDC',
    amount: '$1,200',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '9',
    sn: 9,
    project: 'Fragma',
    currency: 'STRK',
    amount: '$1,200',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '10',
    sn: 10,
    project: 'Nulda',
    currency: 'STRK',
    amount: '2,000 STRK',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '11',
    sn: 11,
    project: 'Nulda',
    currency: 'USDC',
    amount: '$1,200',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'successful',
  },
  {
    id: '12',
    sn: 12,
    project: 'Nulda',
    currency: 'USDC',
    amount: '$1,200',
    address: '0xeAc6...7CAF',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    dateTime: '5:54UTC',
    status: 'canceled',
  },
];

export function useTransactions(
  filters: any,
  currentPage: number,
  sortConfig: SortConfig
) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let filteredTransactions = [...mockTransactions];

        // Apply filters
        if (filters.search) {
          filteredTransactions = filteredTransactions.filter(
            (t) =>
              t.project.toLowerCase().includes(filters.search.toLowerCase()) ||
              t.currency.toLowerCase().includes(filters.search.toLowerCase()) ||
              t.address.toLowerCase().includes(filters.search.toLowerCase()) ||
              t.amount.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        if (filters.dao !== 'all' && filters.dao) {
          // In a real app, you'd filter by DAO ID
          filteredTransactions = filteredTransactions.filter((t) =>
            filters.dao === 'eth2'
              ? ['Fragma', 'Nulda'].includes(t.project)
              : t.project === 'Starkz'
          );
        }

        if (filters.project !== 'all' && filters.project) {
          filteredTransactions = filteredTransactions.filter(
            (t) => t.project.toLowerCase() === filters.project.toLowerCase()
          );
        }

        if (filters.status !== 'all' && filters.status) {
          filteredTransactions = filteredTransactions.filter(
            (t) => t.status === filters.status
          );
        }

        // Apply sorting
        if (sortConfig.key) {
          filteredTransactions.sort((a: any, b: any) => {
            const aValue = a[sortConfig.key as keyof Transaction];
            const bValue = b[sortConfig.key as keyof Transaction];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
          });
        }

        // Calculate stats
        const totalTransactions = filteredTransactions.length;
        const canceledTransactions = filteredTransactions.filter(
          (t) => t.status === 'canceled'
        ).length;
        const successfulTransactions = filteredTransactions.filter(
          (t) => t.status === 'successful'
        ).length;

        setStats({
          total: totalTransactions,
          canceled: canceledTransactions,
          successful: successfulTransactions,
        });

        // Apply pagination
        const startIndex = (currentPage - 1) * 10;
        const paginatedTransactions = filteredTransactions.slice(
          startIndex,
          startIndex + 10
        );

        setTransactions(paginatedTransactions);
      } catch (err) {
        setError('Failed to fetch transactions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filters, currentPage, sortConfig]);

  return { transactions, stats, loading, error };
}
