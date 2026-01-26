import Layout from "@/components/Layout";
import PresaleWidget from "@/components/PresaleWidget";
import HowToBuyCollapsible from "@/components/HowToBuyCollapsible";
import { usePresaleData } from "@/hooks/usePresale";
import { motion } from "framer-motion";
import { PRESALE_CONFIG } from "@/lib/contracts";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Presale() {
  const { t } = useLanguage();
  const { currentPhase, totalSold, phase1Remaining, phase2Remaining } = usePresaleData();

  const phase1Total = PRESALE_CONFIG.PHASE_1.ALLOCATION;
  const phase2Total = PRESALE_CONFIG.PHASE_2.ALLOCATION;
  
  const phase1Sold = phase1Total - phase1Remaining;
  const phase2Sold = phase2Total - phase2Remaining;

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-4 text-gold-glow"
            >
              {t('presale.title')} <span className="text-secondary text-neon">{t('presale.live')}</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('presale.subtitle').replace('{phase}', currentPhase.toString())}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Info & Stats */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <HowToBuyCollapsible />
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-display font-bold mb-6 text-primary">{t('presale.structure')}</h3>
                
                <div className="space-y-6">
                  <div className="relative pl-8 border-l-2 border-primary/30 pb-6">
                    <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full ${currentPhase === 1 ? 'bg-secondary animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.5)]' : 'bg-primary/30'}`} />
                    <h4 className="text-lg font-bold text-foreground">{t('presale.phase1')} {currentPhase === 1 ? `(${t('presale.current')})` : ''}</h4>
                    <p className="text-primary font-mono font-bold">$0.20 {t('presale.per_lbd')}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t('presale.allocation')}: 6,300,000 LBD</p>
                    <div className="mt-2 h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary" 
                        style={{ width: `${(phase1Sold / phase1Total) * 100}%` }} 
                      />
                    </div>
                  </div>

                  <div className="relative pl-8 border-l-2 border-border/30">
                    <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full ${currentPhase === 2 ? 'bg-secondary animate-pulse' : 'bg-muted/30'}`} />
                    <h4 className="text-lg font-bold text-muted-foreground">{t('presale.phase2')} {currentPhase === 2 ? `(${t('presale.current')})` : ''}</h4>
                    <p className="text-muted-foreground font-mono">$0.60 {t('presale.per_lbd')}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t('presale.allocation')}: 3,150,000 LBD</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-display font-bold mb-4 text-primary">{t('presale.token_details')}</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('presale.token_name')}</span>
                    <span className="text-foreground font-bold">Lubdan</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('presale.symbol')}</span>
                    <span className="text-foreground font-bold">LBD</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('presale.network')}</span>
                    <span className="text-foreground font-bold">Polygon (MATIC)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('presale.total_supply')}</span>
                    <span className="text-foreground font-bold">21,000,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('presale.contract')}</span>
                    <a 
                      href="https://polygonscan.com/token/0x7dd400E9141e3df10Fb24CcdE9B116C334F9542e" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline truncate max-w-[150px]"
                    >
                      0x7dd4...542e
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Widget */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <PresaleWidget />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
