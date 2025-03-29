'use client';

import { useState, useEffect } from 'react';
import { ConnectWalletModal } from './connect-wallet-modal';
import {
  useAccount as useWagmiAccount,
  useDisconnect as useWagmiDisconnect,
} from 'wagmi';
import {
  useAccount as useStarknetAccount,
  useDisconnect as useStarknetDisconnect,
} from '@starknet-react/core';
import { formatAddress } from '@/lib/formatAddress';

export default function WalletConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Ethereum wallet state
  const { address: ethAddress, isConnected: isEthereumConnected } =
    useWagmiAccount();
  const { disconnect: disconnectEthereum } = useWagmiDisconnect();

  // Starknet wallet state
  const { address: starknetAddress, isConnected: isStarknetConnected } =
    useStarknetAccount();
  const { disconnect: disconnectStarknet } = useStarknetDisconnect();

  // Set isClient to true after mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if any wallet is connected
  const isAnyWalletConnected = isEthereumConnected || isStarknetConnected;

  // Get the active address (prioritize Ethereum if both are connected)
  const activeAddress = ethAddress || starknetAddress;

  // Determine which chain is connected
  const connectedChain = isEthereumConnected
    ? 'Ethereum'
    : isStarknetConnected
      ? 'Starknet'
      : '';

  // Handle disconnect for both chains
  const handleDisconnect = () => {
    if (isEthereumConnected) disconnectEthereum();
    if (isStarknetConnected) disconnectStarknet();
  };

  // Listen for wallet disconnection event
  useEffect(() => {
    const handleWalletDisconnect = () => {
      // Force a re-render when wallet is disconnected externally
      setIsClient((prev) => !prev);
    };

    window.addEventListener('wallet_disconnected', handleWalletDisconnect);

    return () => {
      window.removeEventListener('wallet_disconnected', handleWalletDisconnect);
    };
  }, []);

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
      {isAnyWalletConnected && activeAddress ? (
        <div className="flex items-center bg-[#2a2a2a] rounded-lg py-1.5 px-3 transition-all duration-200 hover:bg-[#333]">
          <span className="text-white text-sm font-medium mr-2">
            {connectedChain && (
              <span className="bg-blue-500/20 text-blue-400 rounded px-1.5 py-0.5 mr-1.5 text-[10px]">
                {connectedChain}
              </span>
            )}
            {formatAddress(activeAddress)}
          </span>
          <button
            onClick={handleDisconnect}
            className="bg-transparent text-red-500 border border-red-500 rounded-md py-1 px-2 text-xs hover:bg-red-500/10 transition-colors duration-200"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4F4AE6] text-white rounded-lg py-2.5 px-4 text-sm font-semibold hover:bg-[#3A35D1] transition-all duration-200 hover:shadow-lg active:scale-95"
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
