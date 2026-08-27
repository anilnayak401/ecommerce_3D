import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import SearchModal from './components/SearchModal';
import AdCreativeModal from './components/AdCreativeModal';
import HomeView from './views/HomeView';
import PDPView from './views/PDPView';
import { PRODUCTS, CATEGORIES } from './data/products';
import { soundEngine } from './utils/audio';

export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' or 'pdp'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdStudioOpen, setIsAdStudioOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Settings
  const [soundMuted, setSoundMuted] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [cursorText, setCursorText] = useState('');

  // Handle Cart Operations
  const handleAddToCart = (product, size, color) => {
    const itemSize = size || product.sizes[0] || 'Standard';
    const itemColor = color || product.colors[0]?.name || 'Default';

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === itemSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          ...product,
          selectedSize: itemSize,
          selectedColor: itemColor,
          quantity: 1
        }
      ];
    });
  };

  const handleUpdateQuantity = (productId, selectedSize, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId, selectedSize);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // Open Product Page (Scroll to top)
  const handleOpenPDP = (product) => {
    setSelectedProduct(product);
    setActiveView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Redirect to Home View Top (Logo Click)
  const handleNavigateHome = () => {
    setSelectedCategory('All');
    setSelectedProduct(null);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Category & Redirect Directly to Products Grid (#hardware-collection)
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setActiveView('home');

    setTimeout(() => {
      if (cat === 'All') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const collectionEl = document.getElementById('hardware-collection');
        if (collectionEl) {
          collectionEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#EBEBEF] text-[#070709] font-sans selection:bg-accent-lime selection:text-black relative">
      
      {/* Custom Dynamic Magnetic Cursor */}
      <CustomCursor text={cursorText} />

      {/* Main Header Navbar */}
      <Navbar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdStudio={() => setIsAdStudioOpen(true)}
        onNavigateHome={handleNavigateHome}
        currency={currency}
        onChangeCurrency={setCurrency}
      />

      {/* Main Dynamic View Content */}
      <main>
        {activeView === 'home' ? (
          <HomeView
            products={PRODUCTS}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={handleOpenPDP}
            onAddToCart={handleAddToCart}
            onOpenAdStudio={() => setIsAdStudioOpen(true)}
            currency={currency}
          />
        ) : (
          selectedProduct && (
            <PDPView
              product={selectedProduct}
              allProducts={PRODUCTS}
              onNavigateHome={handleNavigateHome}
              onSelectProduct={handleOpenPDP}
              onAddToCart={handleAddToCart}
              currency={currency}
            />
          )
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currency={currency}
      />

      {/* Instant Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleOpenPDP}
        currency={currency}
      />

      {/* Ad Creative Studio Showcase Reel */}
      <AdCreativeModal
        isOpen={isAdStudioOpen}
        onClose={() => setIsAdStudioOpen(false)}
        products={PRODUCTS}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onCompleteOrder={() => {
          setCartItems([]);
          handleNavigateHome();
        }}
      />

    </div>
  );
}
