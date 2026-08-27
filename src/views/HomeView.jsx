import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { soundEngine } from '../utils/audio';

export default function HomeView({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  currency
}) {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  const leftProduct = products[leftIndex];

  // Auto-cycle dual horizontal videos inside MONOLITH text every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % products.length);
      setRightIndex((prev) => (prev + 1) % products.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [products.length]);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-24 pb-16 space-y-16 bg-[#EBEBEF] text-[#070709]">
      
      {/* SECTION 1: UNCONTAINED TALL SLEEK CROSSFADE MARVEL TEXT HERO SHOWCASE */}
      <section className="relative flex flex-col items-center justify-between max-w-7xl mx-auto px-4 md:px-8 text-center py-2 space-y-4">
        
        {/* Top Text: KINETIC LUXURY STUDIO */}
        <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold tracking-[0.25em] uppercase text-[#070709] block mt-8 sm:mt-12 md:mt-16 -mb-4 sm:-mb-6 relative z-20">
          KINETIC LUXURY STUDIO
        </span>

        {/* SVG Dual-Video Text Masking Stage: Vertically Tall & Thicker MONOLITH with Sleek Zero-Blink Crossfade */}
        <div
          onClick={() => {
            soundEngine.playClick();
            onSelectProduct(leftProduct);
          }}
          className="relative w-full h-[240px] sm:h-[360px] md:h-[460px] flex items-center justify-center overflow-hidden cursor-pointer select-none bg-[#EBEBEF]"
        >
          <svg viewBox="0 0 1350 280" className="w-full h-full max-w-7xl">
            <defs>
              <clipPath id="monolith-tall-clip">
                {/* Full 8-letter MONOLITH accurately fitted horizontally & stretched vertically 145% */}
                <text
                  x="675"
                  y="145"
                  textAnchor="middle"
                  fontSize="145"
                  fontWeight="900"
                  fontFamily="Syne, sans-serif"
                  letterSpacing="-2"
                  transform="scale(1, 1.45)"
                  transformOrigin="675 145"
                  stroke="black"
                  strokeWidth="6"
                  strokeLinejoin="round"
                >
                  MONOLITH
                </text>
              </clipPath>
            </defs>

            {/* Dual Horizontal Video Split with Zero-Blink Sleek Crossfade */}
            <foreignObject x="0" y="0" width="1350" height="280" clipPath="url(#monolith-tall-clip)">
              <div className="w-full h-full grid grid-cols-2 gap-0 overflow-hidden">
                
                {/* Left Video Half (Product 1) - Zero Blink Opacity Crossfade */}
                <div className="relative w-full h-full overflow-hidden border-r border-black/10">
                  {products.map((p, idx) => (
                    <video
                      key={`left-${p.id}`}
                      src={p.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-1000 ease-in-out ${
                        leftIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  ))}
                </div>

                {/* Right Video Half (Product 2) - Zero Blink Opacity Crossfade */}
                <div className="relative w-full h-full overflow-hidden">
                  {products.map((p, idx) => (
                    <video
                      key={`right-${p.id}`}
                      src={p.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-1000 ease-in-out ${
                        rightIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  ))}
                </div>

              </div>
            </foreignObject>
          </svg>
        </div>

        {/* CTA Button directly below MONOLITH text */}
        <div className="pt-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              onSelectProduct(leftProduct);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-8 py-3.5 rounded-full bg-[#070709] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-black transition-all inline-flex items-center gap-2 shadow-xl border border-black/10"
          >
            <span>EXPLORE 3D PDP</span>
            <ArrowUpRight className="w-4 h-4 text-accent-lime" />
          </button>
        </div>

        {/* Hero Bottom Sub-Footer Bar */}
        <div className="w-full flex items-center justify-between font-mono text-xs text-zinc-600 pt-6 border-t border-black/10">
          <span className="font-bold">8 SCROLLYTELLING OBJECTS</span>
          <button
            onClick={() => {
              const el = document.getElementById('hardware-collection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 font-bold hover:text-black transition-colors cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5 text-black" /> SCROLL TO DISCOVER
          </button>
          <span>SWISS STANDARDS // 2026</span>
        </div>

      </section>

      {/* SECTION 2: Human Expert Manifesto */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="p-8 md:p-10 rounded-3xl border border-black/10 bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1.5">
              <span className="text-black font-mono text-xs font-bold uppercase">01 // CRAFT</span>
              <h3 className="font-display font-bold text-base text-[#070709] uppercase">ZERO GENERIC AI TEMPLATES</h3>
              <p className="text-xs font-sans text-zinc-600 leading-relaxed font-medium">
                Clean architectural grids, heavy kinetic display typography, and uncompromised tactile interactions.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="text-black font-mono text-xs font-bold uppercase">02 // 3D TELEMETRY</span>
              <h3 className="font-display font-bold text-base text-[#070709] uppercase">240-FRAME IMAGE SEQUENCE</h3>
              <p className="text-xs font-sans text-zinc-600 leading-relaxed font-medium">
                60FPS frame interpolation linked to scroll position for interactive 3D spatial exploration.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="text-black font-mono text-xs font-bold uppercase">03 // AD CAMPAIGNS</span>
              <h3 className="font-display font-bold text-base text-[#070709] uppercase">AD CREATIVE ENGINE</h3>
              <p className="text-xs font-sans text-zinc-600 leading-relaxed font-medium">
                Integrated high-CTR video ad creative reels built for commercial conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Curated Product Grid (TARGET ID: hardware-collection) */}
      <section id="hardware-collection" className="max-w-7xl mx-auto px-4 md:px-8 space-y-6 pt-4">
        
        {/* Category Header & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-4">
          <div>
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-widest block mb-0.5">
              THE HARDWARE COLLECTION
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-[#070709]">
              SELECT OBJECT ({filteredProducts.length})
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectCategory(cat);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#070709] text-white border-black font-bold shadow-md'
                    : 'bg-white text-zinc-600 border-black/10 hover:border-black hover:text-black font-bold'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              currency={currency}
            />
          ))}
        </div>

      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-black/10 pt-8 pb-6 max-w-7xl mx-auto px-4 md:px-8 font-mono text-xs text-zinc-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-black font-bold tracking-wider">MONOLITH STUDIO</span> // © 2026 ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-6 font-bold">
          <span className="hover:text-black cursor-pointer">PRIVACY</span>
          <span className="hover:text-black cursor-pointer">TERMS OF DISPATCH</span>
          <span className="hover:text-black cursor-pointer">3D TELEMETRY ENGINE</span>
        </div>
      </footer>

    </div>
  );
}
