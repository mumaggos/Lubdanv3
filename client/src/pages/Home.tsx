import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Menu, X, Send, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect, Suspense, lazy } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { safeStorage } from "@/lib/storage";
import { PRESALE_CONFIG } from "@/lib/contracts";

// Lazy load Newsletter for email subscription
const Newsletter = lazy(() => import("@/components/Newsletter"));

// Clover icon component
function CloverIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 20 C50 10, 40 0, 30 0 C15 0, 10 15, 10 25 C10 40, 25 50, 50 50 C25 50, 10 60, 10 75 C10 85, 15 100, 30 100 C40 100, 50 90, 50 80 C50 90, 60 100, 70 100 C85 100, 90 85, 90 75 C90 60, 75 50, 50 50 C75 50, 90 40, 90 25 C90 15, 85 0, 70 0 C60 0, 50 10, 50 20Z"/>
      <rect x="47" y="80" width="6" height="20" rx="2"/>
    </svg>
  );
}

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// Telegram icon component  
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

// Instagram icon component
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

// Polygon icon component
function PolygonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 178 161" fill="currentColor" className={className}>
      <path d="M133.31,52.42l-31.68-18.31c-4.69-2.71-10.47-2.71-15.16,0l-31.68,18.31c-4.69,2.71-7.58,7.73-7.58,13.15v36.62c0,5.42,2.89,10.44,7.58,13.15l31.68,18.31c4.69,2.71,10.47,2.71,15.16,0l31.68-18.31c4.69-2.71,7.58-7.73,7.58-13.15V65.57C140.89,60.15,138,55.13,133.31,52.42z"/>
    </svg>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Mock presale data (will be replaced with real data on /presale page)
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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2892-ectwXQjeNCvTClnMtgwdEoLpmfMWbD.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 z-0 bg-black/40 pointer-events-none" />

      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/90 backdrop-blur-md py-2" : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto max-w-7xl w-full px-4">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between glass-gold rounded-xl px-6 py-3">
            <Link href="/">
              <a className="flex items-center gap-2 group">
                <CloverIcon className="w-8 h-8 text-primary" />
                <span className="font-display text-xl font-bold text-secondary tracking-wider">
                  LUBDAN
                </span>
              </a>
            </Link>

            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-secondary transition-colors">
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a href="https://x.com/ludbanlbd" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors">
                <TelegramIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <Link href="/presale">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-lg">
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between glass-gold rounded-xl px-4 py-3">
            <Link href="/">
              <a className="flex items-center gap-2">
                <CloverIcon className="w-7 h-7 text-primary" />
                <span className="font-display text-lg font-bold text-secondary">LUBDAN</span>
              </a>
            </Link>
            <button 
              className="text-secondary p-2"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 mx-4 lg:hidden"
          >
            <div className="glass-gold rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-center gap-4 pb-4 border-b border-secondary/30">
                <CloverIcon className="w-6 h-6 text-primary" />
                <a href="https://x.com/ludbanlbd" target="_blank" rel="noopener noreferrer" className="text-secondary">
                  <XIcon className="w-5 h-5" />
                </a>
                <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer" className="text-secondary">
                  <TelegramIcon className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <Link href="/presale">
                  <Button size="sm" className="bg-primary text-primary-foreground text-xs px-3">
                    Connect
                  </Button>
                </Link>
              </div>
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a 
                    className="text-lg font-medium text-foreground/90 hover:text-secondary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow relative z-10 pt-28 lg:pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="min-h-[60vh] lg:min-h-[70vh] flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Hero Text - positioned to right on desktop, center on mobile */}
            <div className="w-full lg:w-1/2 lg:ml-auto order-1 lg:order-2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
                  <span className="text-secondary italic">Where Strategy Meets Luck</span>
                </h1>
                
                <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0">
                  A long-term Polygon project with real MATIC dividends.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                  <Link href="/presale">
                    <Button className="glass-gold hover:bg-primary/20 text-foreground font-semibold px-8 py-6 rounded-lg border border-secondary/50 transition-all w-full sm:w-auto">
                      Join Presale <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="https://global.transak.com/" target="_blank" rel="noopener noreferrer">
                    <Button className="glass-gold hover:bg-primary/20 text-foreground font-semibold px-8 py-6 rounded-lg border border-secondary/50 transition-all w-full sm:w-auto">
                      Buy with Card <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                  <Link href="/whitepaper">
                    <Button className="glass-gold hover:bg-primary/20 text-foreground font-semibold px-8 py-6 rounded-lg border border-secondary/50 transition-all w-full sm:w-auto">
                      Read Whitepaper <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Mascot area - on mobile this is handled by background */}
            <div className="hidden lg:block w-1/2 order-1">
              {/* Mascot is in the background image */}
            </div>
          </section>

          {/* Stats Cards */}
          <section className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="stats-card rounded-xl p-6"
              >
                <p className="text-sm text-muted-foreground mb-1">Current Phase:</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  Phase {presaleData.currentPhase} - <span className="text-secondary">${presaleData.price.toFixed(2)}</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="stats-card rounded-xl p-6"
              >
                <p className="text-sm text-muted-foreground mb-1">LBD Sold:</p>
                <p className="text-2xl font-display font-bold">
                  <span className="text-secondary">{formatNumber(presaleData.totalSold)}</span>
                  <span className="text-foreground/70 text-lg ml-1">LBD</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="stats-card rounded-xl p-6"
              >
                <p className="text-sm text-muted-foreground mb-1">Phase 1 Remaining:</p>
                <p className="text-2xl font-display font-bold">
                  <span className="text-secondary">{formatNumber(presaleData.phase1Remaining)}</span>
                  <span className="text-foreground/70 text-lg ml-1">LBD</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="stats-card rounded-xl p-6"
              >
                <p className="text-sm text-muted-foreground mb-1">Phase 2 Remaining:</p>
                <p className="text-2xl font-display font-bold">
                  <span className="text-secondary">{formatNumber(presaleData.phase2Remaining)}</span>
                  <span className="text-foreground/70 text-lg ml-1">LBD</span>
                </p>
              </motion.div>
            </div>
          </section>

          {/* Bottom Section - Dividends + Subscribe */}
          <section className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Earn MATIC Dividends */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-gold rounded-xl p-6 flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                <PolygonIcon className="w-10 h-10 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground mb-1">
                  Earn MATIC Dividends
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <PolygonIcon className="w-4 h-4" />
                  <span>Polygon</span>
                </div>
              </div>
            </motion.div>

            {/* Subscribe for Updates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-gold rounded-xl p-6"
            >
              <h3 className="text-xl font-display font-bold text-foreground mb-4">
                Subscribe for Updates
              </h3>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeStatus === "loading"}
                  className="flex-1 bg-background/50 border-secondary/30 text-foreground placeholder:text-muted-foreground/50"
                />
                <Button 
                  type="submit"
                  disabled={subscribeStatus === "loading" || subscribeStatus === "success"}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
                >
                  {subscribeStatus === "loading" ? "..." : subscribeStatus === "success" ? "Done!" : "Subscribe"}
                  {subscribeStatus === "idle" && <ArrowRight className="ml-1 w-4 h-4" />}
                </Button>
              </form>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center border-t border-secondary/20 mt-8">
            <p className="text-muted-foreground">
              Support: <a href="mailto:lubdan.info@gmail.com" className="text-secondary hover:underline">lubdan.info@gmail.com</a>
            </p>
          </footer>
        </div>
      </main>

      {/* Floating Telegram Button */}
      <motion.a
        href="https://t.me/LubdanOfficial"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center"
      >
        <TelegramIcon className="w-8 h-8 text-white" />
      </motion.a>
    </div>
  );
}
