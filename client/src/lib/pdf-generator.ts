// Whitepaper PDF content - Professional institutional version
const WHITEPAPER_CONTENT = `
LUBDAN (LBD) WHITEPAPER
Technical and Business Documentation

VERSION 1.0
January 2026

DISCLAIMER
This document is the official English version of the Lubdan Whitepaper. Translations are provided for convenience only.

================================================================================

1. INTRODUCTION

Lubdan (LBD) is a long-term blockchain project built on Polygon, designed to deliver disciplined tokenomics, transparent on-chain presale mechanics, and sustainable dividend distribution in MATIC. Unlike speculative projects, Lubdan prioritizes investor protection, supply discipline, and real yield generation through a gaming business ecosystem.

================================================================================

2. VISION AND PHILOSOPHY

Lubdan is inspired by Irish folklore, where Lubdan represents intelligence, strategy, and fortune. Our project philosophy rests on four core principles:

• Long-term value over hype
• On-chain transparency and verifiability
• Controlled supply release with investor protection
• Real yield, not inflationary or artificial rewards

================================================================================

3. TECHNOLOGY STACK

Blockchain Infrastructure: Polygon (Ethereum Layer 2) – selected for low transaction costs and high throughput.

Token Standard: ERC-20 compatible.

Smart Contracts:
• Token contract (LBD)
• Presale contract (presale mechanics)
• Dividend distribution contract (MATIC distribution to holders)

All contracts are deployed on Polygon mainnet and verified on PolygonScan.

================================================================================

4. TOKEN OVERVIEW

Token Name: Lubdan
Symbol: LBD
Network: Polygon (Mainnet)
Total Supply: 21,000,000 LBD (fixed, non-inflationary)

The total supply is fixed at genesis and cannot be increased. This supply discipline is fundamental to the project's long-term sustainability and investor protection.

================================================================================

5. TOKENOMICS

Total Supply Allocation: The 21,000,000 LBD tokens are allocated across:
• Presale: 9,450,000 LBD
• Ecosystem and liquidity provisioning (reserved and controlled on-chain)
• Operational reserves (reserved)
• Team and development (locked with linear vesting over 10 months)
• Dividend-related reserves

All allocations are managed transparently on-chain and subject to smart contract controls.

================================================================================

6. TOKEN LOCK AND UNLOCK MECHANISM

Purpose: To protect holders and prevent excessive sell pressure during platform development.

Mechanism: All presale tokens are locked upon distribution.

Unlock Schedule: 10% per month over 10 months, beginning after presale closure and platform launch.

Verification: All lock and unlock logic is executed by smart contract and verifiable on PolygonScan.

================================================================================

7. DIVIDEND SYSTEM (MATIC)

Lubdan introduces a real dividend model based on actual platform revenue, not token emissions or inflation.

Dividend Flow:
Casino Operations → Net Profits → Dividend Smart Contract → MATIC Distribution to LBD Holders

Key Principles:
• Dividends are paid in MATIC (not new LBD tokens)
• No inflation or dilution
• Dividend amount depends on platform performance and profitability
• Distribution is fully automated via smart contract
• Holders must meet eligibility criteria (30-day holding period) to claim dividends

================================================================================

8. TRANSPARENCY AND SECURITY

On-Chain Verification: All smart contracts are deployed on Polygon mainnet. Contracts are verified on PolygonScan for full transparency. Presale data, token balances, lock mechanisms, and dividend logic are fully on-chain and auditable.

Security: Liquidity is locked to prevent rug pulls. Team tokens are vested linearly over 10 months. All transactions are immutable and verifiable on the blockchain.

================================================================================

9. WEBSITE AND USER EXPERIENCE

Design Principles:
• Non-custodial – users maintain full control of their private keys
• Security-first – no private keys stored on servers

User-Friendly Features:
• Wallet connection via WalletConnect for secure authentication
• Real-time presale statistics from on-chain data
• Secure token purchasing with MATIC or USDT
• Dashboard for tracking holdings, lock status, and claimable dividends

================================================================================

10. ROADMAP

Phase 1 – Foundation (Current):
• Smart contract development and audit
• Presale launch on Polygon
• Website and branding release
• Community building

Phase 2 – Platform Development:
• Casino platform development and testing
• Licensing and legal preparation
• Liquidity provisioning
• Public launch

Phase 3 – Expansion and Sustainability:
• Full platform launch
• Public liquidity and trading
• Ecosystem growth
• Long-term operational optimization

================================================================================

11. RISK DISCLOSURE

Market Risk: Cryptocurrency markets are volatile. LBD token price may fluctuate based on market conditions and investor sentiment.

Performance Risk: Dividends depend on casino platform performance and profitability. There is no guarantee of profit or dividend distribution.

Regulatory Risk: Cryptocurrency and gaming regulations are evolving globally. Changes in regulatory environment may impact project operations.

Technical Risk: While smart contracts are audited, no code is entirely risk-free. Users should only invest amounts they can afford to lose.

================================================================================

12. LEGAL DISCLAIMER

This whitepaper is provided for informational purposes only and does not constitute financial, investment, legal, or tax advice. Lubdan (LBD) is not a security and is not regulated as such. Investors should conduct their own research and consult with qualified advisors before making investment decisions. Past performance does not guarantee future results. Cryptocurrency investments carry significant risk, including the potential loss of principal.

================================================================================

13. OFFICIAL CHANNELS

Website: https://lubdan.io
X (Twitter): https://x.com/ludbanlbd
Telegram: https://t.me/LubdanOfficial
Email: lubdan.info@gmail.com

Only official channels above should be trusted for project information.

================================================================================

END OF WHITEPAPER

For the latest version and updates, visit: https://lubdan.io/whitepaper
`;

export const downloadWhitepaperPDF = async () => {
  try {
    // Try to use html2pdf for better PDF generation
    const { default: html2pdf } = await import('html2pdf.js');
    
    const element = document.createElement('div');
    element.style.padding = '40px';
    element.style.fontFamily = '"Courier New", monospace';
    element.style.lineHeight = '1.8';
    element.style.fontSize = '12px';
    element.style.color = '#000';
    element.style.backgroundColor = '#fff';
    element.innerHTML = WHITEPAPER_CONTENT.replace(/\n/g, '<br />').replace(/ /g, '&nbsp;');
    
    const opt = {
      margin: 15,
      filename: 'Lubdan-Whitepaper-v1.0.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback: Download as text file
    fallbackDownloadAsText();
  }
};

const fallbackDownloadAsText = () => {
  try {
    const element = document.createElement('a');
    const file = new Blob([WHITEPAPER_CONTENT], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Lubdan-Whitepaper-v1.0.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  } catch (err) {
    console.error('Fallback download failed:', err);
    alert('Unable to download whitepaper. Please try again later.');
  }
};

export const shareWhitepaperPDF = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Lubdan Whitepaper',
        text: 'Check out the Lubdan Whitepaper - A professional investment platform on Polygon offering real MATIC dividends. Built on transparency and long-term value.',
        url: window.location.href
      });
    } else {
      // Fallback: Copy to clipboard
      const text = 'Lubdan Whitepaper: ' + window.location.href;
      await navigator.clipboard.writeText(text);
      alert('Whitepaper link copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing:', error);
    // Silent fail for share - user can manually share
  }
};
