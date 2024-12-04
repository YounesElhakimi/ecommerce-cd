import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../utils/format';
import { generateOrderReference } from '../utils/order';
import { sendOrderEmail } from '../utils/email';

interface CheckoutModalProps {
  items: CartItem[];
  onClose: () => void;
  onComplete: () => void;
}

export function CheckoutModal({ items, onClose, onComplete }: CheckoutModalProps) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const orderReference = generateOrderReference();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const orderDetails = items
      .map((item) => 
        `${language === 'ar' ? item.nameAr || item.name : item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity, language)}`
      )
      .join('\n');

    const timestamp = new Date().toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US');

    try {
      await sendOrderEmail({
        to_email: 'yelhakimi24@gmail.com',
        order_reference: orderReference,
        customer_email: email,
        customer_address: address,
        order_details: orderDetails,
        total: formatPrice(total, language),
        timestamp,
      });
      
      onComplete();
    } catch (err) {
      setError(t('checkout.error'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('checkout.title')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('checkout.email')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('checkout.address')}
            </label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium mb-2">{t('checkout.orderSummary')}</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{language === 'ar' ? item.nameAr || item.name : item.name} x{item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity, language)}</span>
              </div>
            ))}
            <div className="font-bold mt-2 text-lg">
              {t('cart.total')} {formatPrice(total, language)}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors disabled:bg-pink-300"
          >
            {isSubmitting ? t('checkout.processing') : t('checkout.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}