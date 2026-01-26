import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function SocialFloatingButtons() {
  return (
    <motion.a
      href="https://t.me/ludban_lbd"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg flex items-center justify-center text-white font-bold text-xl hover:shadow-xl transition-all duration-300 group"
    >
      <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
      <span className="absolute right-full mr-4 bg-card border border-border px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Join Telegram
      </span>
    </motion.a>
  );
}
