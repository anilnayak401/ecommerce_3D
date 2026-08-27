import React, { useRef, useState } from 'react';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function ProductCard({ product, onSelectProduct, onAddToCart, currency }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const formatPrice = (amount) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(amount * 0.92)}`;
      case 'GBP': return `£${Math.round(amount * 0.78)}`;
      case 'JPY': return `¥${Math.round(amount * 155).toLocaleString()}`;
      default: return `$${amount}`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    soundEngine.playAddToBag();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onClick={() => {
        soundEngine.playClick();
        onSelectProduct(product);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-black transition-all duration-500 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl"
    >
      {/* Video Container Stage (Matches Studio Light Background!) */}
      <div className="relative w-full aspect-square bg-[#EBEBEF] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        {/* Product WebM Video Asset */}
        <video
          ref={videoRef}
          src={product.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Corner Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono tracking-widest text-black border border-black/10 uppercase font-bold shadow-sm">
            {product.badge}
          </span>
        </div>

        {/* Hover Quick PDP Link */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-[#070709] text-white flex items-center justify-center shadow-lg">
            <ArrowUpRight className="w-4 h-4 text-accent-lime" />
          </div>
        </div>
      </div>

      {/* Product Information Card Body */}
      <div className="p-5 border-t border-black/5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1 font-bold">
            <span className="uppercase text-black">{product.category}</span>
            <span>{product.specs["WEIGHT"] || product.specs["CASE DIAMETER"] || "PRO"}</span>
          </div>

          <h3 className="font-display font-black text-base md:text-lg text-[#070709] group-hover:text-black transition-colors tracking-tight uppercase leading-tight mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-600 line-clamp-1 mb-4 font-sans font-medium">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-3 border-t border-black/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">PRICE</span>
            <span className="font-mono text-base font-bold text-[#070709] tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#070709] hover:bg-black text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-accent-lime" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
