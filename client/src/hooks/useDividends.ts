import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { CONTRACTS, DIVIDENDS_ABI, TOKEN_ABI } from '@/lib/contracts';
import { formatUnits } from 'viem';

export function useDividendsData() {
  const { address } = useAccount();

  const { data: pendingDividends, refetch: refetchPending } = useReadContract({
    address: CONTRACTS.DIVIDENDS as `0x${string}`,
    abi: DIVIDENDS_ABI,
    functionName: 'pending',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: lastReceivedAt, refetch: refetchLastReceived } = useReadContract({
    address: CONTRACTS.TOKEN as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: 'lastReceivedAt',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const pendingAmount = pendingDividends ? Number(formatUnits(pendingDividends, 18)) : 0;
  const lastReceivedTimestamp = lastReceivedAt ? Number(lastReceivedAt) : 0;

  return {
    pendingAmount,
    lastReceivedTimestamp,
    refetchPending,
    refetchLastReceived,
  };
}

export function useDividendActions() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const claimDividends = () => {
    writeContract({
      address: CONTRACTS.DIVIDENDS as `0x${string}`,
      abi: DIVIDENDS_ABI,
      functionName: 'claim',
    });
  };

  return {
    claimDividends,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
}
