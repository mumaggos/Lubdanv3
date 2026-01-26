import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Menu, X, Wallet, ExternalLink, Send, Mail } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { labelKey: "nav.home", path: "/" },
    { labelKey: "nav.presale", path: "/presale" },
    { labelKey: "nav.dashboard", path: "/dashboard" },
    { labelKey: "nav.dividends", path: "/dividends" },
    { labelKey: "nav.tokenomics", path: "/tokenomics" },
    { labelKey: "nav.roadmap", path: "/roadmap" },
    { labelKey: "nav.faq", path: "/faq" },
    { labelKey: "nav.whitepaper", path: "/whitepaper" },
  ];

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/background.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-background/80 backdrop-blur-md border-border/30 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <img 
                  src="/images/token.png" 
                  alt="Lubdan Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-transform group-hover:scale-110 duration-300 scale-150" 
                />
              </div>
              <span className="font-display text-2xl font-bold text-primary tracking-wider group-hover:text-primary/80 transition-colors">
                LUBDAN
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a 
                  className={cn(
                    "text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary relative group",
                    location === item.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t(item.labelKey)}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full",
                    location === item.path ? "w-full" : ""
                  )} />
                </a>
              </Link>
            ))}
            <LanguageSwitcher />
            <Button 
              variant={isConnected ? "outline" : "default"}
              className={cn(
                "font-medium border-primary/20",
                isConnected ? "text-primary hover:bg-primary/10" : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={handleConnect}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnected && address ? formatAddress(address) : t('nav.connect_wallet')}
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-foreground p-2 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col gap-6 h-screen overflow-y-auto"
          >
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a 
                  className={cn(
                    "text-2xl font-display font-bold transition-colors py-2 border-b border-border/30",
                    location === item.path ? "text-primary" : "text-foreground/80"
                  )}
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {t(item.labelKey)}
                </a>
              </Link>
            ))}
            
            <div className="mt-4 border-t border-border/30 pt-4">
              <LanguageSwitcher />
            </div>
            
            <Button 
              size="lg"
              className="mt-4 w-full"
              onClick={() => {
                handleConnect();
                setIsMenuOpen(false);
              }}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnected && address ? formatAddress(address) : t('nav.connect_wallet')}
            </Button>
            
            <div className="mt-auto mb-8 flex justify-center gap-6">
              <a href="https://x.com/ludbanlbd?s=21" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me/LubdanOfficial" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                <Send size={24} />
              </a>
              <a href="mailto:lubdan.info@gmail.com" className="text-muted-foreground hover:text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12 px-4 md:px-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/token.png" alt="Lubdan" className="w-8 h-8" />
                <span className="font-display text-xl font-bold text-primary">LUBDAN</span>
              </div>
              <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex gap-4">
                <a href="https://x.com/ludbanlbd?s=21" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Send size={18} />
                </a>
                <a href="mailto:lubdan.info@gmail.com" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-foreground">{t('footer.quick_links')}</h4>
              <ul className="space-y-3">
                {navItems.slice(0, 4).map(item => (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <a className="text-muted-foreground hover:text-primary transition-colors">{t(item.labelKey)}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-foreground">{t('footer.resources')}</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/tokenomics">
                    <a className="text-muted-foreground hover:text-primary transition-colors">{t('nav.tokenomics')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a className="text-muted-foreground hover:text-primary transition-colors">{t('nav.faq')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/whitepaper">
                    <a className="text-muted-foreground hover:text-primary transition-colors">{t('nav.whitepaper')}</a>
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.audit')}</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <span>{t('footer.powered')}</span>
              <div className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
              <span>{t('footer.running')}</span>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}
