'use client';
import React from 'react';

import WalletModal from '@/components/wallet/modal';

const walletPage: React.FC = () => {
  return (
    <div>
      <WalletModal isOpen={true} onClose={() => console.log('Modal closed')} />
    </div>
  );
};

export default walletPage;
