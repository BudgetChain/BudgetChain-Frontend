interface Transaction {
  id: number;
  date: string;
  time: string;
  amount: string;
  note: string;
  address: string;
  currency: string;
  status: 'APPROVED' | 'DECLINED';
}
const TransactionTable = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: '12/12/24',
      time: '8:00 UTC',
      amount: '20,000 STRK ($3,600)',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate lorem.',
      address: '12-12-2x',
      currency: '5.54/1 BTC',
      status: 'APPROVED',
    },
    {
      id: 2,
      date: '12/12/24',
      time: '8:01 UTC',
      amount: '20,000 STRK ($3,600)',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate lorem.',
      address: '12-12-2x',
      currency: '5.54/1 BTC',
      status: 'APPROVED',
    },
    {
      id: 3,
      date: '12/12/24',
      time: '8:00 UTC',
      amount: '20,000 STRK ($3,600)',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate lorem.',
      address: '12-12-2x',
      currency: '5.54/1 BTC',
      status: 'DECLINED',
    },
    {
      id: 4,
      date: '12/12/24',
      time: '8:00 UTC',
      amount: '20,000 STRK ($3,600)',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate lorem.',
      address: '12-12-2x',
      currency: '5.54/1 BTC',
      status: 'APPROVED',
    },
    {
      id: 5,
      date: '12/12/24',
      time: '8:00 UTC',
      amount: '20,000 STRK ($3,600)',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate lorem.',
      address: '12-12-2x',
      currency: '5.54/1 BTC',
      status: 'DECLINED',
    },
  ];

  const formatNoteText = (note: string) => {
    const words = note.split(' ');
    let result = [];

    for (let i = 0; i < words.length; i += 3) {
      const chunk = words.slice(i, i + 3).join(' ');
      result.push(chunk);
    }

    return result.join('\n');
  };

  return (
    <div className="rounded-md border border-gray-700 py-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 px-3">
        <h2 className="text-xl font-semibold">Nduka's Transactions</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">Filter by:</span>
          <select className="bg-gray-800 text-gray-300 text-sm rounded-md px-2 py-1 border border-gray-700">
            <option>First uploaded</option>
          </select>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800 bg-[#2B2B46]">
              <th className="py-3 text-left pl-4">S/N</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Time</th>
              <th className="py-3 text-left">Amount (Equivalent)</th>
              <th className="py-3 text-left">Note</th>
              <th className="py-3 text-left">Address</th>
              <th className="py-3 text-left">Currency</th>
              <th className="py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                <td className="py-4 pl-4">{transaction.id}</td>
                <td className="py-4">{transaction.date}</td>
                <td className="py-4">{transaction.time}</td>
                <td className="py-4">{transaction.amount}</td>
                <td className="py-4 max-w-xs text-gray-400">
                  {formatNoteText(transaction.note)
                    .split('\n')
                    .map((line, i) => (
                      <div key={i} className="leading-tight text-xs">
                        {line}
                      </div>
                    ))}
                </td>
                <td className="py-4">{transaction.address}</td>
                <td className="py-4">{transaction.currency}</td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'APPROVED'
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">#{transaction.id}</span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  transaction.status === 'APPROVED'
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}
              >
                {transaction.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Date</p>
                <p>{transaction.date}</p>
              </div>
              <div>
                <p className="text-gray-400">Time</p>
                <p>{transaction.time}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Amount</p>
                <p>{transaction.amount}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Note</p>
                <p className="text-gray-200">{transaction.note}</p>
              </div>
              <div>
                <p className="text-gray-400">Address</p>
                <p>{transaction.address}</p>
              </div>
              <div>
                <p className="text-gray-400">Currency</p>
                <p>{transaction.currency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TransactionTable;
