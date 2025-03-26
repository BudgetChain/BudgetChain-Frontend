'use client';

import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectWalletModal } from './connect-wallet-modal';

export default function WalletConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <>
      {isConnected && address ? (
        <div className="flex items-center bg-[#2a2a2a] rounded-lg py-1.5 px-3">
          <span className="text-white text-sm font-medium mr-2">
            {formatAddress(address)}
          </span>
          <button
            onClick={() => disconnect()}
            className="bg-transparent text-red-500 border border-red-500 rounded-md py-1 px-2 text-xs hover:bg-red-500/10"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white rounded-lg py-2.5 px-4 text-sm font-semibold hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}

      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
