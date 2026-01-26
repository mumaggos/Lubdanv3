import Layout from "@/components/Layout";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { useDividendsData, useDividendActions } from "@/hooks/useDividends";
import { CONTRACTS, TOKEN_ABI } from "@/lib/contracts";
import { formatUnits } from "viem";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, Clock, TrendingUp, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();
  const { address, isConnected } = useAccount();
  const { data: maticBalance } = useBalance({ address });
  
  const { data: lbdBalance } = useReadContract({
    address: CONTRACTS.TOKEN as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  const { pendingAmount, lastReceivedTimestamp, refetchPending } = useDividendsData();
  const { claimDividends, isPending, isConfirming, isConfirmed, error } = useDividendActions();

  const formattedLbdBalance = lbdBalance ? Number(formatUnits(lbdBalance, 18)) : 0;
  
  // Calculate holding time / eligibility
  const now = Math.floor(Date.now() / 1000);
  const secondsSinceLastReceived = now - lastReceivedTimestamp;
  const daysHeld = Math.floor(secondsSinceLastReceived / 86400);
  const isEligible = daysHeld >= 30;
  const daysRemaining = 30 - daysHeld;

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Dividends claimed successfully!");
      refetchPending();
    }
    if (error) {
      toast.error("Failed to claim dividends.");
    }
  }, [isConfirmed, error, refetchPending]);

  if (!isConnected) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
          <div className="p-8 rounded-full bg-primary/10 mb-6">
            <Wallet className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4 text-gold-glow">{t('dashboard.connect_wallet')}</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            {t('dashboard.connect_message')}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-2 text-gold-glow">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">{t('dashboard.welcome')}, <span className="font-mono text-primary">{address?.slice(0,6)}...{address?.slice(-4)}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* LBD Holdings Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl glass-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <img src="/images/token.png" alt="LBD" className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('dashboard.your_holdings')}</p>
                  <h3 className="text-2xl font-bold text-foreground">{formattedLbdBalance.toLocaleString()} LBD</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full" />
              </div>
            </motion.div>

            {/* MATIC Balance Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl glass-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" alt="MATIC" className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('dashboard.wallet_balance')}</p>
                  <h3 className="text-2xl font-bold text-foreground">
                    {maticBalance ? (Number(maticBalance.value) / 10 ** maticBalance.decimals).toFixed(4) : "0.00"} MATIC
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Holding Time Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl glass-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('dashboard.holding_time')}</p>
                  <h3 className="text-2xl font-bold text-foreground">{daysHeld} {t('dashboard.days')}</h3>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{t('dashboard.eligibility')}:</span>
                <span className={isEligible ? "text-secondary font-bold" : "text-primary"}>
                  {isEligible ? t('dashboard.eligible') : `${daysRemaining} ${t('dashboard.days_left')}`}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Dividends Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl glass-card border border-primary/30 p-8 md:p-12 relative overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.1)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 className="text-3xl font-display font-bold mb-2 text-gold-glow">{t('dashboard.claimable_dividends')}</h2>
                <p className="text-muted-foreground max-w-lg">
                  {t('dashboard.dividends_desc')}
                </p>
              </div>

              <div className="text-center md:text-right bg-card/40 p-6 rounded-2xl border border-border/30 min-w-[300px]">
                <p className="text-sm text-muted-foreground mb-1">{t('dashboard.available_claim')}</p>
                <p className="text-4xl font-mono font-bold text-secondary mb-6 text-neon">
                  {pendingAmount.toFixed(6)} MATIC
                </p>
                
                <Button 
                  size="lg" 
                  className="w-full font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  onClick={() => claimDividends()}
                  disabled={!isEligible || pendingAmount <= 0 || isPending || isConfirming}
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('dashboard.claiming')}
                    </>
                  ) : !isEligible ? (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      {t('dashboard.locked')} ({daysRemaining}d)
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-5 w-5" />
                      {t('dashboard.claim_dividends')}
                    </>
                  )}
                </Button>
                
                {!isEligible && (
                  <p className="text-xs text-primary mt-3">
                    *{t('dashboard.hold_unlock')}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
