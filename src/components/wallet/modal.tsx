'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Lottie from 'lottie-react';
import ConnectWalletButton from '@/components/ui/connect-wallet-button';

interface Wallet {
  name?: string;
  logo: string;
}

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [connectAnimationData, setConnectAnimationData] = useState<any>(null);

  const wallets: Wallet[] = [
    { logo: '/wallet1.svg' },
    { logo: '/wallet2.svg' },
    { logo: '/wallet3.svg' },
    { logo: '/wallet4.svg' },
    { logo: '/wallet5.svg' },
    { logo: '/wallet6.svg' },
    { logo: '/wallet5.svg' },
    { logo: '/wallet6.svg' },
  ];

  useEffect(() => {
    const fetchAnimations = async () => {
      try {
        const [defaultAnim, connectAnim] = await Promise.all([
          fetch(
            'https://assets8.lottiefiles.com/packages/lf20_k9mdl7qe.json'
          ).then((res) => res.json()),
          fetch(
            'https://assets5.lottiefiles.com/packages/lf20_x62chJ.json'
          ).then((res) => res.json()),
        ]);
        setAnimationData(defaultAnim);
        setConnectAnimationData(connectAnim);
      } catch (err) {
        console.error('Failed to load Lottie animations:', err);
      }
    };

    fetchAnimations();
  }, []);

  const handleSelectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setError(null);
  };

  const handleConnectWallet = async () => {
    if (!selectedWallet) return;

    setIsConnecting(true);
    setError(null);

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.2
            ? resolve()
            : reject(
                new Error(
                  'Failed to connect to wallet. Please check if your wallet is unlocked and try again.'
                )
              );
        }, 2000);
      });

      setIsConnected(true);
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('selectedWalletLogo', selectedWallet.logo);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred while connecting to wallet.'
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnected(false);
      setSelectedWallet(null);
      setError(null);
      setIsConnecting(false);

      localStorage.removeItem('walletConnected');
      localStorage.removeItem('selectedWalletLogo');
    }, 500);
  };

  useEffect(() => {
    const isWalletConnected =
      localStorage.getItem('walletConnected') === 'true';
    const savedWalletLogo = localStorage.getItem('selectedWalletLogo');

    if (isWalletConnected && savedWalletLogo) {
      const savedWallet = wallets.find(
        (wallet) => wallet.logo === savedWalletLogo
      ) || { logo: savedWalletLogo };
      setSelectedWallet(savedWallet);
      setIsConnected(true);
    }
  }, []);

  const handleRetryConnection = () => {
    setError(null);
    handleConnectWallet();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#6d6161] bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-[#050512] rounded-2xl p-8 w-full max-w-[500px] relative">
        {/* Modal Header */}
        <button
          onClick={onClose}
          className="absolute top-[30px] left-10 text-[#ebebeb] text-xl"
          aria-label="Close Modal"
        >
          &#10005;
        </button>

        {!selectedWallet && !isConnected && (
          <h2 className="text-white mb-6 text-center text-[14px] font-semibold">
            Connect Wallet
          </h2>
        )}

        {/* Modal Body */}
        {isConnected ? (
          <div className="text-center">
            <div className="flex flex-col items-center mb-4">
              <img
                src={selectedWallet?.logo || '/placeholder.svg'}
                alt="Connected Wallet"
                className="w-16 h-16 mb-2"
              />
              <p className="text-white">
                Connected to {selectedWallet?.name || 'Wallet'}
              </p>
            </div>
            <button
              onClick={disconnectWallet}
              className="block mx-auto w-[45%] py-3 rounded-xl text-[12px] text-white font-extralight bg-[#2D2B5F] hover:bg-[#1F1D45] whitespace-nowrap border border-[#4F4AE6] transition-colors"
              aria-label="Disconnect Wallet"
              disabled={isConnecting}
            >
              {isConnecting ? 'DISCONNECTING...' : 'DISCONNECT WALLET'}
            </button>
          </div>
        ) : (
          <>
            {isConnecting ? (
              <div className="flex flex-col items-center">
                {connectAnimationData ? (
                  <Lottie
                    animationData={connectAnimationData}
                    style={{ width: 150, height: 150 }}
                    loop
                  />
                ) : (
                  <div className="w-16 h-16 border-4 border-[#4F4AE6] border-t-transparent rounded-full animate-spin"></div>
                )}
                <p className="text-white mt-4">
                  Connecting to {selectedWallet?.name || 'Wallet'}...
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Please confirm the connection in your wallet
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div
                    className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center"
                    role="alert"
                  >
                    <p>{error}</p>
                    <button
                      onClick={handleRetryConnection}
                      className="mt-2 bg-white text-red-500 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100"
                    >
                      Retry Connection
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 items-center h-[210px] max-w-[450px] overflow-auto gap-x-1 gap-y-2 mb-8 scrollbar-hide">
                  {wallets.map((wallet, index) => (
                    <img
                      key={index}
                      onClick={() => handleSelectWallet(wallet)}
                      src={wallet.logo || '/placeholder.svg'}
                      alt={`Wallet ${index + 1}`}
                      className={`w-[90%] shadow-md mx-auto h-fit cursor-pointer hover:scale-105 transition-transform duration-200 ${
                        selectedWallet?.logo === wallet.logo
                          ? 'border-2 border-[#4F4AE6] rounded-xl'
                          : ''
                      }`}
                    />
                  ))}
                </div>

                <ConnectWalletButton
                  onClick={handleConnectWallet}
                  disabled={!selectedWallet || isConnecting}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WalletModal;
