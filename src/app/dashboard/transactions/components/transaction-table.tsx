import { FileX, Loader2 } from 'lucide-react';
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

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  isProcessing?: boolean;
  error: string | null;
}

export function TransactionTable({
  transactions,
  loading,
  isProcessing = false,
  error,
}: TransactionTableProps) {
  if (loading) {
    return (
      <div className="py-4 px-5">
        <div className="overflow-x-auto rounded-lg border border-[#747479]">
          <table className="min-w-full bg-gray-900 rounded-lg text-white text-sm border border-[#747479]">
            <thead>
              <tr className="bg-[#2B2B46] text-left">
                <th className="p-4">S/N</th>
                <th className="p-4">Projects</th>
                <th className="p-4">Currency</th>
                <th className="p-4">Amount Sent</th>
                <th className="p-4">Address/Account</th>
                <th className="p-4">Note</th>
                <th className="p-4">Date/time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="rounded-lg bg-[#171720]">
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="border-b border-[#747479]">
                  <td className="p-4">
                    <Skeleton className="h-4 w-6 sm:w-8 bg-[#2A2A3A]" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-12 sm:w-16 md:w-20 bg-[#2A2A3A]" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-10 sm:w-12 md:w-16 bg-[#2A2A3A]" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-14 sm:w-18 md:w-24 bg-[#2A2A3A]" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-16 sm:w-24 md:w-32 bg-[#2A2A3A]" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-16 sm:w-24 md:w-40 bg-[#2A2A3A]" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-12 sm:w-16 md:w-20 bg-[#2A2A3A]" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-12 sm:w-16 md:w-20 bg-[#2A2A3A]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 px-5">
        <Alert className="bg-red-900/20 border-red-800">
          <AlertDescription className="text-red-300">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-4 px-5">
      {isProcessing && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-[#2B2B46] rounded-full p-2 shadow-lg flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
            <span className="text-sm text-gray-300">Processing...</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[#747479]">
        <table className="min-w-full bg-gray-900 rounded-lg text-white text-sm border border-[#747479]">
          <thead>
            <tr className="bg-[#2B2B46] text-left">
              <th className="p-4">S/N</th>
              <th className="p-4">Projects</th>
              <th className="p-4">Currency</th>
              <th className="p-4">Amount Sent</th>
              <th className="p-4">Address/Account</th>
              <th className="p-4">Note</th>
              <th className="p-4">Date/time</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody className="rounded-lg bg-[#171720]">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-[#747479] hover:bg-[#747479]"
                >
                  <td className="p-4">{transaction.sn}</td>
                  <td className="p-4">{transaction.project}</td>
                  <td className="p-4 truncate max-w-[120px]">
                    {transaction.currency}
                  </td>
                  <td className="p-4">{transaction.amount}</td>
                  <td className="p-4">{transaction.address}</td>
                  <td className="p-4">{transaction.note}</td>
                  <td className="p-4">
                    <div>{transaction.dateTime}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        transaction.status === 'successful'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      ● {transaction.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-[#747479] hover:bg-[#747479]">
                <td colSpan={8} className="h-60 text-center p-4">
                  <div className="flex flex-col items-center justify-center py-10">
                    <FileX className="h-16 w-16 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300">
                      No transactions found
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
