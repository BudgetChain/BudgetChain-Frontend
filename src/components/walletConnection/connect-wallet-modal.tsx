'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { WalletSelection } from './wallet-selection';

export function ConnectWalletModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Return null during server-side rendering to avoid hydration issues
  if (!isClient) return null;
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

        <WalletSelection onClose={onClose} />
      </div>
    </div>
  );
}
