export const formatPrice = (price: number, language: string = 'en'): string => {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};