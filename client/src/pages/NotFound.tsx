import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-display font-bold text-primary/20 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-white">{t('notfound.title')}</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          {t('notfound.message')}
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Home className="h-4 w-4" /> {t('notfound.return_home')}
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
