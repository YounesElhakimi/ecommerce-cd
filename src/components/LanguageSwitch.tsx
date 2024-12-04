import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
    >
      <Globe size={20} />
      <span>{language === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}