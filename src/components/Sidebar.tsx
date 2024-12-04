import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../constants/categories';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
      {categories.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => onSelectCategory(name === 'All' ? '' : name)}
          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            (name === 'All' ? !selectedCategory : selectedCategory === name)
              ? 'bg-pink-100 text-pink-600'
              : 'hover:bg-pink-50 text-gray-600 hover:text-pink-600'
          }`}
        >
          <Icon size={20} />
          <span>{t(`categories.${name.toLowerCase()}` as const)}</span>
        </button>
      ))}
    </div>
  );
}