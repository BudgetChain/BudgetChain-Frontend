import React from "react";
import TransactionRow from "./tableRow";

interface Transaction {
  [key: string]: any;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  sortedTransactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  sortedTransactions,
}) => {
  if (transactions.length === 0) {
    return <p className="text-[#848484] text-center">No transactions available</p>;
  }

  return (
    <table className="w-full text-[14px] overflow-hidden text-[#848484]">
      <thead className="text-[#EBEBEB] text-[14px] h-[45px] bg-[#2B2B46]">
        <tr className="text-start">
          {Object.keys(transactions[0]).map((key, index) => (
            <th key={index} className="text-start font-light max-w-[174px] pl-[20px]">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="overflow-y-scroll h-[600px]">
        {sortedTransactions.map((transaction, index) => (
          <TransactionRow key={index} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
