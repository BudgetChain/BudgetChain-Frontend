import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import {
  metaMask,
  coinbaseWallet,
  walletConnect,
  injected,
} from 'wagmi/connectors';

// Set WalletConnect project ID
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// Helper function to check for Binance wallet
export const isBinanceWalletAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Different ways Binance Wallet might be detected
  return !!(
    window.BinanceChain ||
    (window.ethereum &&
      (window.ethereum.isBinance ||
        (Array.isArray(window.ethereum.providers) &&
          window.ethereum.providers.some(
            (provider: any) => provider.isBinance
          ))))
  );
};

export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'BudgetChain',
    }),
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: true, // Ensure QR modal is shown
      metadata: {
        name: 'BudgetChain',
        description: 'BudgetChain Wallet Connection',
        url: 'https://budgetchain.xyz',
        icons: ['https://budgetchain.xyz/logo.png'],
      },
    }),
    // Use injected connector for Binance
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});
