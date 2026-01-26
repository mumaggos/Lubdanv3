import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, Share2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { downloadWhitepaperPDF, shareWhitepaperPDF } from "@/lib/pdf-generator";

export default function Whitepaper() {
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const sections = [
    {
      titleKey: "whitepaper.section1",
      contentKey: "whitepaper.section1.content"
    },
    {
      titleKey: "whitepaper.section2",
      contentKey: "whitepaper.section2.content"
    },
    {
      titleKey: "whitepaper.section3",
      contentKey: "whitepaper.section3.content"
    },
    {
      titleKey: "whitepaper.section4",
      contentKey: "whitepaper.section4.content"
    },
    {
      titleKey: "whitepaper.section5",
      contentKey: "whitepaper.section5.content"
    },
    {
      titleKey: "whitepaper.section6",
      contentKey: "whitepaper.section6.content"
    },
    {
      titleKey: "whitepaper.section7",
      contentKey: "whitepaper.section7.content"
    },
    {
      titleKey: "whitepaper.section8",
      contentKey: "whitepaper.section8.content"
    },
    {
      titleKey: "whitepaper.section9",
      contentKey: "whitepaper.section9.content"
    },
    {
      titleKey: "whitepaper.section10",
      contentKey: "whitepaper.section10.content"
    },
    {
      titleKey: "whitepaper.section11",
      contentKey: "whitepaper.section11.content"
    },
    {
      titleKey: "whitepaper.section12",
      contentKey: "whitepaper.section12.content"
    },
    {
      titleKey: "whitepaper.section13",
      contentKey: "whitepaper.section13.content"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadWhitepaperPDF();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareWhitepaperPDF();
    } catch (error) {
      console.error('Share failed:', error);
      alert('Failed to share PDF. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="relative py-20 border-b border-border/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link href="/">
              <a className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={20} />
                <span>{t('whitepaper.back')}</span>
              </a>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground">
                  {t('whitepaper.title')}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {t('whitepaper.subtitle')}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 mb-8">
              <p className="text-sm text-muted-foreground italic">
                {t('whitepaper.disclaimer')}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('whitepaper.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className="mr-2 h-5 w-5" />
                {isDownloading ? 'Downloading...' : t('whitepaper.download')}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
                onClick={handleShare}
                disabled={isSharing}
              >
                <Share2 className="mr-2 h-5 w-5" />
                {isSharing ? 'Sharing...' : t('whitepaper.share')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections - Wrapped for PDF generation */}
      <section className="py-20" id="whitepaper-content">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="prose prose-invert max-w-none"
              >
                <div className="p-8 rounded-2xl glass-card hover:border-primary/50 transition-all duration-300 border border-primary/20">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                    {t(section.titleKey)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t(section.contentKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            variants={itemVariants}
            className="mt-20 p-8 rounded-2xl glass-card border border-primary/20"
          >
            <h3 className="text-2xl font-display font-bold text-primary mb-6">
              {t('whitepaper.toc')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/30 hover:border-primary/50"
                >
                  {t(section.titleKey)}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="mt-20 p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center"
          >
            <h3 className="text-3xl font-display font-bold text-foreground mb-4">
              {t('whitepaper.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('whitepaper.cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/presale">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  {t('whitepaper.join_presale')}
                </Button>
              </Link>
              <a href="https://t.me/LubdanOfficial" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  {t('whitepaper.join_community')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
