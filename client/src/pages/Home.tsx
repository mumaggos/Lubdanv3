import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { safeStorage } from "@/lib/storage";
import { PRESALE_CONFIG } from "@/lib/contracts";

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

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Presale data - will show real data when connected to chain
  const presaleData = {
    currentPhase: 1,
    price: PRESALE_CONFIG.PHASE_1.PRICE,
    totalSold: 1200000,
    phase1Remaining: 5100000,
    phase2Remaining: PRESALE_CONFIG.PHASE_2.ALLOCATION,
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubscribeStatus("loading");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "22edb0ef-21a2-4381-a930-0be17f2c6b7a",
          subject: "New Newsletter Subscriber - Lubdan",
          from_name: "Lubdan Newsletter",
          email: email,
          message: `New subscriber: ${email}`,
        }),
      });

      if (response.ok) {
        setSubscribeStatus("success");
        setEmail("");
        const subscribers = JSON.parse(safeStorage.getItem("lubdan_subscribers") || "[]");
        subscribers.push({ email, subscribedAt: new Date().toISOString() });
        safeStorage.setItem("lubdan_subscribers", JSON.stringify(subscribers));
        setTimeout(() => setSubscribeStatus("idle"), 3000);
      } else {
        setSubscribeStatus("error");
        setTimeout(() => setSubscribeStatus("idle"), 3000);
      }
    } catch {
      setSubscribeStatus("error");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Image - Full screen */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2892-ectwXQjeNCvTClnMtgwdEoLpmfMWbD.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ========== HEADER - Desktop ========== */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block",
          scrolled ? "pt-2" : "pt-4"
        )}
      >
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex items-center justify-between bg-[rgba(10,20,10,0.85)] border border-[#d4af37]/50 rounded-lg px-6 py-3 backdrop-blur-sm">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center gap-2">
                <CloverIcon className="w-8 h-8 text-[#2d8a2d]" />
                <span className="text-xl font-bold text-[#d4af37] tracking-wide">LUBDAN</span>
              </a>
            </Link>

            {/* Nav Items */}
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a className="flex items-center gap-1 text-sm text-white/80 hover:text-[#d4af37] transition-colors">
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Social + Connect */}
            <div className="flex items-center gap-5">
              <a href="https://x.com/ludbanlbd" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#d4af37]/70 transition-colors">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#d4af37]/70 transition-colors">
                <TelegramIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#d4af37]/70 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <Link href="/presale">
                <Button className="bg-[#2d8a2d] hover:bg-[#2d8a2d]/90 text-white font-medium px-5 py-2 h-auto rounded-md text-sm">
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ========== HEADER - Mobile ========== */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300",
        scrolled ? "pt-2" : "pt-3"
      )}>
        <div className="mx-4">
          <div className="flex items-center justify-between bg-[rgba(10,20,10,0.9)] border border-[#d4af37]/50 rounded-lg px-4 py-3 backdrop-blur-sm">
            <Link href="/">
              <a className="flex items-center gap-2">
                <CloverIcon className="w-7 h-7 text-[#2d8a2d]" />
                <span className="text-lg font-bold text-[#d4af37] tracking-wide">LUBDAN</span>
              </a>
            </Link>
            <button 
              className="text-[#d4af37] p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-[72px] z-40 lg:hidden"
          >
            <div className="bg-[rgba(10,20,10,0.95)] border border-[#d4af37]/50 rounded-lg p-4 backdrop-blur-sm">
              {/* Top bar with icons */}
              <div className="flex items-center justify-center gap-4 pb-4 border-b border-[#d4af37]/30">
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
                  <Button size="sm" className="bg-[#2d8a2d] text-white text-xs px-3 h-8 rounded">
                    Connect
                  </Button>
                </Link>
              </div>
              {/* Nav links */}
              <div className="pt-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a 
                      className="text-base text-white/90 hover:text-[#d4af37] py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-grow relative z-10 pt-24 lg:pt-28 px-4">
        <div className="max-w-[1200px] mx-auto">
          
          {/* ===== HERO SECTION ===== */}
          <section className="min-h-[50vh] lg:min-h-[55vh] flex items-center">
            <div className="w-full lg:w-1/2 lg:ml-auto text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Title - Serif italic gold */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-tight mb-4">
                  <span className="text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                    Where Strategy Meets Luck
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
                  A long-term Polygon project with real MATIC dividends.
                </p>

                {/* CTA Buttons - 3 in a row on desktop, stacked on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/presale">
                    <button className="w-full sm:w-auto px-6 py-3 bg-[rgba(15,25,15,0.8)] border border-[#d4af37]/60 rounded-lg text-white font-medium hover:bg-[rgba(25,40,25,0.9)] transition-colors flex items-center justify-center gap-2">
                      Join Presale <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <a href="https://global.transak.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 bg-[rgba(15,25,15,0.8)] border border-[#d4af37]/60 rounded-lg text-white font-medium hover:bg-[rgba(25,40,25,0.9)] transition-colors flex items-center justify-center gap-2">
                      Buy with Card <ArrowRight className="w-4 h-4" />
                    </button>
                  </a>
                  <Link href="/whitepaper">
                    <button className="w-full sm:w-auto px-6 py-3 bg-[rgba(15,25,15,0.8)] border border-[#d4af37]/60 rounded-lg text-white font-medium hover:bg-[rgba(25,40,25,0.9)] transition-colors flex items-center justify-center gap-2">
                      Read Whitepaper <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ===== STATS CARDS ===== */}
          <section className="py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Current Phase */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[rgba(15,25,15,0.85)] border border-[#d4af37]/50 rounded-lg p-5"
              >
                <p className="text-sm text-white/60 mb-1">Current Phase:</p>
                <p className="text-xl font-display font-semibold text-white">
                  Phase {presaleData.currentPhase} - <span className="text-[#d4af37]">${presaleData.price.toFixed(2)}</span>
                </p>
              </motion.div>

              {/* LBD Sold */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[rgba(15,25,15,0.85)] border border-[#d4af37]/50 rounded-lg p-5"
              >
                <p className="text-sm text-white/60 mb-1">LBD Sold:</p>
                <p className="text-xl font-display font-semibold">
                  <span className="text-[#d4af37]">{formatNumber(presaleData.totalSold)}</span>
                  <span className="text-white/70 text-base ml-1">LBD</span>
                </p>
              </motion.div>

              {/* Phase 1 Remaining */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[rgba(15,25,15,0.85)] border border-[#d4af37]/50 rounded-lg p-5"
              >
                <p className="text-sm text-white/60 mb-1">Phase 1 Remaining:</p>
                <p className="text-xl font-display font-semibold">
                  <span className="text-[#d4af37]">{formatNumber(presaleData.phase1Remaining)}</span>
                  <span className="text-white/70 text-base ml-1">LBD</span>
                </p>
              </motion.div>

              {/* Phase 2 Remaining */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-[rgba(15,25,15,0.85)] border border-[#d4af37]/50 rounded-lg p-5"
              >
                <p className="text-sm text-white/60 mb-1">Phase 2 Remaining:</p>
                <p className="text-xl font-display font-semibold">
                  <span className="text-[#d4af37]">{formatNumber(presaleData.phase2Remaining)}</span>
                  <span className="text-white/70 text-base ml-1">LBD</span>
                </p>
              </motion.div>
            </div>
          </section>

          {/* ===== BOTTOM SECTION - Dividends + Subscribe ===== */}
          <section className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Earn MATIC Dividends */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[rgba(15,25,15,0.85)] border border-[#d4af37]/50 rounded-lg p-5 flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-lg bg-[#8247e5]/20 flex items-center justify-center flex-shrink-0">
                <PolygonIcon className="w-9 h-9 text-[#8247e5]" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-white mb-1">
                  Earn MATIC Dividends
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-sm">
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
              className="bg-[rgba(15,25,15,0.85)] border border-[#d4af37]/50 rounded-lg p-5"
            >
              <h3 className="text-lg font-display font-semibold text-white mb-3">
                Subscribe for Updates
              </h3>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeStatus === "loading"}
                  className="flex-1 bg-[rgba(10,15,10,0.6)] border-[#d4af37]/30 text-white placeholder:text-white/40 h-10"
                />
                <Button 
                  type="submit"
                  disabled={subscribeStatus === "loading" || subscribeStatus === "success"}
                  className="bg-[#2d8a2d] hover:bg-[#2d8a2d]/90 text-white font-medium px-5 h-10 rounded-md text-sm"
                >
                  {subscribeStatus === "loading" ? "..." : subscribeStatus === "success" ? "Done!" : "Subscribe"}
                  {subscribeStatus === "idle" && <ArrowRight className="ml-1 w-4 h-4" />}
                </Button>
              </form>
            </motion.div>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="py-6 text-center border-t border-[#d4af37]/20 mt-4">
            <p className="text-white/60 text-sm">
              Support: <a href="mailto:lubdan.info@gmail.com" className="text-[#d4af37] hover:underline">lubdan.info@gmail.com</a>
            </p>
          </footer>
        </div>
      </main>

      {/* ===== FLOATING TELEGRAM BUTTON ===== */}
      <motion.a
        href="https://t.me/LubdanOfficial"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#3ab4f2] to-[#0088cc] shadow-lg shadow-blue-500/30 flex items-center justify-center"
      >
        <TelegramIcon className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}
