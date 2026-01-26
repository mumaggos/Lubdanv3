import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { CONTRACTS } from "@/lib/contracts";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [showSecurityReview, setShowSecurityReview] = useState(false);
  const [showLegalDisclosures, setShowLegalDisclosures] = useState(false);
  
  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gold-glow">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* FAQ Column */}
            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <FAQItem 
                  value="item-1"
                  question={t('faq.q1.question')}
                  answer={t('faq.q1.answer')}
                />
                <FAQItem 
                  value="item-2"
                  question={t('faq.q2.question')}
                  answer={t('faq.q2.answer')}
                />
                <FAQItem 
                  value="item-3"
                  question={t('faq.q3.question')}
                  answer={t('faq.q3.answer')}
                />
                <FAQItem 
                  value="item-4"
                  question={t('faq.q4.question')}
                  answer={t('faq.q4.answer')}
                />
                <FAQItem 
                  value="item-5"
                  question={t('faq.q5.question')}
                  answer={t('faq.q5.answer')}
                />
                <FAQItem 
                  value="item-6"
                  question={t('faq.q6.question')}
                  answer={t('faq.q6.answer')}
                />
              </Accordion>
            </div>

            {/* Transparency Column */}
            <div className="space-y-6">
              <TransparencyCard
                title={t('faq.transparency.contract')}
                address={CONTRACTS.TOKEN}
                link={`https://polygonscan.com/address/${CONTRACTS.TOKEN}`}
              />
              <TransparencyCard
                title={t('faq.transparency.presale')}
                address={CONTRACTS.PRESALE}
                link={`https://polygonscan.com/address/${CONTRACTS.PRESALE}`}
              />
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-display font-bold mb-4 text-primary">{t('faq.transparency.resources')}</h3>
                <div className="space-y-3">
                  <a href="/whitepaper" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink size={16} />
                    <span>{t('faq.transparency.whitepaper')}</span>
                  </a>
                  <button 
                    onClick={() => setShowSecurityReview(!showSecurityReview)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
                  >
                    <ExternalLink size={16} />
                    <span>{t('faq.transparency.security')}</span>
                  </button>
                  {showSecurityReview && (
                    <div className="mt-3 p-3 bg-secondary/10 rounded-lg text-xs text-muted-foreground border border-secondary/30">
                      <p className="font-bold mb-2">{t('faq.security_review.title')}</p>
                      <p>{t('faq.security_review.content')}</p>
                    </div>
                  )}
                  <button 
                    onClick={() => setShowLegalDisclosures(!showLegalDisclosures)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
                  >
                    <ExternalLink size={16} />
                    <span>{t('faq.transparency.legal')}</span>
                  </button>
                  {showLegalDisclosures && (
                    <div className="mt-3 p-3 bg-secondary/10 rounded-lg text-xs text-muted-foreground border border-secondary/30">
                      <p className="font-bold mb-2">{t('faq.legal.title')}</p>
                      <p>{t('faq.legal.content')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FAQItem({ value, question, answer }: { value: string; question: string; answer: string }) {
  return (
    <AccordionItem value={value} className="glass-card rounded-xl px-6 border-border/30">
      <AccordionTrigger className="text-left font-bold text-foreground hover:text-primary transition-colors">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}

function TransparencyCard({ title, address, link }: { title: string; address: string; link: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-display font-bold mb-3 text-primary">{title}</h3>
      <p className="text-xs text-muted-foreground mb-3 font-mono break-all">{address}</p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex-1"
        >
          {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1"
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} className="mr-1" />
            View
          </a>
        </Button>
      </div>
    </div>
  );
}
