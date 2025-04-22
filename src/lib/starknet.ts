'use client';

import { useCallback, useMemo } from 'react';
import {
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  publicProvider,
} from '@starknet-react/core';
import { mainnet, sepolia } from '@starknet-react/chains';

/**
 * Hook to get Starknet connectors
 */
export function useStarknetConnectors() {
  return useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: 'onlyIfNoConnectors',
    order: 'random',
  });
}

/**
 * Hook to get the complete Starknet configuration
 * Includes error handling for disconnection events
 */
export function useStarknetConfig() {
  const { connectors } = useStarknetConnectors();

  // Handle wallet disconnection errors
  const handleDisconnectError = useCallback((error: Error) => {
    console.warn('Starknet disconnect error:', error);
    // Dispatch a custom event that our components can listen for
    window.dispatchEvent(new CustomEvent('wallet_disconnected'));
    // Return true to indicate the error was handled
    return true;
  }, []);

  return useMemo(
    () => ({
      chains: [mainnet, sepolia],
      provider: publicProvider(),
      connectors,
      explorer: voyager,
      autoConnect: true,
      onDisconnectError: handleDisconnectError,
    }),
    [connectors, handleDisconnectError]
  );
}
