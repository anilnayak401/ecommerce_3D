import React, { useState } from 'react';
import { ShoppingBag, Search, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const DEFAULT_CATEGORIES = ['All', 'Footwear', 'Timepieces', 'Tech', 'Audio', 'Lifestyle'];

export default function Navbar({
  categories = DEFAULT_CATEGORIES,
  selectedCategory,
  onSelectCategory,
  cartCount = 0,
  onOpenCart,
  onOpenSearch,
  onOpenAdStudio,
  currency,
  onChangeCurrency,
  onNavigateHome
}) {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryList = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  const toggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div
          onClick={() => {
            soundEngine.playClick();
            onNavigateHome();
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
        >
          <div className="w-8 h-8 bg-[#070709] rounded-lg flex items-center justify-center font-display font-black text-white text-xs group-hover:bg-black transition-colors shadow-sm">
            M//
          </div>
          <div>
            <span className="font-display font-black text-xs md:text-sm tracking-wider block text-[#070709] leading-none uppercase">
              MONOLITH
            </span>
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest hidden sm:block uppercase font-bold mt-0.5">
              KINETIC LUXURY STUDIO
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Categories (ALWAYS VISIBLE ON ALL DESKTOP & LAPTOP SCREENS!) */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                onSelectCategory(cat);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className={`transition-all uppercase tracking-wider py-1 font-bold ${
                selectedCategory === cat
                  ? 'text-black border-b-2 border-black'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Right: Actions (Audio, Currency, Search, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Audio Sound Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundEngine.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 bg-black/5 hover:border-black text-[11px] font-mono text-zinc-800 font-bold transition-all shadow-sm"
            title="Toggle Sound Effects"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-zinc-400 uppercase">AUDIO OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="text-black uppercase">AUDIO ON</span>
              </>
            )}
          </button>

          {/* Currency Selector */}
          <div className="relative hidden sm:block">
            <select
              value={currency}
              onChange={(e) => {
                soundEngine.playClick();
                onChangeCurrency(e.target.value);
              }}
              className="bg-black/5 border border-black/10 rounded-lg px-2.5 py-1 font-mono text-xs text-black font-bold uppercase cursor-pointer hover:border-black focus:outline-none shadow-sm"
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="JPY">JPY ¥</option>
            </select>
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenSearch();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-2 rounded-full border border-black/10 hover:border-black text-zinc-800 hover:text-black transition-all bg-black/5 shadow-sm"
            title="Search Products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenCart();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-3.5 py-1.5 rounded-full bg-[#070709] text-white hover:bg-black font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-accent-lime" />
            <span className="hidden xs:inline">BAG</span>
            <span className="w-4 h-4 rounded-full bg-accent-lime text-black font-black text-[10px] flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-black/10 md:hidden text-black bg-black/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-3 font-mono text-xs shadow-xl">
          <div className="flex flex-wrap gap-2 pb-2 border-b border-black/10">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#070709] text-white border-black font-bold'
                    : 'bg-black/5 text-zinc-700 border-black/10 font-bold'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={toggleAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-bold text-black"
            >
              {isAudioMuted ? 'AUDIO OFF' : 'AUDIO ON 🔊'}
            </button>

            <select
              value={currency}
              onChange={(e) => onChangeCurrency(e.target.value)}
              className="bg-black/5 border border-black/10 rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-black"
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="JPY">JPY ¥</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
