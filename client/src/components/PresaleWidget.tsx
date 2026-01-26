import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePresaleData, usePresaleActions } from "@/hooks/usePresale";
import { useChainlinkPrice } from "@/hooks/useChainlinkPrice";
import { useAccount, useBalance } from "wagmi";
import { Loader2, AlertCircle, CheckCircle2, CreditCard, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PRESALE_CONFIG } from "@/lib/contracts";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PresaleWidget() {
  const { t } = useLanguage();
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { 
    currentPhase, 
    totalSold, 
    phase1Remaining, 
    phase2Remaining, 
    paused, 
    isLoading: isDataLoading 
  } = usePresaleData();
  
  const { 
    buyWithMATIC, 
    buyWithUSDT, 
    approveUSDT, 
    isPending, 
    isConfirming, 
    isConfirmed, 
    error 
  } = usePresaleActions();

  const { price: chainlinkMaticPrice, isLoading: isPriceLoading } = useChainlinkPrice();

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"MATIC" | "USDT">("MATIC");
  const [estimatedLBD, setEstimatedLBD] = useState(0);
  
  // Use Chainlink price if available, otherwise fallback to 0.50
  const maticPrice = chainlinkMaticPrice > 0 ? chainlinkMaticPrice : 0.50;

  const currentPrice = currentPhase === 1 ? PRESALE_CONFIG.PHASE_1.PRICE : PRESALE_CONFIG.PHASE_2.PRICE;

  useEffect(() => {
    if (!amount || isNaN(Number(amount))) {
      setEstimatedLBD(0);
      return;
    }
    
    const val = Number(amount);
    if (currency === "MATIC") {
      const usdValue = val * maticPrice;
      setEstimatedLBD(usdValue / currentPrice);
    } else if (currency === "USDT") {
      setEstimatedLBD(val / currentPrice);
    }
  }, [amount, currency, currentPrice, maticPrice]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success(t('presale.widget.success'));
      setAmount("");
    }
    if (error) {
      toast.error(t('presale.widget.error'));
    }
  }, [isConfirmed, error]);

  const handleBuy = () => {
    if (!isConnected) {
      toast.error(t('presale.widget.connect_first'));
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error(t('presale.widget.valid_amount'));
      return;
    }

    if (currency === "MATIC") {
      buyWithMATIC(amount);
    } else if (currency === "USDT") {
      buyWithUSDT(amount);
    }
  };

  const openTransak = () => {
    const transakUrl = "https://global.transak.com/?defaultCryptoCurrency=MATIC&networks=polygon";
    window.open(transakUrl, "_blank");
  };

  const progressPercent = (totalSold / PRESALE_CONFIG.PRESALE_TOTAL) * 100;

  return (
    <div className="w-full max-w-md mx-auto glass-card rounded-2xl overflow-hidden border-primary/30 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
      {/* Header */}
      <div className="p-6 border-b border-border/30 bg-card/40">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display font-bold text-primary">Buy LUBDAN</h3>
          <span className="text-sm font-sans text-muted-foreground bg-black/40 px-3 py-1 rounded-full border border-primary/20">
            Phase {currentPhase} Live
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-mono">{progressPercent.toFixed(2)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-muted/30" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{totalSold.toLocaleString()} LBD Sold</span>
            <span>{PRESALE_CONFIG.PRESALE_TOTAL.toLocaleString()} Total</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-background/50 border border-border/30 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Price</p>
            <p className="text-xl font-bold text-primary">${currentPrice.toFixed(2)}</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/30 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Next Price</p>
            <p className="text-xl font-bold text-muted-foreground">${(currentPrice + 0.40).toFixed(2)}</p>
          </div>
        </div>

        <Tabs defaultValue="MATIC" onValueChange={(v) => setCurrency(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background/50">
            <TabsTrigger value="MATIC">MATIC</TabsTrigger>
            <TabsTrigger value="USDT">USDT</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 space-y-4">
            <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Pay with {currency}</span>
                    {currency === "MATIC" && (
                      <span className="flex items-center gap-1">
                        1 MATIC ≈ ${maticPrice.toFixed(2)}
                        {isPriceLoading && <Loader2 className="h-3 w-3 animate-spin" />}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Input 
                      type="number" 
                      placeholder="0.0" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-black/40 border-primary/20 h-12 pl-4 pr-16 text-lg font-mono"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      {currency === "MATIC" && (
                        <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" alt="MATIC" className="w-5 h-5" />
                      )}
                      <span className="font-bold text-sm">{currency}</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-xs text-muted-foreground">
                      Balance: {balance ? (Number(balance.value) / 10 ** balance.decimals).toFixed(4) : "0.00"} {balance?.symbol}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="text-primary rotate-90" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Receive LUBDAN</span>
                    <span>Price: ${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="relative">
                    <Input 
                      readOnly 
                      value={estimatedLBD.toFixed(2)}
                      className="bg-black/40 border-primary/20 h-12 pl-4 pr-16 text-lg font-mono text-primary"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      <img src="/images/token.png" alt="LBD" className="w-5 h-5" />
                      <span className="font-bold text-sm">LBD</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleBuy}
                  disabled={isPending || isConfirming || paused || !isConnected}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold text-lg h-12 mt-2 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : !isConnected ? (
                    "Connect Wallet to Buy"
                  ) : (
                    "BUY TOKENS NOW"
                  )}
                </Button>
              </>
          </div>
        </Tabs>
      </div>
      
      {/* Footer Status */}
      {(isConfirmed || error) && (
        <div className={cn(
          "p-4 text-sm flex items-center justify-center gap-2",
          isConfirmed ? "bg-secondary/10 text-secondary" : "bg-destructive/10 text-destructive"
        )}>
          {isConfirmed ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {isConfirmed ? "Transaction Confirmed" : "Transaction Failed"}
        </div>
      )}
    </div>
  );
}

function ExternalLinkIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  )
}
