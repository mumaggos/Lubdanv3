import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Coins, Clock, Lock, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dividends() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6 text-gold-glow"
            >
              {t('dividends.title')} <span className="text-secondary text-neon">MATIC</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('dividends.subtitle')}
            </p>
          </div>

          {/* How it Works Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

            <StepCard 
              number="01"
              icon={<Coins className="h-8 w-8 text-primary" />}
              title={t('dividends.step1.title')}
              description={t('dividends.step1.desc')}
            />
            <StepCard 
              number="02"
              icon={<Clock className="h-8 w-8 text-secondary" />}
              title={t('dividends.step2.title')}
              description={t('dividends.step2.desc')}
            />
            <StepCard 
              number="03"
              icon={<Lock className="h-8 w-8 text-primary" />}
              title={t('dividends.step3.title')}
              description={t('dividends.step3.desc')}
            />
            <StepCard 
              number="04"
              icon={<RefreshCw className="h-8 w-8 text-secondary" />}
              title={t('dividends.step4.title')}
              description={t('dividends.step4.desc')}
            />
          </div>

          {/* Detailed Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6 text-gold-glow">{t('dividends.revenue_model')}</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  {t('dividends.revenue_desc')}
                </p>
                <p>
                  {t('dividends.casino_profits')}
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
                    <span>{t('dividends.transparency')}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
                    <span>{t('dividends.no_staking')}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
                    <span>{t('dividends.anti_dump')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
              <h3 className="text-xl font-bold mb-6 text-primary">{t('dividends.contract_stats')}</h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dividends.contract_address')}</p>
                  <p className="font-mono text-xs md:text-sm text-secondary break-all">0xDD32982ce5533e9908c332982c5615690bF20EBc</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background/50 border border-border/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('dividends.total_paid')}</p>
                    <p className="text-xl font-bold text-foreground">0 MATIC</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50 border border-border/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('dividends.holders_eligible')}</p>
                    <p className="text-xl font-bold text-foreground">0</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                {t('dividends.check_eligibility')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StepCard({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative z-10 glass-card p-6 rounded-2xl text-center group hover:border-primary/50 transition-all duration-300"
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border border-border/30 h-12 w-12 rounded-full flex items-center justify-center font-mono font-bold text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        {number}
      </div>
      <div className="mt-8 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
