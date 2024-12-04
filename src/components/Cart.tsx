import React from 'react';
import { Trash2, X, Cat } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/format';
import { useLanguage } from '../context/LanguageContext';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onClose, onCheckout }: CartProps) {
  const { t, language } = useLanguage();
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  if (items.length === 0) {
    return (
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{t('cart.title')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-64">
          <Cat size={48} className="text-pink-200 mb-4" />
          <p className="text-gray-500 text-center">{t('cart.empty')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{t('cart.title')}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-2 border-b">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">
                {language === 'ar' ? item.nameAr || item.name : item.name}
              </h3>
              <p className="text-pink-600 font-semibold">{formatPrice(item.price, language)}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="px-2 py-1 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-pink-500 hover:text-pink-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>{t('cart.total')}</span>
          <span>{formatPrice(total, language)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          {t('cart.checkout')}
        </button>
      </div>
    </div>
  );
}