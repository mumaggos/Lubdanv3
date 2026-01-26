import { useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS, PRESALE_ABI, USDT_ABI } from '@/lib/contracts';
import { formatUnits, parseUnits } from 'viem';

export function usePresaleData() {
  const { data, isError, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        address: CONTRACTS.PRESALE as `0x${string}`,
        abi: PRESALE_ABI,
        functionName: 'paused',
      },
      {
        address: CONTRACTS.PRESALE as `0x${string}`,
        abi: PRESALE_ABI,
        functionName: 'currentPhase',
      },
      {
        address: CONTRACTS.PRESALE as `0x${string}`,
        abi: PRESALE_ABI,
        functionName: 'totalSold',
      },
      {
        address: CONTRACTS.PRESALE as `0x${string}`,
        abi: PRESALE_ABI,
        functionName: 'phase1Remaining',
      },
      {
        address: CONTRACTS.PRESALE as `0x${string}`,
        abi: PRESALE_ABI,
        functionName: 'phase2Remaining',
      },
    ],
  });

  const paused = data?.[0]?.result ?? false;
  const currentPhase = Number(data?.[1]?.result ?? 1);
  const totalSold = data?.[2]?.result ? Number(formatUnits(data[2].result, 18)) : 0;
  const phase1Remaining = data?.[3]?.result ? Number(formatUnits(data[3].result, 18)) : 0;
  const phase2Remaining = data?.[4]?.result ? Number(formatUnits(data[4].result, 18)) : 0;

  return {
    paused,
    currentPhase,
    totalSold,
    phase1Remaining,
    phase2Remaining,
    isLoading,
    isError,
    refetch,
  };
}

export function usePresaleActions() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const buyWithMATIC = (amount: string) => {
    writeContract({
      address: CONTRACTS.PRESALE as `0x${string}`,
      abi: PRESALE_ABI,
      functionName: 'buyWithMATIC',
      value: parseUnits(amount, 18),
    });
  };

  const approveUSDT = (amount: string) => {
    writeContract({
      address: CONTRACTS.USDT as `0x${string}`,
      abi: USDT_ABI,
      functionName: 'approve',
      args: [CONTRACTS.PRESALE as `0x${string}`, parseUnits(amount, 6)],
    });
  };

  const buyWithUSDT = (amount: string) => {
    writeContract({
      address: CONTRACTS.PRESALE as `0x${string}`,
      abi: PRESALE_ABI,
      functionName: 'buyWithUSDT',
      args: [parseUnits(amount, 6)],
    });
  };

  return {
    buyWithMATIC,
    approveUSDT,
    buyWithUSDT,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
}
