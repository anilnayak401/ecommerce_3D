import React, { useState } from 'react';
import { X, Play, Volume2, Sparkles, Monitor, Smartphone, Film, Share2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function AdCreativeModal({ isOpen, onClose, products }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [aspectRatio, setAspectRatio] = useState('9:16'); // '9:16' or '16:9'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-lg"
      />

      <div className="relative w-full max-w-5xl bg-[#0A0A0E] border border-white/10 rounded-2xl overflow-hidden z-10 text-white shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Video Preview Stage */}
        <div className="w-full md:w-1/2 bg-[#050507] p-6 flex flex-col justify-between items-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          <div className="w-full flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
              <span className="font-mono text-xs text-accent-lime font-bold uppercase">
                AD CREATIVE STUDIO REEL
              </span>
            </div>

            {/* Aspect Ratio Switcher */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 rounded-lg text-[10px] font-mono">
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  aspectRatio === '9:16' ? 'bg-accent-lime text-black font-bold' : 'text-zinc-400'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>9:16</span>
              </button>
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  aspectRatio === '16:9' ? 'bg-accent-lime text-black font-bold' : 'text-zinc-400'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>16:9</span>
              </button>
            </div>
          </div>

          {/* Render Frame Video */}
          <div
            className={`my-auto relative rounded-xl border border-white/20 overflow-hidden shadow-2xl bg-black flex items-center justify-center transition-all duration-500 ${
              aspectRatio === '9:16' ? 'w-56 h-96' : 'w-full aspect-video'
            }`}
          >
            <video
              key={selectedProduct.id}
              src={selectedProduct.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Overlay Kinetic Ad Headline */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-4 flex flex-col justify-between text-left pointer-events-none">
              <span className="text-[10px] font-mono text-accent-lime tracking-widest uppercase">
                {selectedProduct.adCreative.tag}
              </span>
              <div>
                <h3 className="font-display font-black text-lg md:text-xl text-white uppercase tracking-tight leading-tight mb-2">
                  {selectedProduct.adCreative.headline}
                </h3>
                <span className="inline-block px-3 py-1 bg-white text-black font-mono font-bold text-[10px] uppercase rounded-full">
                  SHOP NOW // ${selectedProduct.price}
                </span>
              </div>
            </div>
          </div>

          {/* Sound Disclaimer */}
          <div className="w-full text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest z-10">
            OPTIMIZED FOR TIKTOK, REELS & HIGH-CONVERSION CAMPAIGNS
          </div>
        </div>

        {/* Right Selector & Ad Strategy */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-1">
              CAMPAIGN METRICS & COPYWRITING
            </span>
            <h2 className="font-display font-extrabold text-2xl uppercase tracking-wider text-white">
              {selectedProduct.name}
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              {selectedProduct.subtitle}
            </p>
          </div>

          {/* Strategy Details */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] text-accent-lime uppercase font-bold">HOOK COPYWRITING</span>
              <p className="text-white text-xs font-bold font-sans">
                "{selectedProduct.tagline}"
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase">AUDIENCE TARGETING</span>
              <p className="text-zinc-300">
                Luxury tech enthusiasts, haute streetwear collectors, architecture & industrial design aficionados.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-[10px] text-zinc-400 block">EST. CTR</span>
                <span className="text-base font-bold text-accent-lime">4.85%</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-[10px] text-zinc-400 block">ROAS SCALE</span>
                <span className="text-base font-bold text-accent-lime">4.2x</span>
              </div>
            </div>
          </div>

          {/* Campaign Selector Grid */}
          <div>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-2">
              SELECT CAMPAIGN REEL (8 PRODUCT ASSETS)
            </span>
            <div className="grid grid-cols-4 gap-2">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedProduct(p);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`relative aspect-square rounded-lg border overflow-hidden transition-all ${
                    selectedProduct.id === p.id
                      ? 'border-accent-lime ring-2 ring-accent-lime/40'
                      : 'border-white/10 hover:border-white/40'
                  }`}
                >
                  <video src={p.video} muted autoPlay loop playsInline className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
