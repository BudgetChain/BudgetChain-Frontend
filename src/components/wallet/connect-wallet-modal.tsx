'use client';

import { useState, useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';
import Image from 'next/image';
import { X } from 'lucide-react';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  connectorId: string;
  walletConnectId?: string;
}

export function ConnectWalletModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { connect, connectors, error, isPending } = useConnect();
  const { isConnected } = useAccount();
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(
    null
  );

  // Wallet options configuration
  const walletOptions: WalletOption[] = [
    {
      id: 'metaMask',
      name: 'MetaMask',
      icon: '/wallet-icons/metamask.svg',
      connectorId: 'metaMask',
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      icon: '/wallet-icons/coinbase.svg',
      connectorId: 'coinbaseWallet',
    },
    {
      id: 'walletConnect',
      name: 'WalletConnect',
      icon: '/wallet-icons/walletconnect.svg',
      connectorId: 'walletConnect',
    },
    {
      id: 'argent',
      name: 'Argent',
      icon: '/wallet-icons/argent.svg',
      connectorId: 'walletConnect',
      walletConnectId: 'argent',
    },
    {
      id: 'bybit',
      name: 'BYBIT',
      icon: '/wallet-icons/bybit.svg',
      connectorId: 'walletConnect',
      walletConnectId: 'bybit',
    },
    {
      id: 'binance',
      name: 'Binance',
      icon: '/wallet-icons/binance.svg',
      connectorId: 'injected',
    },
  ];

  // Close modal when connected
  useEffect(() => {
    if (isConnected) onClose();
  }, [isConnected, onClose]);

  // Close modal with ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleConnectWallet = () => {
    if (!selectedWallet) return;

    const connector = connectors.find(
      (c) => c.id === selectedWallet.connectorId
    );
    if (connector) {
      connect({ connector });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className="bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-[480px] relative animate-[fadeIn_0.3s_ease-out] shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-modal-title"
      >
        <button
          className="absolute top-4 left-4 bg-transparent border-none text-gray-400 hover:text-white hover:bg-white/10 p-1 rounded-full flex items-center justify-center transition-all duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2
          id="wallet-modal-title"
          className="text-center text-white text-2xl font-semibold my-2 mb-6"
        >
          Connect Wallet
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {walletOptions.map((wallet) => {
            const isAvailable = connectors.some((c) => {
              if (c.id === 'io.metamask') return window.ethereum?.isMetaMask;
              if (c.id === 'com.coinbase.wallet')
                return window.ethereum?.isCoinbaseWallet;
              if (c.id === 'binance') return window.BinanceChain;
              return true; // For WalletConnect
            });
            const isSelected = selectedWallet?.id === wallet.id;

            return (
              <button
                key={wallet.id}
                className={`flex flex-col items-center justify-center bg-[#2a2a2a] border-2 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-transparent'
                } rounded-xl p-4 transition-all duration-200 ${
                  !isAvailable
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#333] hover:-translate-y-0.5 cursor-pointer'
                }`}
                onClick={() => isAvailable && setSelectedWallet(wallet)}
                disabled={!isAvailable}
                aria-pressed={isSelected}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 rounded-lg bg-[#333] p-2">
                  <Image
                    src={wallet.icon}
                    alt={`${wallet.name} logo`}
                    width={40}
                    height={40}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <span className="text-white text-sm font-medium text-center">
                  {wallet.name}
                  {wallet.walletConnectId && (
                    <span className="block text-xs text-gray-400 mt-1">
                      via WalletConnect
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4 p-2 bg-red-500/10 rounded-lg text-sm">
            {error.message}
          </div>
        )}

        <button
          className={`w-full bg-blue-500 text-white rounded-lg py-3.5 px-4 text-base font-semibold flex items-center justify-center ${
            !selectedWallet || isPending
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-blue-600'
          }`}
          onClick={handleConnectWallet}
          disabled={!selectedWallet || isPending}
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white/30 rounded-full border-t-white animate-spin mr-2"></span>
          ) : null}
          CONNECT WALLET
        </button>
      </div>
    </div>
  );
}
