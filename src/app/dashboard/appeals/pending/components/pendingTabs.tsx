'use client';

import { useState } from 'react';
import PendingDocument from './document';
import AppealsAppeal from './appealsAppeal';

export default function PendingAppeals() {
  const [activeTab, setActiveTab] = useState('appeal');

  return (
    <div className="text-white bg-transparent max-w-7xl mx-auto p-4 sm:p-6 min-w-[300px] max-w-full">
      <div className="flex border-b border-gray-700 overflow-x-auto">
        <button
          className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm min-w-[100px] ${
            activeTab === 'appeal' ? 'border-b-2 border-purple-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('appeal')}
          role="tab"
          aria-selected={activeTab === 'appeal'}
        >
          Appeal
        </button>
        <button
          className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm min-w-[100px] ${
            activeTab === 'document' ? 'border-b-2 border-purple-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('document')}
          role="tab"
          aria-selected={activeTab === 'document'}
        >
          Document
        </button>
      </div>

      {activeTab === 'appeal' && (
        <div className="my-4 sm:my-6">
          <AppealsAppeal />
        </div>
      )}

      {activeTab === 'document' && <PendingDocument setActiveTabOne={setActiveTab} />}
    </div>
  );
}