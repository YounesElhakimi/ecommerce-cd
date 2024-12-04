import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { CheckoutModal } from './components/CheckoutModal';
import { LanguageSwitch } from './components/LanguageSwitch';
import { Product, CartItem, FilterState } from './types';
import { useLanguage } from './context/LanguageContext';

function MainApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
  });
  const { t, language } = useLanguage();

  useEffect(() => {
    fetch('/src/data/products.json')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCartItems([]);
  };

  return (
    <div className={`min-h-screen bg-pink-50 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-pink-600">{t('app.title')}</h1>
            <div className="flex items-center gap-4">
              <LanguageSwitch />
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-pink-600 hover:bg-pink-100 rounded-full"
              >
                <ShoppingBag size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <SearchBar
              value={filters.search}
              onChange={(search) => setFilters((f) => ({ ...f, search }))}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <Sidebar
              selectedCategory={filters.category}
              onSelectCategory={(category) => setFilters((f) => ({ ...f, category }))}
            />
          </aside>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {isCartOpen && (
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCheckoutOpen(true);
            setIsCartOpen(false);
          }}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

export default App;