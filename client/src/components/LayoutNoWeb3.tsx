import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Send, Mail } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LayoutNoWeb3({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/background.avif')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-background/95 lg:backdrop-blur-md border-border/30 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 z-50">
            <div className="text-2xl font-display font-bold text-primary">LUBDAN</div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location === item.path ? "text-primary" : "text-foreground/70 hover:text-foreground"
                )}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-foreground/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay - CSS-only animation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col gap-6 h-screen overflow-y-auto transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
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
        ))}
        
        <div className="mt-4 border-t border-border/30 pt-4">
          <LanguageSwitcher />
        </div>
        
        <div className="mt-auto mb-8 flex justify-center gap-6">
          <a href="https://x.com/ludbanlbd?s=21" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://t.me/LubdanOfficial" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <Send size={24} />
          </a>
          <a href="mailto:info@lubdan.com" className="text-muted-foreground hover:text-primary">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12 px-4 md:px-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-4 md:px-0 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-lg mb-4 text-primary">LUBDAN</h3>
              <p className="text-sm text-muted-foreground">Premium blockchain investment platform on Polygon.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.links')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/presale" className="hover:text-primary transition-colors">{t('nav.presale')}</a></li>
                <li><a href="/tokenomics" className="hover:text-primary transition-colors">{t('nav.tokenomics')}</a></li>
                <li><a href="/whitepaper" className="hover:text-primary transition-colors">{t('nav.whitepaper')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.social')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://x.com/ludbanlbd" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Twitter/X</a></li>
                <li><a href="https://t.me/LubdanOfficial" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Telegram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.contact')}</h4>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:info@lubdan.com" className="hover:text-primary transition-colors">info@lubdan.com</a>
              </p>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; 2024 Lubdan. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.privacy')}</a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
