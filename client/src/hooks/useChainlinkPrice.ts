import { useReadContract } from 'wagmi';
import { CONTRACTS, CHAINLINK_ABI } from '@/lib/contracts';

export function useChainlinkPrice() {
  const { data, isError, isLoading } = useReadContract({
    address: CONTRACTS.CHAINLINK_MATIC_USD,
    abi: CHAINLINK_ABI,
    functionName: 'latestRoundData',
    query: {
      refetchInterval: 30000, // Refresh every 30 seconds
    }
  });

  // Chainlink MATIC/USD feed has 8 decimals
  const price = data ? Number(data[1]) / 1e8 : 0;

  return {
    price,
    isError,
    isLoading,
  };
}
