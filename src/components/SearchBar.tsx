import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('search.placeholder')}
        className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
    </div>
  );
}