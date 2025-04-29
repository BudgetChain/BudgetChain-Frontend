const TransactionFilter: React.FC<{
    value: 'ALL' | 'SUCCESSFUL' | 'CANCELED';
    onChange: (value: 'ALL' | 'SUCCESSFUL' | 'CANCELED') => void;
  }> = ({ value, onChange }) => {
    return (
      <div className="flex items-center space-x-2 bg-[#28283A] rounded-md">
        <button
          onClick={() => onChange('ALL')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${value === 'ALL' ? 'bg-[#4F4AE6] text-white' : 'text-gray-400'
            }`}
        >
          All
        </button>
        <button
          onClick={() => onChange('SUCCESSFUL')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${value === 'SUCCESSFUL' ? 'bg-[#4F4AE6] text-white' : 'text-gray-400'
            }`}
        >
          Successful
        </button>
        <button
          onClick={() => onChange('CANCELED')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${value === 'CANCELED' ? 'bg-[#4F4AE6] text-white' : 'text-gray-400'
            }`}
        >
          Canceled
        </button>
      </div>
    );
  };

  export default TransactionFilter;