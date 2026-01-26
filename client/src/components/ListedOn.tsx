import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";

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
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);

  // Duplicar para criar efeito infinito
  const duplicatedListings = [...listings, ...listings, ...listings];

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsAutoPlay(false);
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    setDragEnd(clientX);
    
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 50) {
      setX(x + diff);
    }
    
    setTimeout(() => setIsAutoPlay(true), 500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-background via-muted/20 to-background border-y border-primary/20">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
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
            className="text-xl text-foreground/80 max-w-2xl mx-auto"
          >
            {t('home.listed_on.subtitle') || 'Discover Lubdan on major crypto platforms'}
          </motion.p>
        </div>
      </div>

      {/* Carrossel Interativo */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className="flex gap-8 md:gap-12 px-4"
          animate={{ x: isAutoPlay ? ["0%", "-33.33%"] : x }}
          transition={isAutoPlay ? {
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          } : {
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          drag="x"
          dragElastic={0.2}
          dragConstraints={{ left: -500, right: 500 }}
          onDragEnd={(event, info) => {
            if (Math.abs(info.velocity.x) > 500) {
              setX(x + info.offset.x);
            }
          }}
        >
          {duplicatedListings.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              className="flex-shrink-0 w-40 md:w-48 flex flex-col items-center justify-center group"
              whileHover={{ scale: 1.08, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {item.link && !item.isComingSoon ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-full transition-all duration-300"
                >
                  <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-4 p-6 rounded-3xl bg-gradient-to-br from-primary/15 to-secondary/15 border-2 border-primary/40 group-hover:border-primary/80 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:from-primary/25 group-hover:to-secondary/25 transition-all duration-300">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                    />
                  </div>
                  <span className="text-base md:text-lg font-bold text-foreground text-center group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-4 p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
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
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Gradientes nas extremidades */}
        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
      </div>

      {/* Instrução de Drag */}
      <div className="text-center mt-8">
        <p className="text-sm text-foreground/60 font-medium">
          💡 {t('home.listed_on.drag_hint') || 'Drag to explore • Auto-scrolling enabled'}
        </p>
      </div>
    </section>
  );
}
