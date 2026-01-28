import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Clover icon - matches reference exactly
function CloverIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 20 C50 10, 40 0, 30 0 C15 0, 10 15, 10 25 C10 40, 25 50, 50 50 C25 50, 10 60, 10 75 C10 85, 15 100, 30 100 C40 100, 50 90, 50 80 C50 90, 60 100, 70 100 C85 100, 90 85, 90 75 C90 60, 75 50, 50 50 C75 50, 90 40, 90 25 C90 15, 85 0, 70 0 C60 0, 50 10, 50 20Z"/>
      <rect x="47" y="80" width="6" height="20" rx="2"/>
    </svg>
  );
}

// X (Twitter) icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// Telegram icon
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

// Instagram icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

// Polygon icon
function PolygonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38.4 33.5" className={className} fill="currentColor">
      <path d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.6c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0l4.3,2.6c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1l-4.2,2.5c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1v-3.2l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
    </svg>
  );
}

// Presale data - placeholders until wired to chain
const PRESALE_DATA = {
  currentPhase: 1,
  price: 0.20,
  totalSold: 1200000,
  phase1Remaining: 5100000,
  phase2Remaining: 3150000,
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Presale", path: "/presale", hasDropdown: true },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Tokenomics", path: "/tokenomics" },
    { label: "Whitepaper", path: "/whitepaper" },
    { label: "Roadmap", path: "/roadmap" },
  ];

  const formatNumber = (num: number) => num.toLocaleString("en-US");

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050805]">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a0a] via-[#050805] to-[#080c08]" />
        
        {/* Generated cinematic background */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Green glow top */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#1a5a1a]/20 rounded-full blur-[150px]" />
        
        {/* Gold accent glow */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-[#d4af37]/10 rounded-full blur-[120px]" />
        
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
      </div>

      {/* Leprechaun Character - Desktop only, positioned left */}
      <div className="hidden lg:block fixed left-0 bottom-0 z-10 pointer-events-none" style={{ width: "45%", maxWidth: "600px" }}>
        <img 
          src="/images/leprechaun-lubdan.png" 
          alt="" 
          className="w-full h-auto object-contain drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 0 40px rgba(212,175,55,0.3))" }}
        />
      </div>

      {/* ===== HEADER - Desktop ===== */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 hidden lg:block transition-all duration-300",
        scrolled ? "pt-2" : "pt-4"
      )}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div 
            className="flex items-center justify-between rounded-xl px-6 py-3"
            style={{ 
              backgroundColor: "rgba(8,15,8,0.85)", 
              border: "1px solid rgba(212,175,55,0.4)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,175,55,0.1)"
            }}
          >
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center gap-3">
                <CloverIcon className="w-9 h-9 text-[#2d8a2d] drop-shadow-[0_0_8px_rgba(45,138,45,0.5)]" />
                <span className="text-2xl font-bold tracking-wider text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">LUBDAN</span>
              </a>
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a className="flex items-center gap-1 text-sm text-white/80 hover:text-[#d4af37] transition-colors font-medium">
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Social + Connect */}
            <div className="flex items-center gap-5">
              <a href="https://x.com/ludbanlbd" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#f5d76e] transition-colors">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#f5d76e] transition-colors">
                <TelegramIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#f5d76e] transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <Link href="/presale">
                <Button 
                  className="text-white font-semibold px-5 py-2.5 h-auto rounded-lg text-sm bg-[#2d8a2d] hover:bg-[#3a9a3a] shadow-[0_0_20px_rgba(45,138,45,0.3)]"
                >
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===== HEADER - Mobile ===== */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300",
        scrolled ? "pt-2" : "pt-3"
      )}>
        <div className="mx-4">
          <div 
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ 
              backgroundColor: "rgba(8,15,8,0.9)", 
              border: "1px solid rgba(212,175,55,0.4)",
              backdropFilter: "blur(12px)"
            }}
          >
            <Link href="/">
              <a className="flex items-center gap-2">
                <CloverIcon className="w-8 h-8 text-[#2d8a2d]" />
                <span className="text-xl font-bold tracking-wider text-[#d4af37]">LUBDAN</span>
              </a>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#d4af37] p-1">
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[76px] z-40 lg:hidden"
          >
            <div 
              className="rounded-xl p-4"
              style={{ 
                backgroundColor: "rgba(8,15,8,0.95)", 
                border: "1px solid rgba(212,175,55,0.4)",
                backdropFilter: "blur(12px)"
              }}
            >
              {/* Social row - matches mobile reference */}
              <div className="flex items-center justify-center gap-4 pb-4 mb-4 border-b border-[#d4af37]/30">
                <CloverIcon className="w-6 h-6 text-[#2d8a2d]" />
                <a href="https://x.com/ludbanlbd" target="_blank" rel="noopener noreferrer" className="text-[#d4af37]">
                  <XIcon className="w-5 h-5" />
                </a>
                <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer" className="text-[#d4af37]">
                  <TelegramIcon className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#d4af37]">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <Link href="/presale">
                  <Button size="sm" className="text-white text-xs px-4 h-8 rounded-lg bg-[#2d8a2d] hover:bg-[#3a9a3a]">
                    Connect
                  </Button>
                </Link>
              </div>
              {/* Nav items */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a 
                      className="text-base text-white/90 hover:text-[#d4af37] py-3 px-2 rounded-lg hover:bg-white/5 transition-colors" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative z-20 pt-24 lg:pt-32 px-4 lg:px-6">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Hero Section - Text on right side (desktop) */}
          <section className="min-h-[45vh] lg:min-h-[50vh] flex items-center">
            <div className="w-full lg:w-1/2 lg:ml-auto text-center lg:text-left lg:pr-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Main Title - Serif italic gold, exact match */}
                <h1 
                  className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[56px] leading-[1.15] mb-5"
                  style={{ 
                    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif", 
                    fontStyle: "italic", 
                    color: "#d4af37",
                    textShadow: "0 2px 20px rgba(212,175,55,0.3)"
                  }}
                >
                  Where Strategy Meets Luck
                </h1>
                
                {/* Subtitle */}
                <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-white/75 mb-8 max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
                  A long-term Polygon project with real MATIC dividends.
                </p>

                {/* CTA Buttons - 3 in a row on desktop, stacked on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/presale">
                    <button 
                      className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all hover:bg-[#1a2a1a]/90"
                      style={{ 
                        backgroundColor: "rgba(15,25,15,0.75)", 
                        border: "1px solid rgba(212,175,55,0.5)",
                        boxShadow: "0 2px 15px rgba(0,0,0,0.2)"
                      }}
                    >
                      Join Presale <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <a href="https://global.transak.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <button 
                      className="w-full px-6 py-3.5 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all hover:bg-[#1a2a1a]/90"
                      style={{ 
                        backgroundColor: "rgba(15,25,15,0.75)", 
                        border: "1px solid rgba(212,175,55,0.5)",
                        boxShadow: "0 2px 15px rgba(0,0,0,0.2)"
                      }}
                    >
                      Buy with Card <ArrowRight className="w-4 h-4" />
                    </button>
                  </a>
                  <Link href="/whitepaper">
                    <button 
                      className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all hover:bg-[#1a2a1a]/90"
                      style={{ 
                        backgroundColor: "rgba(15,25,15,0.75)", 
                        border: "1px solid rgba(212,175,55,0.5)",
                        boxShadow: "0 2px 15px rgba(0,0,0,0.2)"
                      }}
                    >
                      Read Whitepaper <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stats Cards - 4 columns on desktop, stacked on mobile */}
          <section className="py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Current Phase */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl p-5"
                style={{ 
                  backgroundColor: "rgba(12,22,12,0.8)", 
                  border: "1px solid rgba(212,175,55,0.45)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
                }}
              >
                <p className="text-sm text-white/55 mb-2">Current Phase:</p>
                <p className="text-[22px] font-semibold text-white">
                  Phase {PRESALE_DATA.currentPhase} - <span className="text-[#d4af37]">${PRESALE_DATA.price.toFixed(2)}</span>
                </p>
              </motion.div>

              {/* LBD Sold */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-xl p-5"
                style={{ 
                  backgroundColor: "rgba(12,22,12,0.8)", 
                  border: "1px solid rgba(212,175,55,0.45)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
                }}
              >
                <p className="text-sm text-white/55 mb-2">LBD Sold:</p>
                <p className="text-[22px] font-semibold">
                  <span className="text-[#d4af37]">{formatNumber(PRESALE_DATA.totalSold)}</span>
                  <span className="text-white/60 text-base ml-2">LBD</span>
                </p>
              </motion.div>

              {/* Phase 1 Remaining */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl p-5"
                style={{ 
                  backgroundColor: "rgba(12,22,12,0.8)", 
                  border: "1px solid rgba(212,175,55,0.45)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
                }}
              >
                <p className="text-sm text-white/55 mb-2">Phase 1 Remaining:</p>
                <p className="text-[22px] font-semibold">
                  <span className="text-[#d4af37]">{formatNumber(PRESALE_DATA.phase1Remaining)}</span>
                  <span className="text-white/60 text-base ml-2">LBD</span>
                </p>
              </motion.div>

              {/* Phase 2 Remaining */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-xl p-5"
                style={{ 
                  backgroundColor: "rgba(12,22,12,0.8)", 
                  border: "1px solid rgba(212,175,55,0.45)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
                }}
              >
                <p className="text-sm text-white/55 mb-2">Phase 2 Remaining:</p>
                <p className="text-[22px] font-semibold">
                  <span className="text-[#d4af37]">{formatNumber(PRESALE_DATA.phase2Remaining)}</span>
                  <span className="text-white/60 text-base ml-2">LBD</span>
                </p>
              </motion.div>
            </div>
          </section>

          {/* Bottom Section - Dividends + Subscribe side by side */}
          <section className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Earn MATIC Dividends */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-5 flex items-center gap-5"
              style={{ 
                backgroundColor: "rgba(12,22,12,0.8)", 
                border: "1px solid rgba(212,175,55,0.45)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
              }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(130,71,229,0.15)" }}
              >
                <PolygonIcon className="w-10 h-10 text-[#8247e5]" />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-white mb-1">Earn MATIC Dividends</h3>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <PolygonIcon className="w-4 h-4" />
                  <span>Polygon</span>
                </div>
              </div>
            </motion.div>

            {/* Subscribe for Updates */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-xl p-5"
              style={{ 
                backgroundColor: "rgba(12,22,12,0.8)", 
                border: "1px solid rgba(212,175,55,0.45)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
              }}
            >
              <h3 className="text-[18px] font-semibold text-white mb-4">Subscribe for Updates</h3>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-11 text-white placeholder:text-white/35 bg-[#0a150a]/60 border-[#d4af37]/25 focus:border-[#d4af37]/50 rounded-lg"
                />
                <Button 
                  type="submit" 
                  className="text-white font-semibold px-5 h-11 rounded-lg text-sm bg-[#2d8a2d] hover:bg-[#3a9a3a] shadow-[0_0_15px_rgba(45,138,45,0.25)]"
                >
                  Subscribe <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center border-t border-[#d4af37]/20 mt-4">
            <p className="text-white/50 text-sm">
              Support: <a href="mailto:lubdan.info@gmail.com" className="text-[#d4af37] hover:underline">lubdan.info@gmail.com</a>
            </p>
          </footer>
        </div>
      </main>

      {/* Floating Telegram Button - Blue gradient, matches reference */}
      <motion.a
        href="https://t.me/LubdanOfficial"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
        style={{ 
          background: "linear-gradient(135deg, #3ab4f2 0%, #0088cc 100%)", 
          boxShadow: "0 6px 25px rgba(0,136,204,0.45)" 
        }}
      >
        <TelegramIcon className="w-8 h-8 text-white" />
      </motion.a>
    </div>
  );
}
