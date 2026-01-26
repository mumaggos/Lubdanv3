import { http, createConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

// Fallback projectId for WalletConnect (should be replaced with env var in prod)
const projectId = '3fcc6b70f7cf13c0ec43408da43ddf85'; 

export const config = createConfig({
  chains: [polygon],
  connectors: [
    injected(),
    metaMask(),
    // safe(),
  ],
  transports: {
    [polygon.id]: http(),
  },
});
