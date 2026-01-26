import { useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HowToBuyCollapsible() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="w-full space-y-4">
      {/* Collapsed View */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass-card rounded-2xl p-6 border-primary/30 hover:border-primary/50 transition-all duration-300 flex items-center justify-between group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-left">
          <p className="text-lg font-display font-bold text-foreground">
            {t('home.need_crypto')}
          </p>
        </div>
        <ChevronDown
          className={`h-6 w-6 text-primary transition-transform duration-300 group-hover:text-secondary ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Expanded View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-2xl p-8 border-primary/30 space-y-6">
              {/* IMPORTANT Warning */}
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-bold text-foreground mb-1">IMPORTANT:</p>
                  <p>
                    To participate in the LBD presale you must have MATIC or USDT on the Polygon network.
                    Funds sent on other networks (e.g., Ethereum, BSC) will not work here.
                  </p>
                </div>
              </div>

              {/* How to Buy LBD */}
              <div>
                <h3 className="text-xl font-display font-bold text-primary mb-6">
                  How to Buy LBD
                </h3>

                {/* If you already have crypto */}
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="font-semibold text-foreground mb-3">
                      If you already have MATIC or USDT (Polygon)
                    </p>
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary font-bold">→</span>
                      <p>
                        Connect your wallet, choose the amount and click{" "}
                        <span className="text-primary font-semibold">
                          Buy Token Now
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                {/* If you don't have crypto */}
                <div className="space-y-4">
                  <p className="font-semibold text-foreground">
                    If you don't have crypto yet
                  </p>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">1.</span>
                      <span>Click Buy MATIC/USDT with Card</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">2.</span>
                      <span>In the provider, select MATIC or USDT on Polygon network</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">3.</span>
                      <span>Complete the card payment (crypto will arrive in your wallet)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">4.</span>
                      <span>
                        Return here, click{" "}
                        <span className="text-primary font-semibold">
                          Connect Wallet
                        </span>
                        , choose the amount and press{" "}
                        <span className="text-primary font-semibold">
                          Buy Token Now
                        </span>
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Single Button */}
              <div className="space-y-3 pt-4">
                <a
                  href="https://buy.onramper.com/?defaultCrypto=USDT&network=polygon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    size="lg"
                  >
                    Buy MATIC/USDT with Card
                  </Button>
                </a>
              </div>

              {/* Note */}
              <div className="bg-background/50 border border-border/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground text-center">
                  Card purchases are handled by third-party providers.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
