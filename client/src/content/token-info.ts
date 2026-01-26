export const tokenInfo = {
  // Project Info
  projectName: 'Lubdan',
  ticker: 'LBD',
  network: 'Polygon',
  shortDescription: 'A long-term Polygon-based project focused on transparency, sustainability, and on-chain value distribution.',
  
  // Contract Addresses
  tokenContractAddress: '0x7dd400E9141e3df10Fb24CcdE9B116C334F9542e',
  presaleContractAddress: '0x48ec23c74c163A376805Ba7E86f9d0203b80910c',
  
  // Links
  website: 'https://www.lubdan.com',
  email: 'info@lubdan.com',
  whitepaperUrl: 'https://www.lubdan.com/Whitepaper.pdf',
  telegramUrl: 'https://t.me/ludban_lbd',
  twitterUrl: 'https://x.com/ludbanlbd',
  
  // Presale Phases
  presalePhases: [
    {
      phase: 1,
      priceUSD: 0.20,
      description: 'Phase 1 Presale'
    },
    {
      phase: 2,
      priceUSD: 0.60,
      description: 'Phase 2 Presale'
    }
  ],
  
  // Tokenomics
  tokenomics: {
    totalSupply: 21000000,
    allocations: [
      {
        name: 'Presale',
        percent: 30
      },
      {
        name: 'Liquidity Pool',
        percent: 25
      },
      {
        name: 'Team',
        percent: 15
      },
      {
        name: 'Marketing',
        percent: 15
      },
      {
        name: 'Development',
        percent: 10
      },
      {
        name: 'Reserves',
        percent: 5
      }
    ]
  },
  
  // Roadmap
  roadmap: [
    {
      milestone: 'Presale Phase 1 Launch',
      description: 'Initial presale phase started',
      status: 'completed'
    },
    {
      milestone: 'Presale Ongoing',
      description: 'Public token presale currently active',
      status: 'in-progress'
    },
    {
      milestone: 'DEX Listing',
      description: 'Token listed on decentralized exchanges',
      status: 'in-progress'
    },
    {
      milestone: 'Dividend System',
      description: 'MATIC dividend distribution activated',
      status: 'upcoming'
    },
    {
      milestone: 'CEX Listings',
      description: 'Token listed on centralized exchanges',
      status: 'upcoming'
    },
    {
      milestone: 'Ecosystem Expansion',
      description: 'Launch of ecosystem products and partnerships',
      status: 'upcoming'
    }
  ],
  
  // Disclaimer
  disclaimer: 'Lubdan (LBD) is a utility token on the Polygon network and does not represent equity, ownership, or profit rights in any company. This project is subject to market risks and regulatory changes. Always conduct your own research before participating.',
  
  // Footer year
  copyrightYear: 2026
};
