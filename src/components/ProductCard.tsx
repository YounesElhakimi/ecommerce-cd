import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { t, language } = useLanguage();
  
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm">
          {t(`categories.${product.category.toLowerCase()}`)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {language === 'ar' ? product.nameAr || product.name : product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(product.old_price, language)}
          </span>
          <span className="text-lg font-bold text-pink-600">
            {formatPrice(product.price, language)}
          </span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full bg-pink-500 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors"
        >
          <ShoppingBag size={20} />
          {t('product.addToCart')}
        </button>
      </div>
    </div>
  );
}