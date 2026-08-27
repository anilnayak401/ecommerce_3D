import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import WebMScroller from '../components/WebMScroller';
import { soundEngine } from '../utils/audio';

export default function PDPView({
  product,
  allProducts,
  onNavigateHome,
  onSelectProduct,
  onAddToCart,
  currency
}) {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [added, setAdded] = useState(false);

  const formatPrice = (amount) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(amount * 0.92)}`;
      case 'GBP': return `£${Math.round(amount * 0.78)}`;
      case 'JPY': return `¥${Math.round(amount * 155).toLocaleString()}`;
      default: return `$${amount}`;
    }
  };

  // Compute Full Page Scroll Progress across responsive 450vh scroll height
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [product.id]);

  const handleAdd = () => {
    soundEngine.playAddToBag();
    onAddToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Find Next Product index
  const currentIndex = allProducts.findIndex((p) => p.id === product.id);
  const nextProduct = allProducts[(currentIndex + 1) % allProducts.length];

  // Phase 1 Intro Title: Visible ONLY at 0% top, disappears immediately right after starting to scroll!
  let opacityP1 = 0;
  if (scrollProgress <= 0.01) {
    opacityP1 = 1;
  } else if (scrollProgress <= 0.06) {
    opacityP1 = 1 - (scrollProgress - 0.01) / 0.05;
  }

  // Phase 2 Material Science (0.15 to 0.55)
  let opacityP2 = 0;
  if (scrollProgress > 0.12 && scrollProgress <= 0.16) {
    opacityP2 = (scrollProgress - 0.12) / 0.04;
  } else if (scrollProgress > 0.16 && scrollProgress <= 0.50) {
    opacityP2 = 1;
  } else if (scrollProgress > 0.50 && scrollProgress <= 0.54) {
    opacityP2 = 1 - (scrollProgress - 0.50) / 0.04;
  }

  // Phase 3 Hardware Specs (0.58 to 0.85)
  let opacityP3 = 0;
  if (scrollProgress > 0.56 && scrollProgress <= 0.60) {
    opacityP3 = (scrollProgress - 0.56) / 0.04;
  } else if (scrollProgress > 0.60 && scrollProgress <= 0.84) {
    opacityP3 = 1;
  } else if (scrollProgress > 0.84 && scrollProgress <= 0.88) {
    opacityP3 = 1 - (scrollProgress - 0.84) / 0.04;
  }

  const isAtBottom = scrollProgress >= 0.88;

  return (
    <div ref={scrollContainerRef} className="relative min-h-[450vh] bg-[#FAFAFA] text-[#070709]">
      
      {/* 1. FIXED FULLPAGE 3D FRAME SEQUENCE CANVAS STAGE */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-auto">
        <WebMScroller
          productId={product.id}
          videoUrl={product.video}
          productName={product.name}
          scrollProgress={scrollProgress}
        />
      </div>

      {/* 2. FIXED STAGE SUB-BAR */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 px-4 md:px-8 pointer-events-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-zinc-700">
          <button
            onClick={() => {
              soundEngine.playClick();
              onNavigateHome();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/15 hover:border-black text-[#070709] transition-all bg-white/95 backdrop-blur-md shadow-sm font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
            <span>CATALOG</span>
          </button>

          <div className="hidden xs:flex items-center gap-2 text-[10px] sm:text-[11px] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/15 shadow-sm">
            <span className="text-black font-bold uppercase">{product.category}</span>
            <span className="text-zinc-400">/</span>
            <span className="uppercase text-black font-bold truncate max-w-[120px] sm:max-w-none">{product.name}</span>
          </div>
        </div>
      </div>

      {/* 3. SOLID 100% VISIBLE DARK BLACK OVERLAY TYPOGRAPHY */}
      <div className="fixed inset-0 z-20 pointer-events-none p-4 sm:p-6 md:p-12">
        <div className="max-w-7xl mx-auto h-full relative">
          
          {/* PHASE 1: INTRO TITLE (HIGH AT TOP-16 ABOVE PRODUCT - DISAPPEARS IMMEDIATELY ON SCROLL!) */}
          <div
            className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl text-center transition-opacity duration-150 px-4 z-30 pointer-events-none"
            style={{
              opacity: opacityP1,
              display: opacityP1 > 0.01 ? 'block' : 'none'
            }}
          >
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-0.5 font-bold">
              01 // OBJECT FORM
            </span>
            <h1 className="font-display font-black text-xl sm:text-3xl md:text-5xl uppercase tracking-tight text-[#070709] mb-1 leading-none">
              {product.name}
            </h1>
            <p className="font-sans text-[11px] sm:text-xs text-zinc-700 font-bold max-w-md mx-auto leading-tight">
              {product.subtitle} — {product.tagline}
            </p>
          </div>

          {/* PHASE 2: 15% - 50% Scroll (POSITIONED IN CORNERS / RESPONSIVE) */}
          <div
            className="absolute top-24 sm:top-28 inset-x-0 flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 transition-opacity duration-150 z-30"
            style={{
              opacity: opacityP2,
              display: opacityP2 > 0.01 ? 'flex' : 'none'
            }}
          >
            <div className="max-w-xs sm:max-w-sm text-left space-y-1">
              <span className="font-mono text-[10px] sm:text-xs text-black font-bold uppercase block">
                02 // MATERIAL SCIENCE
              </span>
              <h2 className="font-display font-black text-lg sm:text-2xl md:text-3xl uppercase text-[#070709]">
                {product.chapters[0]?.boldLead || 'FORGED PRECISION.'}
              </h2>
              <p className="font-sans text-xs text-zinc-800 font-bold leading-relaxed">
                {product.chapters[0]?.sub || product.description}
              </p>
            </div>

            <div className="max-w-xs text-left md:text-right font-mono text-xs space-y-0.5">
              <span className="text-zinc-600 block uppercase font-bold text-[10px] sm:text-[11px]">PRIMARY CHASSIS</span>
              <div className="text-[#070709] font-black text-xs sm:text-sm">{product.specs["UPPER"] || product.specs["STRUCTURE"] || "GRADE 5 CHASSIS"}</div>
              <div className="text-zinc-800 font-bold text-[11px]">{product.specs["WEIGHT"] || product.specs["POWER RESERVE"] || "PRO TELEMETRY"}</div>
            </div>
          </div>

          {/* PHASE 3: 60% - 85% Scroll (POSITIONED IN TOP LEFT SIDEBAR) */}
          <div
            className="absolute top-24 sm:top-28 left-0 max-w-xs sm:max-w-sm text-left transition-opacity duration-150 space-y-3 z-30"
            style={{
              opacity: opacityP3,
              display: opacityP3 > 0.01 ? 'block' : 'none'
            }}
          >
            <div className="border-b border-black/20 pb-1">
              <span className="font-mono text-[10px] sm:text-xs text-black font-bold uppercase block">
                03 // HARDWARE SPECIFICATIONS
              </span>
              <h3 className="font-display font-black text-lg sm:text-2xl uppercase text-[#070709]">
                BENCHMARK TELEMETRY
              </h3>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between border-b border-black/10 py-0.5 gap-4">
                  <span className="text-zinc-700 uppercase font-bold text-[10px] sm:text-[11px]">{key}</span>
                  <span className="font-black text-[#070709] uppercase text-[10px] sm:text-[11px]">{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 4. FINAL PURCHASE & BUY OPTIONS */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 transition-all duration-500 pointer-events-auto p-3 sm:p-4 md:p-6 bg-white/95 backdrop-blur-xl border-t border-black/10 shadow-2xl ${
          isAtBottom ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-xs">
          
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start text-black text-[10px] font-bold uppercase mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>READY FOR DISPATCH</span>
            </div>
            <h3 className="font-display font-black text-base sm:text-lg text-[#070709] uppercase">{product.name}</h3>
            <p className="text-[11px] text-zinc-600 font-bold hidden xs:block">{product.subtitle}</p>
          </div>

          {/* Size / Variant Picker */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-1 border border-black/10 p-0.5 sm:p-1 rounded-full text-xs bg-black/5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedSize(sz);
                    }}
                    className={`px-2.5 sm:px-3 py-1 rounded-full font-bold transition-all text-[11px] sm:text-xs ${
                      selectedSize === sz ? 'bg-[#070709] text-white' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}

            {/* Add to Bag Button */}
            <button
              onClick={handleAdd}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-md ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#070709] text-white hover:bg-black'
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
                  <span>BUY NOW // {formatPrice(product.price)}</span>
                </>
              )}
            </button>

            {/* Next Product Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onSelectProduct(nextProduct);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full border border-black/10 text-zinc-700 hover:text-black hover:border-black text-xs font-bold uppercase transition-all"
            >
              NEXT →
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
