import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { 
  metaMask, 
  coinbaseWallet, 
  walletConnect, 
  injected 
} from 'wagmi/connectors';

// Extend Window interface for BinanceChain
declare global {
  interface Window {
    BinanceChain?: any;
  }
}

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  connectors: [
    metaMask(), // shimDisconnect removed as it's not needed in v2
    coinbaseWallet({
      appName: 'BudgetChain',
      appLogoUrl: '/logo.png'
    }),
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: true,
      metadata: {
        name: 'BudgetChain',
        description: 'BudgetChain Wallet Connection',
        url: 'https://budgetchain.xyz',
        icons: ['https://budgetchain.xyz/logo.png']
      }
    }),
    injected({
      name: 'Binance',
      getProvider: () => {
        if (typeof window !== 'undefined') {
          // Check for Binance first
          if (window.BinanceChain) return window.BinanceChain;
          // Fallback to generic injected
          return window.ethereum;
        }
      }
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http()
  },
  ssr: true
});