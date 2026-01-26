import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage(t('home.newsletter.invalid_email') || "Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      // Use Web3Forms - free email service
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "22edb0ef-21a2-4381-a930-0be17f2c6b7a",
          subject: "New Newsletter Subscriber - Lubdan",
          from_name: "Lubdan Newsletter",
          email: email,
          message: `New subscriber: ${email}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(t('home.newsletter.success') || "Thank you for subscribing!");
        setEmail("");
        
        // Also save to local storage as backup
        try {
          const subscribers = JSON.parse(localStorage.getItem("lubdan_subscribers") || "[]");
          subscribers.push({
            email,
            subscribedAt: new Date().toISOString(),
            id: Math.random().toString(36).substr(2, 9)
          });
          localStorage.setItem("lubdan_subscribers", JSON.stringify(subscribers));
        } catch (e) {
          console.error("Failed to save to localStorage", e);
        }
        
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setMessage(t('home.newsletter.error') || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(t('home.newsletter.error_occurred') || "An error occurred. Please try again later.");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden border-y border-border/30">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {t('home.newsletter.title')}
              </h2>
            </div>

            <p className="text-muted-foreground mb-8 text-lg">
              {t('home.newsletter.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t('home.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 h-12 px-4 rounded-lg border border-primary/30 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
              />
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all disabled:opacity-50"
              >
                {status === "loading" ? t('home.newsletter.subscribing') : t('home.newsletter.subscribe')}
              </Button>
            </form>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex items-center justify-center gap-2 text-green-400"
                >
                  <CheckCircle size={20} />
                  <span>{message}</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex items-center justify-center gap-2 text-red-400"
                >
                  <AlertCircle size={20} />
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-muted-foreground/70 mt-6">
              {t('home.newsletter.privacy')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
