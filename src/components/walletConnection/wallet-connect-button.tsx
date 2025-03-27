'use client';

import { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectWalletModal } from './connect-wallet-modal';

export default function WalletConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatAddress = (addr: string | undefined) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  // Return a consistent UI during server-side rendering to avoid hydration issues
  if (!isClient) {
    return (
      <button className="bg-blue-500 text-white rounded-lg py-2.5 px-4 text-sm font-semibold hover:bg-blue-600">
        Connect Wallet
      </button>
    );
  }

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
