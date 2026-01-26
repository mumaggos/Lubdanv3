import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ListingItem {
  name: string;
  logo: string;
  link?: string;
  isComingSoon?: boolean;
}

const listings: ListingItem[] = [
  {
    name: "CoinHunt",
    logo: "/partners/coinhunt.png",
    link: "https://coinhunt.cc/coin/6972848344306e7c4f3f00fc",
  },
  {
    name: "CoinSniper",
    logo: "/partners/coinsniper.png",
    isComingSoon: true,
  },
  {
    name: "PolygonScan",
    logo: "/partners/polygonscan.png",
    isComingSoon: true,
  },
  {
    name: "CoinMarketCap",
    logo: "/partners/coinmarketcap.png",
    isComingSoon: true,
  },
  {
    name: "CoinGecko",
    logo: "/partners/coingecko.png",
    isComingSoon: true,
  },
];

export default function ListedOn() {
  const { t } = useLanguage();

  // Duplicar para criar efeito infinito
  const duplicatedListings = [...listings, ...listings];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-background/50 via-background/30 to-background/50 border-y border-primary/10">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent"
          >
            {t('home.listed_on.title') || 'Listed On'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t('home.listed_on.subtitle') || 'Discover Lubdan on major crypto platforms'}
          </motion.p>
        </div>
      </div>

      {/* Carrossel Animado */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8 md:gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedListings.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              className="flex-shrink-0 w-32 md:w-40 flex flex-col items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {item.link && !item.isComingSoon ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-full transition-all duration-300"
                >
                  <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]"
                    />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 opacity-50">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain opacity-50"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm md:text-base font-semibold text-foreground text-center opacity-60">
                      {item.name}
                    </span>
                    <span className="text-xs text-primary font-bold uppercase tracking-wider opacity-70 bg-primary/10 px-3 py-1 rounded-full">
                      {t('home.listed_on.coming_soon') || 'Coming Soon'}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Gradientes nas extremidades */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
