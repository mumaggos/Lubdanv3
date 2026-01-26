import { motion } from "framer-motion";

export default function Mascot3D() {
  return (
    <div className="relative w-full max-w-[400px] lg:max-w-[600px] aspect-[4/5] flex items-center justify-center mx-auto">
      {/* Glowing aura behind mascot */}
      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute inset-0 bg-green-400/10 rounded-full blur-[80px]" />
      <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-[60px]" />
      
      {/* Mascot Image with floating animation */}
      <motion.img 
        src="/leprechaun-lubdan.png" 
        alt="Lubdan Mascot" 
        className="relative w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,255,65,0.3)] z-20"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
