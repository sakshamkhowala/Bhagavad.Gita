import React, { createContext, useContext, useState } from 'react';

type Language = 'english' | 'hindi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('gita-language');
    return (stored === 'english' || stored === 'hindi') ? stored : 'english';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'english' ? 'hindi' : 'english';
      localStorage.setItem('gita-language', newLang);
      return newLang;
    });
  };

  const value = React.useMemo(() => ({ language, toggleLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
