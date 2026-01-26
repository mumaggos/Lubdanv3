import LayoutNoWeb3 from "@/components/LayoutNoWeb3";
import Mascot3D from "@/components/Mascot3D";
import { Button } from "@/components/ui/button";
import { usePresaleData } from "@/hooks/usePresale";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp, Coins, Zap } from "lucide-react";
import { Link } from "wouter";

import Newsletter from "@/components/Newsletter";
import ListedOn from "@/components/ListedOn";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const { currentPhase, totalSold, phase1Remaining } = usePresaleData();
  
  // Calculate progress (mock logic if data is 0/loading)
  const totalPresale = 9450000;
  const progress = totalSold > 0 ? (totalSold / totalPresale) * 100 : 15;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <LayoutNoWeb3>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-10 pb-20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 z-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              {t('home.hero.presale_live').replace('{phase}', currentPhase.toString())}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold leading-tight text-foreground">
              {t('home.hero.title.where')} <span className="text-primary text-gold-glow">{t('home.hero.title.strategy')}</span> <br />
              {t('home.hero.title.meets')} <span className="text-secondary text-neon">{t('home.hero.title.luck')}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t('home.hero.subtitle')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link href="/presale">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 h-14 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105"
                >
                  {t('home.hero.join_presale')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/whitepaper">
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-bold text-lg px-8 h-14 rounded-xl">
                  {t('home.hero.whitepaper')}
                </Button>
              </Link>
              <a href="https://polygonscan.com/token/0x7dd400E9141e3df10Fb24CcdE9B116C334F9542e" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-secondary/50 text-secondary hover:bg-secondary/10 font-bold text-lg px-8 h-14 rounded-xl">
                  {t('home.hero.audited')} <ShieldCheck className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-secondary w-5 h-5" />
                <span>{t('home.hero.audited')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-primary w-5 h-5" />
                <span>{t('home.hero.dividends')}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 border-t border-border/30 pt-8">
              <div>
                <p className="text-3xl font-display font-bold text-foreground mb-1">$0.20</p>
                <p className="text-sm text-muted-foreground">{t('home.hero.price')}</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground mb-1">MATIC</p>
                <p className="text-sm text-muted-foreground">{t('home.hero.dividends_paid')}</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground mb-1">21M</p>
                <p className="text-sm text-muted-foreground">{t('home.hero.supply')}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end z-10 mt-8 lg:mt-0"
          >
            {/* Floating element - Current Phase */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 lg:top-10 lg:-right-10 bg-card/80 backdrop-blur-md border border-primary/30 p-4 rounded-xl shadow-xl z-30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('home.current_phase')}</p>
                  <p className="font-display font-bold text-lg text-foreground">
                    Phase {currentPhase}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <Mascot3D />
          </motion.div>
        </div>
      </section>

      {/* Presale CTA Section */}
      <section id="presale-section" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 skew-y-3 transform origin-top-left" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-gold-glow">{t('home.presale.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.presale.subtitle')}
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/presale">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 h-16 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105"
              >
                {t('home.presale.join_presale')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Lubdan Section */}
      <section className="py-20 bg-card/30 relative border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-gold-glow">{t('home.what_is.title')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t('home.what_is.desc1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.what_is.desc2')}
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-primary/20 shadow-2xl glass-card">
              <img 
                src="/images/lubdan-treasure.png" 
                alt="Lubdan Treasure" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Listed On Section */}
      <ListedOn />

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-gold-glow">{t('home.features.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Coins className="h-10 w-10 text-primary" />}
              title={t('home.features.yield.title')}
              description={t('home.features.yield.desc')}
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-10 w-10 text-secondary" />}
              title={t('home.features.secure.title')}
              description={t('home.features.secure.desc')}
            />
            <FeatureCard 
              icon={<TrendingUp className="h-10 w-10 text-primary" />}
              title={t('home.features.deflationary.title')}
              description={t('home.features.deflationary.desc')}
            />
          </div>
        </div>
      </section>
    </LayoutNoWeb3>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-8 rounded-2xl glass-card hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="mb-6 p-4 rounded-xl bg-background/50 w-fit group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
