import { useState } from 'react';
import PendingDocument from './document';
import AppealsAppeal from './appealsAppeal';

export default function PendingAppeals() {
  const [activeTab, setActiveTab] = useState('appeal');

  return (
    <div className=" text-white scrollbar-hide bg-transparent max-w-6xl mx-auto px-4 py-4">
      <div className="flex border-b border-gray-700 w-fit">
        <button
          className={`flex items-center gap-2 px-6 py-2 text-sm ${
            activeTab === 'appeal'
              ? 'border-b-2 border-purple-500'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('appeal')}
        >
          Appeal{' '}
    
        </button>
        <button
          className={`px-4 py-2 text-sm ${
            activeTab === 'document'
              ? 'border-b-2 border-purple-500'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('document')}
        >
          Document
        </button>
      </div>

      {activeTab === 'appeal' && (
        <div className="my-4">
            <AppealsAppeal  />
     
        </div>
      )}

      {activeTab == 'document'  && <PendingDocument setActiveTabOne={setActiveTab} /> }
    </div>
  );
}
