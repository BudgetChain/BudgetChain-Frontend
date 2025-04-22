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
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Set isClient to true after mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle animation states when opening/closing
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready before starting animation
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => setShouldRender(false), 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
  if (!isClient || !shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-[480px] relative shadow-lg transition-all duration-300 ${
          isAnimating
            ? 'opacity-100 transform translate-y-0 scale-100'
            : 'opacity-0 transform -translate-y-4 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-modal-title"
      >
        <button
          className="absolute top-4 left-4 bg-transparent border-none text-gray-400 hover:text-white hover:bg-white/10 p-1 rounded-full flex items-center justify-center transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close modal"
        >
          <X
            size={24}
            className="transition-transform duration-200 hover:rotate-90"
          />
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
