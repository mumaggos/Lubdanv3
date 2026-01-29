#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist/public');
const indexPath = path.join(distDir, 'index.html');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read the built index.html
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Create a pre-rendered version with hero content
const prerenderedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lubdan - Premium Blockchain Investment Platform</title>
    <meta name="description" content="Lubdan (LBD) é um projeto blockchain de sustentabilidade, transparência on-chain e crescimento responsável em Polygon.">
    <meta name="og:title" content="Lubdan - Premium Blockchain Investment Platform">
    <meta name="og:description" content="Lubdan (LBD) é um projeto blockchain de sustentabilidade, transparência on-chain e crescimento responsável em Polygon.">
    <meta name="og:image" content="https://lubdanv3.vercel.app/images/lubdan-og-image.avif">
    <meta name="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Lubdan - Premium Blockchain Investment Platform">
    <meta name="twitter:description" content="Lubdan (LBD) é um projeto blockchain de sustentabilidade, transparência on-chain e crescimento responsável em Polygon.">
    <meta name="twitter:image" content="https://lubdanv3.vercel.app/images/lubdan-og-image.avif">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="/images/leprechaun-lubdan-transparent.avif" as="image" type="image/avif" fetchpriority="high">
    <link rel="preload" href="/images/token.avif" as="image" type="image/avif">
    
    <!-- Prefetch non-critical assets -->
    <link rel="prefetch" href="/images/background.avif" as="image" type="image/avif">
    
    <style>
        :root {
            --background: #1B1026;
            --foreground: #F5F5F5;
            --primary: #F5C36A;
            --secondary: #8B5CF6;
            --border: #E6B85C;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: var(--background);
            color: var(--foreground);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            background: transparent;
            padding: 1.25rem 1rem;
            border-bottom: 1px solid transparent;
            transition: all 0.3s;
        }
        
        header.scrolled {
            background: rgba(27, 16, 38, 0.95);
            border-bottom-color: rgba(230, 184, 92, 0.3);
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 900;
            color: var(--primary);
            text-decoration: none;
            font-family: 'Cinzel Decorative', serif;
        }
        
        main {
            padding-top: 6rem;
            padding-bottom: 3rem;
        }
        
        .hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
            min-height: 600px;
            margin-bottom: 4rem;
        }
        
        @media (max-width: 768px) {
            .hero {
                grid-template-columns: 1fr;
                gap: 2rem;
                min-height: auto;
            }
        }
        
        .hero-content h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 1rem;
            line-height: 1.2;
            font-family: 'Cinzel Decorative', serif;
        }
        
        @media (max-width: 768px) {
            .hero-content h1 {
                font-size: 1.875rem;
            }
        }
        
        .hero-content p {
            font-size: 1.125rem;
            color: rgba(245, 245, 245, 0.9);
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .cta-button {
            display: inline-block;
            padding: 1rem 2rem;
            background-color: var(--primary);
            color: var(--background);
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 700;
            font-size: 1rem;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            margin-right: 1rem;
            margin-bottom: 1rem;
        }
        
        .cta-button:hover {
            background-color: #FFD77A;
            transform: translateY(-2px);
        }
        
        .cta-secondary {
            background-color: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
        }
        
        .cta-secondary:hover {
            background-color: var(--primary);
            color: var(--background);
        }
        
        .hero-image {
            text-align: center;
        }
        
        .hero-image img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
        }
        
        .feature {
            padding: 2rem;
            background: rgba(46, 28, 77, 0.5);
            border: 1px solid rgba(230, 184, 92, 0.3);
            border-radius: 0.5rem;
        }
        
        .feature h3 {
            color: var(--primary);
            margin-bottom: 0.5rem;
            font-family: 'Cinzel Decorative', serif;
        }
        
        .feature p {
            color: rgba(245, 245, 245, 0.8);
            font-size: 0.95rem;
        }
        
        .noscript {
            background: rgba(139, 92, 246, 0.1);
            border: 1px solid var(--secondary);
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 2rem 0;
            color: var(--foreground);
        }
    </style>
</head>
<body>
    <header id="header">
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo">LUBDAN</a>
                <nav style="display: none;">
                    <a href="/presale" style="color: var(--foreground); text-decoration: none; margin-right: 2rem;">Presale</a>
                    <a href="/dashboard" style="color: var(--foreground); text-decoration: none;">Dashboard</a>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <section class="hero">
                <div class="hero-content">
                    <h1>Lubdan (LBD)</h1>
                    <p>Um projeto blockchain de sustentabilidade, transparência on-chain e crescimento responsável em Polygon. Implementa um modelo de distribuição de dividendos em MATIC apoiado por receita operacional e executado através de contratos inteligentes verificáveis.</p>
                    
                    <div>
                        <a href="/presale" class="cta-button">Participar da Pré-venda →</a>
                        <a href="/whitepaper" class="cta-button cta-secondary">Whitepaper</a>
                    </div>
                </div>
                
                <div class="hero-image">
                    <picture>
                        <source srcSet="/images/leprechaun-lubdan-transparent.avif" type="image/avif">
                        <img 
                            src="/images/leprechaun-lubdan-transparent.png" 
                            alt="Lubdan Mascot" 
                            width="450"
                            height="500"
                            style="max-width: 100%; height: auto;"
                        />
                    </picture>
                </div>
            </section>
            
            <section class="features">
                <div class="feature">
                    <h3>🛡️ Contrato Auditado</h3>
                    <p>Segurança verificada por especialistas em blockchain.</p>
                </div>
                <div class="feature">
                    <h3>⚡ Dividendos Instantâneos</h3>
                    <p>Receba recompensas automaticamente em MATIC.</p>
                </div>
                <div class="feature">
                    <h3>🌱 Sustentável</h3>
                    <p>Modelo econômico responsável e transparente.</p>
                </div>
            </section>
        </div>
    </main>

    <noscript>
        <div class="noscript">
            <strong>JavaScript é necessário para funcionalidades avançadas.</strong> A página está visível, mas algumas features podem não funcionar. <a href="#" style="color: var(--primary);">Ativar JavaScript</a> para melhor experiência.
        </div>
    </noscript>

    <script>
        // Add scroll listener for header
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    </script>
    
    <!-- React App (hydration) -->
    <div id="root"></div>
    <script type="module" src="/assets/index-Dj7fEVPw.js"></script>
</body>
</html>`;

// Write the pre-rendered HTML
fs.writeFileSync(indexPath, prerenderedHtml, 'utf-8');

console.log('✅ Pre-rendered HOME HTML generated successfully!');
console.log(`📄 File: ${indexPath}`);
console.log('✨ HTML now contains hero, CTA, and images for better FCP/LCP');
