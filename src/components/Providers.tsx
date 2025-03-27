'use client';

import { type ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  StarknetConfig,
} from '@starknet-react/core';
import { sepolia } from '@starknet-react/chains';
import { config } from '@/lib/wagmi';
import { useStarknetConfig } from '@/lib/starknet';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  // Get custom Starknet config from your hook
  const { connectors: customConnectors, ...starknetConfig } =
    useStarknetConfig();

  // Fallback to default connectors if none provided by the hook
  const { connectors: defaultConnectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: 'onlyIfNoConnectors',
    order: 'random',
  });

  // Use custom connectors if provided, otherwise use defaults
  const mergedConnectors = customConnectors || defaultConnectors;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StarknetConfig
          {...starknetConfig}
          connectors={mergedConnectors}
          explorer={voyager}
          chains={[sepolia]}
          autoConnect={true} // Recommended to enable auto-connect
        >
          {children}
        </StarknetConfig>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
