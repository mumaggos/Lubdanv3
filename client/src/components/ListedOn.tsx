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
    link: "https://coinsniper.net/coin/89369",
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

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-r from-background via-muted/20 to-background border-y border-primary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent"
          >
            {t('home.listed_on.title') || 'Listed On'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/80 max-w-2xl mx-auto"
          >
            {t('home.listed_on.subtitle') || 'Discover Lubdan on major crypto platforms'}
          </motion.p>
        </div>

        {/* Grid de Imagens Fixas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {listings.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center group"
            >
              {item.link && !item.isComingSoon ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-full transition-all duration-300"
                >
                  <motion.div
                    className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3 p-4 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 border-2 border-primary/40 group-hover:border-primary/80 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:from-primary/25 group-hover:to-secondary/25 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -10 }}
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                    />
                  </motion.div>
                  <span className="text-base md:text-lg font-bold text-foreground text-center group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </span>
                </a>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center w-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.15)]"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-base md:text-lg font-bold text-foreground text-center opacity-70">
                      {item.name}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/20 px-4 py-2 rounded-full border border-primary/40">
                      {t('home.listed_on.coming_soon') || 'Coming Soon'}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
