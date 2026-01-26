import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import pt from '../i18n/pt.json';
import fr from '../i18n/fr.json';
import de from '../i18n/de.json';
import zh from '../i18n/zh.json';
import ja from '../i18n/ja.json';
import ko from '../i18n/ko.json';
import { safeStorage } from '../lib/storage';

export type Language = 'en' | 'pt' | 'fr' | 'de' | 'zh' | 'ja' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en,
  pt,
  fr,
  de,
  zh,
  ja,
  ko,
};

const getDefaultLanguage = (): Language => {
  const savedLanguage = safeStorage.getItem('language') as Language | null;
  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }
  const browserLang = navigator.language.toLowerCase();
  const langMap: Record<string, Language> = {
    'pt': 'pt',
    'pt-br': 'pt',
    'pt-pt': 'pt',
    'fr': 'fr',
    'fr-fr': 'fr',
    'de': 'de',
    'de-de': 'de',
    'zh': 'zh',
    'zh-cn': 'zh',
    'zh-tw': 'zh',
    'ja': 'ja',
    'ja-jp': 'ja',
    'ko': 'ko',
    'ko-kr': 'ko',
  };
  const detectedLang = langMap[browserLang] || langMap[browserLang.split('-')[0]];
  return detectedLang || 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getDefaultLanguage);
  useEffect(() => {
    const savedLanguage = safeStorage.getItem('language') as Language | null;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else if (!savedLanguage) {
      const defaultLang = getDefaultLanguage();
      setLanguage(defaultLang);
      safeStorage.setItem('language', defaultLang);
    }
  }, []);
  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations['en']];
    return translation || key;
  };
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    safeStorage.setItem('language', lang);
  };
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.error('useLanguage must be used within a LanguageProvider');
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
