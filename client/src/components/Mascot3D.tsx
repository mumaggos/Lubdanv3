import { motion } from "framer-motion";

export default function Mascot3D() {
  return (
    <div className="relative w-full max-w-[400px] lg:max-w-[600px] aspect-[4/5] flex items-center justify-center mx-auto">
      {/* Mascot Image with floating animation */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full h-full"
      >
        <img 
          src="/leprechaun-lubdan.png" 
          alt="Lubdan Mascot" 
          className="relative w-full h-full object-contain z-20"
        />
      </motion.div>
    </div>
  );
}