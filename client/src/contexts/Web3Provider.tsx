import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  );
}
