import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050512] bg-opacity-90 z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <span className="text-lg font-semibold text-gray-300">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
