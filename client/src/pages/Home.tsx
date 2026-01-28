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
        {/* Galaxy background - full coverage */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/galaxy-bg.png')" }}
        />
        
        {/* Clouds at top - transparent PNG overlay */}
        <div 
          className="absolute top-0 left-0 right-0 h-[50vh] bg-contain bg-top bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url('/images/clouds-top.png')", backgroundSize: "100% auto" }}
        />
        
        {/* Mountains at bottom - transparent PNG overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[45vh] bg-contain bg-bottom bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url('/images/mountains.png')", backgroundSize: "100% auto" }}
        />
        
        {/* Castle on left - subtle in background */}
        <div 
          className="absolute top-[10%] left-[2%] w-[150px] h-[180px] lg:w-[200px] lg:h-[240px] bg-contain bg-no-repeat opacity-40 pointer-events-none hidden md:block"
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
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start pt-4 md:pt-8 px-4">
        {/* Leprechaun Character with Floating Card */}
        <motion.div 
          className="relative w-full max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/images/leprechaun-hero.png" 
            alt="Lubdan Leprechaun" 
            className="w-full h-auto drop-shadow-[0_0_40px_rgba(245,195,106,0.5)]"
          />
          
          {/* Floating Card with Partners & Chart */}
          <motion.div 
            className="absolute top-[15%] right-[-5%] md:right-[-15%] lg:right-[-20%] bg-[#1a1035]/70 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 shadow-2xl min-w-[160px] md:min-w-[200px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Top Partner Icons Row */}
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/partner-logos.png" alt="Partners" className="w-8 h-8 rounded-full object-cover object-left" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
                <span className="text-white text-xs font-bold">&#8734;</span>
              </div>
            </div>
            
            {/* CoinGecko */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">G</span>
              </div>
              <span className="text-foreground/80 text-sm">CoinGecko</span>
            </div>
            
            {/* CoinMarketCap */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">M</span>
              </div>
              <span className="text-foreground/80 text-sm">CoinMarketCap</span>
            </div>
            
            {/* Chart Line */}
            <div className="h-10 w-full mb-3">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,25 Q15,22 25,20 T45,18 T65,12 T85,8 T100,3" 
                  stroke="url(#chartGradient)" 
                  strokeWidth="2.5" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Buy Now Button */}
            <Link href="/presale">
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30"
              >
                Buy Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Cards Grid - 3 Cards */}
        <motion.div 
          className="grid grid-cols-3 gap-3 md:gap-5 max-w-xl mx-auto mt-6 md:mt-10 px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <FeatureCard 
            gradient="from-amber-600/20 to-amber-900/30"
            borderColor="border-amber-500/40"
          >
            {/* Treasure chest with dice */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-14 md:w-20 md:h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg shadow-lg" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded transform rotate-12" />
                <div className="absolute -bottom-2 left-2 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded transform -rotate-6" />
              </div>
            </div>
          </FeatureCard>
          
          <FeatureCard 
            gradient="from-purple-600/20 to-purple-900/30"
            borderColor="border-purple-500/40"
          >
            {/* Crystal ball with coins */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-purple-700 rounded-full shadow-lg shadow-purple-500/50" />
                <div className="absolute -bottom-2 -left-3 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full" />
                <div className="absolute -bottom-1 left-3 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full" />
              </div>
            </div>
          </FeatureCard>
          
          <FeatureCard 
            gradient="from-amber-600/20 to-orange-900/30"
            borderColor="border-amber-500/40"
          >
            {/* Gold coins stack */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="flex items-end gap-1">
                  <div className="flex flex-col gap-0.5">
                    <div className="w-5 h-2 md:w-6 md:h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded" />
                    <div className="w-5 h-2 md:w-6 md:h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded" />
                    <div className="w-5 h-2 md:w-6 md:h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="w-5 h-2 md:w-6 md:h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded" />
                    <div className="w-5 h-2 md:w-6 md:h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded" />
                    <div className="w-5 h-2 md:w-6 md:h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded" />
                    <div className="w-5 h-2 md:w-6 md:h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded" />
                  </div>
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-amber-300 to-amber-500 rounded transform rotate-12 shadow-lg" />
                </div>
              </div>
            </div>
          </FeatureCard>
        </motion.div>

        {/* Bottom Icons Row - Security, Polygon, Fire */}
        <motion.div 
          className="flex items-center justify-center gap-10 md:gap-16 mt-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <BottomIcon color="green">
            <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />
          </BottomIcon>
          <BottomIcon color="purple">
            <Box className="w-7 h-7 md:w-8 md:h-8" />
          </BottomIcon>
          <BottomIcon color="orange">
            <Flame className="w-7 h-7 md:w-8 md:h-8" />
          </BottomIcon>
        </motion.div>
      </main>

      {/* Features Section with Gold Icons */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8 text-gold-glow">
            {t('home.features.title') || 'Key Features'}
          </h2>
          
          {/* Features Icons Image */}
          <div className="flex justify-center">
            <img 
              src="/images/features-icons.png" 
              alt="Features - Fair Presale, Anti-Dump, Airdrop, Polygon, Security/Audit" 
              className="max-w-full h-auto max-h-56 md:max-h-64 object-contain drop-shadow-[0_0_20px_rgba(245,195,106,0.3)]"
            />
          </div>
        </div>
      </section>

      {/* Listed On Section */}
      <section className="relative z-10 py-10 px-4 bg-background/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-gold-glow">
            {t('home.listed_on.title') || 'Listed On'}
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <img 
              src="/images/partner-logos.png" 
              alt="CoinGecko, CoinMarketCap, and Partner Logos" 
              className="max-w-full h-auto max-h-16 md:max-h-20 object-contain drop-shadow-[0_0_15px_rgba(245,195,106,0.2)]"
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
      className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all ${
        active 
          ? "bg-purple-600/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
          : "bg-[#2a1f4e]/60 text-primary/70 hover:bg-[#2a1f4e]/90 hover:text-primary border border-purple-500/30"
      }`}
    >
      {children}
    </div>
  );
}

// Feature Card Component
function FeatureCard({ 
  children, 
  gradient, 
  borderColor 
}: { 
  children: React.ReactNode; 
  gradient: string;
  borderColor: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border ${borderColor} bg-gradient-to-br ${gradient} backdrop-blur-sm aspect-square flex items-center justify-center p-3 md:p-4 hover:scale-105 transition-transform duration-300 shadow-lg`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Bottom Icon Component
function BottomIcon({ children, color }: { children: React.ReactNode; color: 'green' | 'purple' | 'orange' }) {
  const colorClasses = {
    green: "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]",
    purple: "text-purple-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]",
    orange: "text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
  };
  
  return (
    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${colorClasses[color]} hover:scale-110 transition-transform cursor-pointer`}>
      {children}
    </div>
  );
}
