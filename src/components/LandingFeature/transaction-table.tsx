'use client';

import { useState, useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
});

const transactions = [
  {
    id: '1',
    project: 'Nidus',
    currency: 'STARK',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '2',
    project: 'Nidus',
    currency: 'STARK',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '3',
    project: 'Fragma',
    currency: 'USDC',
    amount: '30,000',
    address: '0x3E45...2D7AC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '19/02/2025 09:00 AM UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: '4',
    project: 'Nidus',
    currency: 'STARK',
    amount: '25,000',
    address: '0x7B92...1E8FD',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '19/02/2025 02:00 PM UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: '5',
    project: 'Nidus',
    currency: 'STARK',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '6',
    project: 'Nidus',
    currency: 'STARK',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '7',
    project: 'Nidus',
    currency: 'USDC',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '8',
    project: 'Nidus',
    currency: 'STARK',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '9',
    project: 'Nidus',
    currency: 'USDC',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '10',
    project: 'Nidus',
    currency: 'USDC',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '11',
    project: 'Nidus',
    currency: 'USDC',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '12',
    project: 'Nidus',
    currency: 'USDC',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '13',
    project: 'Nidus',
    currency: 'STARK',
    amount: '15,000',
    address: '0x8A71...9F3BC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '18/02/2025 11:30 AM UTC',
    status: 'CANCELLED',
  },
  {
    id: '14',
    project: 'Fragma',
    currency: 'USDC',
    amount: '30,000',
    address: '0x3E45...2D7AC',
    note: 'Gorem ipsum dolor sit amet, consectetur....',
    date: '19/02/2025 09:00 AM UTC',
    status: 'SUCCESSFUL',
  },
];

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const CURRENCY = 'starknet';
const VS_CURRENCY = 'usd';

export function useStarkPrice(interval = 10000) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`${COINGECKO_API_URL}?ids=${CURRENCY}&vs_currencies=${VS_CURRENCY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch price');
        }
        const data = await response.json();
        setPrice(data[CURRENCY][VS_CURRENCY]);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchPrice();
    const intervalId = setInterval(fetchPrice, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return { price, loading, error };
}

type Transaction = (typeof transactions)[0];

export function TransactionsTable() {
  const { price, loading, error } = useStarkPrice();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'id',
      header: 'S/N',
      cell: ({ row }) => <div className='font-montserrat font-light text-[14px] leading-[100%] tracking-[0%]'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'project',
      header: 'Projects',
      cell: ({ row }) => <div className='font-montserrat font-light text-[14px] leading-[100%] tracking-[0%]'>{row.getValue('project')}</div>,
    },
    {
      accessorKey: 'currency',
      header: 'Currency',
      cell: ({ row }) => <div className='font-montserrat font-light text-[14px] leading-[100%] tracking-[0%]'>{row.getValue('currency')}</div>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount Sent',
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number;
        const currency = row.getValue('currency') as string;
    
        return (
          <div className='flex flex-col'>
            {amount} {currency?.toLowerCase() === 'stark' ? 'STARK' : ''}
            {currency?.toLowerCase() === 'stark' && price !== null && !loading && !error && (
              <div className='text-[#848484] text-sm font-light'> ${(amount * price).toFixed(2)}</div>
            )}
          </div>
        );
      },
    },    
    {
      accessorKey: 'address',
      header: 'Address/Account',
      cell: ({ row }) => (
        <div className='font-montserrat font-light text-[14px] leading-[100%] tracking-[0%]'>{row.getValue('address')}</div>
      ),
    },
    {
      accessorKey: 'note',
      header: 'Note',
      cell: ({ row }) => (
        <div className='font-montserrat font-light text-[14px] leading-[100%] tracking-[0%]'>{row.getValue('note')}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date/Time',
      cell: ({ row }) => <div className='font-montserrat font-light text-[14px] leading-[100%] tracking-[0%]'>{row.getValue('date')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div
            className={`flex items-center gap-2 ${
              status === 'SUCCESSFUL'
                ? 'text-green-500'
                : status === 'CANCELLED'
                  ? 'text-red-500'
                  : 'text-yellow-500'
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                status === 'SUCCESSFUL'
                  ? 'bg-green-500'
                  : status === 'CANCELLED'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
              }`}
            ></div>
            {status}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className={montserrat.variable + " bg-[#171720] shadow-md border-none"}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <CardTitle className="text-sm font-montserrat font-semibold text-white">
            All Transactions
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="h-7 text-xs bg-[#171720] border border-[#42415B] text-[#848484] font-thin ml-6"
              >
                ALL Projects <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Projects</DropdownMenuItem>
              <DropdownMenuItem>Fragma</DropdownMenuItem>
              <DropdownMenuItem>Nidus</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-0">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 text-xs bg-[#171720] border-none text-[#FFFFFF] font-thin"
          >
            Filter by:
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-xs font-thin bg-[#171720] border-[#42415B] text-[#848484]"
              >
                Date Added <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest to Oldest</DropdownMenuItem>
              <DropdownMenuItem>Oldest to Newest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#2B2B46] text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-none text-[#ffffff]">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}