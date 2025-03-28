import React from "react";
import { FormatCurrency } from "./currencyFormatter"; // Import the currency formatter

// Define the type for a single transaction
interface Transaction {
  [key: string]: string | string[] | number | Date; // Supports strings, arrays, numbers, and dates
}

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  // Function to shorten Ethereum-like addresses (e.g., 0x1234...5678)
  const shortenAddress = (address: string): string => {
    return address.length > 10 ? `${address.slice(0, 6)}....${address.slice(-4)}` : address;
  };

  // Function to truncate long notes
  const truncateNote = (note: string, length: number = 20): string => {
    return note.length > length ? `${note.slice(0, length)}...` : note;
  };

  // Function to format a value for rendering
  const formatValue = (key: string, value: string | string[] | number | Date): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-col">
          {value.map((item, idx) => (
            <span className="text-[#848484]" key={idx}>
              {item}
            </span>
          ))}
        </div>
      );
    }

    if (key === "Address" && typeof value === "string") {
      return shortenAddress(value);
    }

    if (key === "Note" && typeof value === "string") {
      return truncateNote(value);
    }

    if (key === "Amount" && typeof value === "number") {
      return FormatCurrency(value, "USD");
    }

    if (key === "Date" && value instanceof Date) {
      return value.toLocaleDateString(); // Format date for the "Date" field
    }

    return value instanceof Date ? value.toLocaleDateString() : value; // Default case for strings and numbers
  };

  return (
    <tr className="border-b-[0.2px] border-[#42415B] h-[50px]">
      {Object.entries(transaction).map(([key, value], index) => (
        <td
          key={index}
          className={`text-start truncate font-thin max-w-[174px] pl-[20px] text-[14px] 
            ${key === "Note" ? "italic" : ""}`}
        >
          {key === "Status" ? (
            <div className="flex items-center gap-2">
              <span
                className={`w-[9px] h-[9px] rounded-full ${
                  value === "SUCCESSFUL" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span
                className={`${
                  value === "SUCCESSFUL" ? "text-[#00B759]" : "text-[#E20008]"
                }`}
              >
                {value instanceof Date ? value.toLocaleDateString() : value}
              </span>
            </div>
          ) : (
            formatValue(key, value)
          )}
        </td>
      ))}
    </tr>
  );
};

export default TransactionRow;
