import { mainnet, sepolia } from '@starknet-react/chains';
import {
  argent,
  braavos,
  publicProvider,
  useInjectedConnectors,
} from '@starknet-react/core';

// Get injected connectors (like Argent X, Braavos, etc.)
export function useStarknetConnectors() {
  return useInjectedConnectors({
    // Show these connectors as recommended
    recommended: [argent(), braavos()], // Changed from 'connectors' to 'recommended'
  });
}

// Create Starknet provider config
export function useStarknetConfig() {
  // Changed to a hook by prefixing with 'use'
  const { connectors } = useStarknetConnectors();

  return {
    chains: [mainnet, sepolia],
    provider: publicProvider(),
    connectors,
    autoConnect: true,
  };
}
