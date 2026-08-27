import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function SearchModal({
  isOpen,
  onClose,
  products = [],
  onSelectProduct,
  currency
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      Object.values(p.specs).some((val) => String(val).toLowerCase().includes(q))
    );
  });

  const formatPrice = (amount) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(amount * 0.92)}`;
      case 'GBP': return `£${Math.round(amount * 0.78)}`;
      case 'JPY': return `¥${Math.round(amount * 155).toLocaleString()}`;
      default: return `$${amount}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div
        onClick={() => {
          soundEngine.playClick();
          onClose();
        }}
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
      />

      {/* Light Studio Modal Box */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl shadow-2xl overflow-hidden text-[#070709] z-10 my-8">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 border-b border-black/10 flex items-center gap-3 bg-[#EBEBEF]">
          <Search className="w-5 h-5 text-zinc-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS, SPECS, CATEGORIES..."
            className="w-full bg-transparent font-mono text-sm uppercase tracking-wider text-[#070709] placeholder:text-zinc-400 focus:outline-none font-bold"
          />
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full border border-black/10 hover:border-black text-zinc-600 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3 bg-white">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs font-bold">
              NO OBJECTS FOUND MATCHING "{query.toUpperCase()}".
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectProduct(product);
                  onClose();
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="group p-3 rounded-2xl bg-[#FAFAFA] border border-black/10 hover:border-black hover:bg-white transition-all flex items-center justify-between cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#EBEBEF] border border-black/10 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <video src={product.video} muted autoPlay loop playsInline className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm uppercase text-[#070709] group-hover:text-black transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs font-mono text-zinc-600 font-medium line-clamp-1">
                      {product.subtitle} | <span className="uppercase text-black font-bold">{product.category}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#070709]">
                    {formatPrice(product.price)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#070709] text-white flex items-center justify-center shadow-md">
                    <ArrowUpRight className="w-4 h-4 text-accent-lime" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#EBEBEF] border-t border-black/10 font-mono text-[10px] text-zinc-600 flex items-center justify-between font-bold">
          <span>MONOLITH HARDWARE SEARCH</span>
          <span>{filteredProducts.length} OBJECTS FOUND</span>
        </div>

      </div>
    </div>
  );
}
