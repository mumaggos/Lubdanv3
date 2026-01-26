import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/wagmi';

interface Web3WrapperProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

/**
 * Web3Wrapper component that provides Wagmi and QueryClient
 * This should only be used on routes that need Web3 functionality
 */
export function Web3Wrapper({ children, queryClient }: Web3WrapperProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
