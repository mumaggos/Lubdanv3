import { parseAbi } from 'viem';

export const CONTRACTS = {
  TOKEN: '0x7dd400E9141e3df10Fb24CcdE9B116C334F9542e',
  PRESALE: '0x48ec23c74c163A376805Ba7E86f9d0203b80910c',
  DIVIDENDS: '0xDD32982ce5533e9908c332982c5615690bF20EBc',
  USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  CHAINLINK_MATIC_USD: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0', // Polygon Mainnet Aggregator
} as const;

export const PRESALE_ABI = parseAbi([
  'function paused() view returns (bool)',
  'function currentPhase() view returns (uint256)',
  'function phase1Remaining() view returns (uint256)',
  'function phase2Remaining() view returns (uint256)',
  'function totalSold() view returns (uint256)',
  'function buyWithMATIC() payable',
  'function buyWithUSDT(uint256 amountUSDT)',
  'function setPhase(uint256 _phase)',
  'function withdrawFunds()',
]);

export const TOKEN_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function lastReceivedAt(address owner) view returns (uint256)',
]);

export const DIVIDENDS_ABI = parseAbi([
  'function pending(address account) view returns (uint256)',
  'function claim()',
]);

export const USDT_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
]);

export const CHAINLINK_ABI = parseAbi([
  'function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
]);

export const PRESALE_CONFIG = {
  TOTAL_SUPPLY: 21_000_000,
  PRESALE_TOTAL: 9_450_000,
  PHASE_1: {
    PRICE: 0.20,
    ALLOCATION: 6_300_000,
  },
  PHASE_2: {
    PRICE: 0.60,
    ALLOCATION: 3_150_000,
  },
};
