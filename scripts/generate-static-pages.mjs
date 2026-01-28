import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const clientSrcPath = path.join(projectRoot, 'client', 'src');
const publicPath = path.join(projectRoot, 'client', 'public');

// Import token info
const tokenInfoPath = path.join(clientSrcPath, 'content', 'token-info.ts');
const tokenInfoContent = fs.readFileSync(tokenInfoPath, 'utf-8');

// Parse the token info (simple extraction)
let tokenInfo;
try {
  const cleanContent = tokenInfoContent
    .replace('export const tokenInfo = ', '')
    .replace(/;\s*$/, '');
  tokenInfo = eval('(' + cleanContent + ')');
} catch (error) {
  console.error('Error parsing token-info.ts:', error);
  process.exit(1);
}

// Utility function to generate HTML
function generateHTML(title, description, content, jsonLd) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#000000">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://www.lubdan.com">
  <meta property="og:site_name" content="Lubdan">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:site" content="@ludbanlbd">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    h1 {
      color: #d4af37;
      margin-bottom: 20px;
      font-size: 2.5em;
    }
    
    h2 {
      color: #d4af37;
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 1.8em;
    }
    
    p {
      margin-bottom: 15px;
      color: #555;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    th {
      background: #f9f9f9;
      font-weight: bold;
      color: #333;
    }
    
    tr:hover {
      background: #f5f5f5;
    }
    
    a {
      color: #d4af37;
      text-decoration: none;
      font-weight: 500;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .disclaimer {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 30px 0;
      border-radius: 4px;
      color: #856404;
    }
    
    .links {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      margin: 20px 0;
    }
    
    .links a {
      display: inline-block;
      padding: 10px 20px;
      background: #d4af37;
      color: #000;
      border-radius: 4px;
      transition: background 0.3s;
    }
    
    .links a:hover {
      background: #c49d2e;
      text-decoration: none;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #999;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    ${content}
    
    <div class="disclaimer">
      <strong>Disclaimer:</strong> ${tokenInfo.disclaimer}
    </div>
    
    <div class="footer">
      <p>© 2026 Lubdan. All rights reserved. | <a href="https://www.lubdan.com">Back to Website</a></p>
    </div>
  </div>
</body>
</html>`;
}

// Generate Token Info Page
function generateTokenInfoPage() {
  const content = `
    <h1>Lubdan Token Information</h1>
    <p><strong>${tokenInfo.shortDescription}</strong></p>
    
    <h2>Token Details</h2>
    <table>
      <tr>
        <th>Property</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Token Name</td>
        <td>${tokenInfo.projectName}</td>
      </tr>
      <tr>
        <td>Ticker</td>
        <td>${tokenInfo.ticker}</td>
      </tr>
      <tr>
        <td>Network</td>
        <td>${tokenInfo.network}</td>
      </tr>
      <tr>
        <td>Token Contract</td>
        <td><a href="https://polygonscan.com/token/${tokenInfo.tokenContractAddress}" target="_blank">${tokenInfo.tokenContractAddress}</a></td>
      </tr>
      <tr>
        <td>Presale Contract</td>
        <td><a href="https://polygonscan.com/address/${tokenInfo.presaleContractAddress}" target="_blank">${tokenInfo.presaleContractAddress}</a></td>
      </tr>
    </table>
    
    <h2>Quick Links</h2>
    <div class="links">
      <a href="${tokenInfo.website}">Website</a>
      <a href="${tokenInfo.whitepaperUrl}">Whitepaper</a>
      <a href="https://polygonscan.com/token/${tokenInfo.tokenContractAddress}">PolygonScan</a>
      <a href="${tokenInfo.telegramUrl}">Telegram</a>
      <a href="${tokenInfo.twitterUrl}">Twitter/X</a>
      <a href="mailto:${tokenInfo.email}">Email</a>
    </div>
  `;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: tokenInfo.projectName,
    url: tokenInfo.website,
    email: tokenInfo.email,
    sameAs: [
      tokenInfo.telegramUrl,
      tokenInfo.twitterUrl
    ]
  };
  
  return generateHTML(
    `${tokenInfo.projectName} Token Information`,
    tokenInfo.shortDescription,
    content,
    jsonLd
  );
}

// Generate Tokenomics Page
function generateTokenomicsPage() {
  const allocationsRows = tokenInfo.tokenomics.allocations
    .map(alloc => `
      <tr>
        <td>${alloc.name}</td>
        <td>${alloc.percent}%</td>
        <td>${(tokenInfo.tokenomics.totalSupply * alloc.percent / 100).toLocaleString()}</td>
      </tr>
    `)
    .join('');
  
  const content = `
    <h1>Lubdan Tokenomics</h1>
    <p>Complete breakdown of the ${tokenInfo.projectName} token distribution and allocation.</p>
    
    <h2>Total Supply</h2>
    <p><strong>${tokenInfo.tokenomics.totalSupply.toLocaleString()} ${tokenInfo.ticker}</strong></p>
    
    <h2>Token Allocation</h2>
    <table>
      <tr>
        <th>Category</th>
        <th>Percentage</th>
        <th>Amount</th>
      </tr>
      ${allocationsRows}
    </table>
    
    <h2>Distribution Details</h2>
    <p>The tokenomics are designed to ensure sustainable growth and fair distribution among stakeholders.</p>
    
    <div class="links">
      <a href="/token-info">Token Information</a>
      <a href="${tokenInfo.website}">Back to Website</a>
    </div>
  `;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lubdan Tokenomics',
    description: 'Token distribution and allocation details',
    url: 'https://www.lubdan.com/tokenomics'
  };
  
  return generateHTML(
    `${tokenInfo.projectName} Tokenomics`,
    'Token distribution and allocation details',
    content,
    jsonLd
  );
}

// Generate Roadmap Page
function generateRoadmapPage() {
  const milestonesRows = tokenInfo.roadmap
    .map(milestone => `
      <tr>
        <td>${milestone.milestone}</td>
        <td>${milestone.description}</td>
        <td><strong>${milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}</strong></td>
      </tr>
    `)
    .join('');
  
  const content = `
    <h1>Lubdan Roadmap</h1>
    <p>Our strategic plan for the development and growth of the ${tokenInfo.projectName} project.</p>
    
    <h2>Project Milestones</h2>
    <table>
      <tr>
        <th>Milestone</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
      ${milestonesRows}
    </table>
    
    <h2>Vision</h2>
    <p>Lubdan is committed to building a sustainable, transparent, and community-driven project with real value for token holders through MATIC dividends and ecosystem growth.</p>
    
    <div class="links">
      <a href="/token-info">Token Information</a>
      <a href="/tokenomics">Tokenomics</a>
      <a href="${tokenInfo.whitepaperUrl}">Whitepaper</a>
      <a href="${tokenInfo.website}">Back to Website</a>
    </div>
  `;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lubdan Roadmap',
    description: 'Project milestones and development timeline',
    url: 'https://www.lubdan.com/roadmap'
  };
  
  return generateHTML(
    `${tokenInfo.projectName} Roadmap`,
    'Project milestones and development timeline',
    content,
    jsonLd
  );
}

// Generate Whitepaper Page
function generateWhitepaperPage() {
  const content = `
    <h1>Lubdan Whitepaper</h1>
    <p>The complete technical and business documentation for the ${tokenInfo.projectName} project.</p>
    
    <h2>Overview</h2>
    <p>${tokenInfo.shortDescription}</p>
    
    <h2>Key Features</h2>
    <ul style="margin-left: 20px;">
      <li>Real MATIC dividends from casino profits</li>
      <li>Transparent on-chain operations</li>
      <li>Sustainable tokenomics</li>
      <li>Community-driven governance</li>
    </ul>
    
    <h2>Technology Stack</h2>
    <p>Built on the Polygon blockchain for scalability and low transaction costs.</p>
    
    <div class="links">
      <a href="${tokenInfo.whitepaperUrl}" target="_blank">Download Full Whitepaper (PDF)</a>
      <a href="/token-info">Token Information</a>
      <a href="/tokenomics">Tokenomics</a>
      <a href="/roadmap">Roadmap</a>
      <a href="${tokenInfo.website}">Back to Website</a>
    </div>
  `;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lubdan Whitepaper',
    description: 'Technical and business documentation',
    url: 'https://www.lubdan.com/whitepaper'
  };
  
  return generateHTML(
    `${tokenInfo.projectName} Whitepaper`,
    'Technical and business documentation',
    content,
    jsonLd
  );
}

// Generate FAQ Page
function generateFAQPage() {
  const content = `
    <h1>Frequently Asked Questions</h1>
    <p>Common questions about ${tokenInfo.projectName} and how it works.</p>
    
    <h2>General Questions</h2>
    <p><strong>What is Lubdan?</strong></p>
    <p>${tokenInfo.shortDescription}</p>
    
    <p><strong>How do I earn dividends?</strong></p>
    <p>By holding LBD tokens, you automatically earn real MATIC dividends from casino profits distributed on-chain.</p>
    
    <p><strong>What is the token contract address?</strong></p>
    <p><a href="https://polygonscan.com/token/${tokenInfo.tokenContractAddress}" target="_blank">${tokenInfo.tokenContractAddress}</a></p>
    
    <h2>Resources</h2>
    <div class="links">
      <a href="${tokenInfo.whitepaperUrl}" target="_blank">Whitepaper</a>
      <a href="/token-info">Token Information</a>
      <a href="/tokenomics">Tokenomics</a>
      <a href="/roadmap">Roadmap</a>
      <a href="${tokenInfo.telegramUrl}" target="_blank">Telegram Support</a>
      <a href="${tokenInfo.website}">Back to Website</a>
    </div>
  `;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lubdan FAQ',
    description: 'Frequently asked questions',
    url: 'https://www.lubdan.com/faq'
  };
  
  return generateHTML(
    `${tokenInfo.projectName} FAQ`,
    'Frequently asked questions',
    content,
    jsonLd
  );
}

// Generate all pages
console.log('🔄 Generating static HTML pages...');

try {
  const tokenInfoHTML = generateTokenInfoPage();
  fs.writeFileSync(path.join(publicPath, 'token-info.html'), tokenInfoHTML);
  console.log('✅ Generated: client/public/token-info.html');
  
  const tokenomicsHTML = generateTokenomicsPage();
  fs.writeFileSync(path.join(publicPath, 'tokenomics.html'), tokenomicsHTML);
  console.log('✅ Generated: client/public/tokenomics.html');
  
  const roadmapHTML = generateRoadmapPage();
  fs.writeFileSync(path.join(publicPath, 'roadmap.html'), roadmapHTML);
  console.log('✅ Generated: client/public/roadmap.html');
  
  const whitepaperHTML = generateWhitepaperPage();
  fs.writeFileSync(path.join(publicPath, 'whitepaper.html'), whitepaperHTML);
  console.log('✅ Generated: client/public/whitepaper.html');
  
  const faqHTML = generateFAQPage();
  fs.writeFileSync(path.join(publicPath, 'faq.html'), faqHTML);
  console.log('✅ Generated: client/public/faq.html');
  
  console.log('✨ All static pages generated successfully!');
} catch (error) {
  console.error('❌ Error generating static pages:', error);
  process.exit(1);
}
