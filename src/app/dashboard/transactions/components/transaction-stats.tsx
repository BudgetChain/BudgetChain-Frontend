'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsData {
  total: number;
  canceled: number;
  successful: number;
}

interface TransactionStatsProps {
  stats: StatsData | null;
  loading: boolean;
}

export function TransactionStats({ stats, loading }: TransactionStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="bg-gradient-to-b from-[#894DBD] to-[#5E5EFF] border-none shadow-lg"
          >
            <CardContent className="p-8">
              <Skeleton className="h-4 w-32 mb-4 bg-purple-400/30" />
              <Skeleton className="h-8 w-16 bg-purple-400/30" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Transactions',
      value: stats?.total || 0,
      subtitle: 'All',
    },
    {
      title: 'Total Canceled',
      value: stats?.canceled || 0,
      subtitle: 'All',
    },
    {
      title: 'Total Successful',
      value: stats?.successful || 0,
      subtitle: 'All',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="bg-gradient-to-b from-[#894DBD] to-[#5E5EFF] border-none shadow-lg"
        >
          <CardContent className="p-8 md:py-10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white text-sm font-medium leading-relaxed">
                {stat.title}
              </h3>
              <span className="text-purple-200 text-xs">{stat.subtitle} ▾</span>
            </div>
            <p className="text-white text-3xl font-bold leading-tight">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
