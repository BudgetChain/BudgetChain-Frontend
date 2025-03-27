'use client';

import { useState, useEffect } from 'react';
import {
  useConnect as useWagmiConnect,
  useAccount as useWagmiAccount,
} from 'wagmi';
import {
  useConnect as useStarknetConnect,
  useAccount as useStarknetAccount,
} from '@starknet-react/core';
import Image from 'next/image';
import { isBinanceWalletAvailable } from '@/lib/wagmi';
import { WalletOption } from '@/types/types';

export function WalletSelection({ onClose }: { onClose: () => void }) {
  // Ethereum wallet connections
  const {
    connect: connectEthereum,
    connectors: ethereumConnectors,
    error: ethereumError,
    isPending: isEthereumPending,
  } = useWagmiConnect();
  const { isConnected: isEthereumConnected } = useWagmiAccount();

  // Starknet wallet connections
  const {
    connect: connectStarknet,
    connectors: starknetConnectors,
    error: starknetError,
    isPending: isStarknetPending,
  } = useStarknetConnect();
  const { isConnected: isStarknetConnected } = useStarknetAccount();

  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<'ethereum' | 'starknet'>(
    'ethereum'
  );
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Log available connectors for debugging
  useEffect(() => {
    if (ethereumConnectors.length > 0) {
      console.log(
        'Available Ethereum connectors:',
        ethereumConnectors.map((c) => ({
          id: c.id,
          name: c.name,
          ready: c.ready,
        }))
      );
    }

    if (typeof window !== 'undefined') {
      console.log('Ethereum available:', !!window.ethereum);
      console.log('Binance wallet detected:', isBinanceWalletAvailable());
      if (window.ethereum?.providers) {
        console.log('Ethereum providers:', window.ethereum.providers);
      }
    }
  }, [ethereumConnectors]);

  // Close modal when connected
  useEffect(() => {
    if (isEthereumConnected || isStarknetConnected) onClose();
  }, [isEthereumConnected, isStarknetConnected, onClose]);

  // Reset selected wallet when changing tabs
  useEffect(() => {
    setSelectedWallet(null);
    setConnectionError(null);
  }, [activeTab]);

  // Clear error when selecting a wallet
  useEffect(() => {
    setConnectionError(null);
  }, [selectedWallet]);

  // Reset error when ethereum error changes
  useEffect(() => {
    if (ethereumError) {
      setConnectionError(ethereumError.message);
    }
  }, [ethereumError]);

  const getEthereumWalletOptions = (): WalletOption[] => {
    const options: WalletOption[] = [];
    const addedIds = new Set<string>();

    ethereumConnectors.forEach((connector) => {
      if (
        connector.id.includes('metaMask') ||
        connector.name.includes('MetaMask')
      ) {
        options.push({
          id: 'metaMask',
          name: 'MetaMask',
          icon: '/metamask-icon.svg',
          network: 'ethereum',
          connectorId: connector.id,
        });
        addedIds.add('metaMask');
      } else if (
        connector.id.includes('coinbase') ||
        connector.name.includes('Coinbase')
      ) {
        options.push({
          id: 'coinbaseWallet',
          name: 'Coinbase',
          icon: '/coinbase-logo.svg',
          network: 'ethereum',
          connectorId: connector.id,
        });
        addedIds.add('coinbaseWallet');
      } else if (
        connector.id.includes('walletConnect') ||
        connector.name.includes('WalletConnect')
      ) {
        options.push({
          id: 'walletConnect',
          name: 'WalletConnect',
          icon: '/walletconnect-logo.svg',
          network: 'ethereum',
          connectorId: connector.id,
        });
        addedIds.add('walletConnect');
      } else if (
        connector.id.includes('binance') ||
        connector.name.includes('Binance')
      ) {
        options.push({
          id: 'binance',
          name: 'Binance',
          icon: '/binance-logo.svg',
          network: 'ethereum',
          connectorId: connector.id,
        });
        addedIds.add('binance');
      }
    });

    if (!addedIds.has('binance')) {
      const injectedConnector = ethereumConnectors.find(
        (c) => c.id === 'injected' || c.id.includes('injected')
      );

      if (injectedConnector) {
        options.push({
          id: 'binance',
          name: 'Binance',
          icon: '/binance-logo.svg',
          network: 'ethereum',
          connectorId: injectedConnector.id,
        });
      }
    }

    return options;
  };

  const starknetWalletOptions: WalletOption[] = [
    {
      id: 'argentX',
      name: 'Argent X',
      icon: '/argent-x-logo.svg',
      network: 'starknet',
      connectorId: 'argentX',
    },
    {
      id: 'braavos',
      name: 'Braavos',
      icon: '/braavos-logo.svg',
      network: 'starknet',
      connectorId: 'braavos',
    },
  ];

  const walletOptions =
    activeTab === 'ethereum'
      ? getEthereumWalletOptions()
      : starknetWalletOptions;

  const handleConnectWallet = async () => {
    if (!selectedWallet) return;
    setConnectionError(null);

    try {
      if (selectedWallet.network === 'ethereum') {
        if (selectedWallet.id === 'binance') {
          const injectedConnector = ethereumConnectors.find(
            (c) => c.id === 'injected' || c.id.includes('injected')
          );

          if (injectedConnector) {
            console.log(
              'Using injected connector for Binance:',
              injectedConnector.name
            );
            await connectEthereum({ connector: injectedConnector });
            return;
          } else {
            setConnectionError(
              'No compatible connector found for Binance Wallet'
            );
            return;
          }
        }

        const connector = ethereumConnectors.find(
          (c) => c.id === selectedWallet.connectorId
        );

        if (!connector) {
          console.error('Connector not found:', selectedWallet.connectorId);
          setConnectionError(`${selectedWallet.name} connector not found`);
          return;
        }

        console.log(
          `Connecting to ${selectedWallet.name} with connector:`,
          connector.name
        );
        await connectEthereum({ connector });
      } else {
        const connector = starknetConnectors.find(
          (c) => c.id === selectedWallet.connectorId
        );
        if (connector) {
          connectStarknet({ connector });
        } else {
          setConnectionError(`${selectedWallet.name} connector not found`);
        }
      }
    } catch (err) {
      console.error('Connection error:', err);
      setConnectionError(
        err instanceof Error ? err.message : 'Failed to connect wallet'
      );
    }
  };

  const error =
    connectionError ||
    (activeTab === 'ethereum'
      ? ethereumError?.message
      : starknetError?.message);
  const isPending =
    activeTab === 'ethereum' ? isEthereumPending : isStarknetPending;

  return (
    <>
      {/* Network tabs */}
      <div className="flex mb-6 border-b border-gray-700">
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === 'ethereum'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('ethereum')}
        >
          Ethereum
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === 'starknet'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('starknet')}
        >
          Starknet
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {walletOptions.map((wallet) => {
          const isSelected = selectedWallet?.id === wallet.id;

          return (
            <button
              key={wallet.id}
              className={`flex flex-col items-center justify-center bg-[#2a2a2a] border-2 ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-transparent'
              } rounded-xl p-4 transition-all duration-200 hover:bg-[#333] hover:-translate-y-0.5 cursor-pointer`}
              onClick={() => setSelectedWallet(wallet)}
              aria-pressed={isSelected}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2 rounded-lg bg-[#333] p-2">
                <Image
                  src={wallet.icon || '/placeholder.svg'}
                  alt={`${wallet.name} logo`}
                  width={40}
                  height={40}
                  className="w-full h-auto object-contain"
                />
              </div>
              <span className="text-white text-sm font-medium text-center">
                {wallet.name}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4 p-2 bg-red-500/10 rounded-lg text-sm">
          {error}
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
    </>
  );
}
