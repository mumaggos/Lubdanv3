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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-display font-bold mb-2 text-foreground"
          >
            {t('home.listed_on.title') || 'Listed On'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            {t('home.listed_on.subtitle') || 'Discover Lubdan on major crypto platforms'}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-center"
        >
          {listings.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className={`flex flex-col items-center justify-center group ${
                item.isComingSoon ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {item.link && !item.isComingSoon ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-full transition-all duration-300"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-foreground"
                    />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-foreground text-center">
                    {item.name}
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 opacity-40">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain text-foreground"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs md:text-sm font-medium text-foreground text-center opacity-60">
                      {item.name}
                    </span>
                    <span className="text-xs text-secondary opacity-70 font-semibold">
                      {t('home.listed_on.coming_soon') || 'Coming Soon'}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
