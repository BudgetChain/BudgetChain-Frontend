'use client';
import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface WalletSelectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletSelected: (wallet: string, address: string) => void;
}

const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({
  isOpen,
  onOpenChange,
  onWalletSelected,
}) => {
  const connectWallet = (walletType: string) => {
    // Simulate wallet connection
    // In production, this would connect to the actual wallet
    const mockAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';

    // Close this modal and return the selected wallet and address
    onWalletSelected(walletType, mockAddress);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#050512] text-white border border-[#EBEBEB80]">
        <DialogHeader>
          <DialogTitle className="text-[#4F4AE6] text-2xl font-bold text-center">
            Select Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="text-center mb-4">
            <p className="text-gray-400">Choose your preferred wallet</p>
          </div>

          {/* Argent X Wallet Option */}
          <button
            onClick={() => connectWallet('ArgentX')}
            className="flex items-center justify-between w-full p-4 bg-[#151523] hover:bg-[#1c1c32] rounded-xl border border-gray-800 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                {/* Replace with actual Argent X logo */}
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
              <span className="font-medium">Argent X</span>
            </div>
            <span className="text-[#4F4AE6]">Connect</span>
          </button>

          {/* Braavos Wallet Option */}
          <button
            onClick={() => connectWallet('Braavos')}
            className="flex items-center justify-between w-full p-4 bg-[#151523] hover:bg-[#1c1c32] rounded-xl border border-gray-800 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                {/* Replace with actual Braavos logo */}
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  B
                </div>
              </div>
              <span className="font-medium">Braavos</span>
            </div>
            <span className="text-[#4F4AE6]">Connect</span>
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              By connecting your wallet, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelectionModal;
