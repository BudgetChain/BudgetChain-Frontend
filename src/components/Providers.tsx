'use client';

import type { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StarknetConfig } from '@starknet-react/core';
import { config } from '@/lib/wagmi';
import { useStarknetConfig } from '@/lib/starknet';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  // Get the complete Starknet configuration from our hook
  const starknetConfig = useStarknetConfig();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StarknetConfig {...starknetConfig}>{children}</StarknetConfig>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
