import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Suspense, lazy } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home as HomeIcon, FileText, Star, Play, ShieldCheck, Flame, Box } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load heavy components
const Newsletter = lazy(() => import("@/components/Newsletter"));

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background - Galaxy with layers */}
      <div className="fixed inset-0 z-0">
        {/* Galaxy background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/galaxy-bg.png')" }}
        />
        
        {/* Clouds at top */}
        <div 
          className="absolute top-0 left-0 right-0 h-[40vh] bg-contain bg-top bg-no-repeat opacity-60 pointer-events-none"
          style={{ backgroundImage: "url('/images/clouds-top.png')" }}
        />
        
        {/* Mountains at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[50vh] bg-contain bg-bottom bg-no-repeat opacity-70 pointer-events-none"
          style={{ backgroundImage: "url('/images/mountains.png')" }}
        />
        
        {/* Castle on left */}
        <div 
          className="absolute top-[15%] left-[2%] w-[180px] h-[200px] lg:w-[220px] lg:h-[260px] bg-contain bg-no-repeat opacity-50 pointer-events-none hidden md:block"
          style={{ backgroundImage: "url('/images/castle.png')" }}
        />
      </div>

      {/* Navigation Bar */}
      <header className="relative z-50 pt-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left Nav Icons */}
          <nav className="flex items-center gap-2">
            <Link href="/">
              <NavIcon active>
                <HomeIcon className="w-5 h-5" />
              </NavIcon>
            </Link>
            <Link href="/whitepaper">
              <NavIcon>
                <FileText className="w-5 h-5" />
              </NavIcon>
            </Link>
            <Link href="/roadmap">
              <NavIcon>
                <Star className="w-5 h-5" />
              </NavIcon>
            </Link>
            <Link href="/tokenomics">
              <NavIcon>
                <Play className="w-5 h-5" />
              </NavIcon>
            </Link>
          </nav>

          {/* Connect Wallet Button */}
          <Link href="/presale">
            <Button 
              className="bg-transparent border-2 border-primary text-primary font-bold px-6 py-2 rounded-full hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(245,195,106,0.3)]"
            >
              Connect Wallet
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start pt-8 px-4">
        {/* Leprechaun Character */}
        <motion.div 
          className="relative w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/images/leprechaun-hero.png" 
            alt="Lubdan Leprechaun" 
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(245,195,106,0.4)]"
          />
          
          {/* Floating Card with Partners */}
          <motion.div 
            className="absolute top-[20%] right-[-10%] md:right-[-20%] bg-card/30 backdrop-blur-md border border-primary/30 rounded-2xl p-4 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Partner Logos Row */}
            <div className="flex items-center gap-3 mb-3">
              <img src="/partners/coinmarketcap.png" alt="CoinMarketCap" className="w-8 h-8 rounded-full" />
              <div className="w-8 h-8 rounded-full bg-purple-600/50 flex items-center justify-center">
                <span className="text-white text-xs font-bold">&#8734;</span>
              </div>
            </div>
            
            {/* CoinGecko */}
            <div className="flex items-center gap-2 mb-2">
              <img src="/partners/coingecko.png" alt="CoinGecko" className="w-5 h-5 rounded-full" />
              <span className="text-foreground/80 text-sm">CoinGecko</span>
            </div>
            
            {/* CoinMarketCap */}
            <div className="flex items-center gap-2 mb-3">
              <img src="/partners/coinmarketcap.png" alt="CoinMarketCap" className="w-5 h-5 rounded-full" />
              <span className="text-foreground/80 text-sm">CoinMarketCap</span>
            </div>
            
            {/* Chart Line */}
            <div className="h-8 w-full">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <path 
                  d="M0,25 Q20,20 30,22 T50,15 T70,18 T100,5" 
                  stroke="#10B981" 
                  strokeWidth="2" 
                  fill="none"
                />
              </svg>
            </div>
            
            {/* Buy Now Button */}
            <Link href="/presale">
              <Button 
                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold rounded-xl"
              >
                Buy Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <FeatureCard 
            image="/images/features/treasure.png"
            fallbackIcon={<Star className="w-10 h-10 text-primary" />}
          />
          <FeatureCard 
            image="/images/features/crystal-ball.png"
            fallbackIcon={<Box className="w-10 h-10 text-purple-400" />}
          />
          <FeatureCard 
            image="/images/features/coins.png"
            fallbackIcon={<Flame className="w-10 h-10 text-amber-500" />}
          />
        </motion.div>

        {/* Bottom Icons Row */}
        <motion.div 
          className="flex items-center justify-center gap-8 mt-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <BottomIcon color="green">
            <ShieldCheck className="w-6 h-6" />
          </BottomIcon>
          <BottomIcon color="purple">
            <Box className="w-6 h-6" />
          </BottomIcon>
          <BottomIcon color="orange">
            <Flame className="w-6 h-6" />
          </BottomIcon>
        </motion.div>
      </main>

      {/* Features Section with Gold Icons */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-gold-glow">
            {t('home.features.title') || 'Key Features'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <GoldFeature title="Fair Presale" />
            <GoldFeature title="Anti-Dump" />
            <GoldFeature title="Airdrop" />
            <GoldFeature title="Polygon" />
            <GoldFeature title="Security / Audit" />
          </div>
          
          {/* Features Icons Image */}
          <div className="mt-8 flex justify-center">
            <img 
              src="/images/features-icons.png" 
              alt="Features" 
              className="max-w-full h-auto max-h-48 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Listed On Section */}
      <section className="relative z-10 py-12 px-4 bg-background/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-gold-glow">
            {t('home.listed_on.title') || 'Listed On'}
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <img 
              src="/images/partner-logos.png" 
              alt="Partner Logos" 
              className="max-w-full h-auto max-h-20 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Suspense fallback={<div className="h-48" />}>
        <div className="relative z-10">
          <Newsletter />
        </div>
      </Suspense>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/20 bg-background/50 backdrop-blur-sm py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/token.png" alt="Lubdan" className="w-8 h-8" />
            <span className="font-display text-xl font-bold text-primary">LUBDAN</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Lubdan. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="https://x.com/ludbanlbd?s=21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Navigation Icon Component
function NavIcon({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div 
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
        active 
          ? "bg-purple-600/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
          : "bg-card/50 text-primary/70 hover:bg-card/80 hover:text-primary border border-primary/20"
      }`}
    >
      {children}
    </div>
  );
}

// Feature Card Component
function FeatureCard({ image, fallbackIcon }: { image: string; fallbackIcon: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-card/30 backdrop-blur-sm aspect-square flex items-center justify-center p-4 hover:border-primary/60 transition-all group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-50" />
      <img 
        src={image} 
        alt="Feature" 
        className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="hidden absolute inset-0 flex items-center justify-center">
        {fallbackIcon}
      </div>
    </div>
  );
}

// Bottom Icon Component
function BottomIcon({ children, color }: { children: React.ReactNode; color: 'green' | 'purple' | 'orange' }) {
  const colorClasses = {
    green: "text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]",
    purple: "text-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.5)]",
    orange: "text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
  };
  
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
      {children}
    </div>
  );
}

// Gold Feature Component
function GoldFeature({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-primary/80 text-sm font-medium">{title}</span>
    </div>
  );
}
