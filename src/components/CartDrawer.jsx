import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 1500;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const formatPrice = (amount) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(amount * 0.92)}`;
      case 'GBP': return `£${Math.round(amount * 0.78)}`;
      case 'JPY': return `¥${Math.round(amount * 155).toLocaleString()}`;
      default: return `$${amount}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        onClick={() => {
          soundEngine.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-black/10 text-[#070709] shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="font-display font-extrabold text-base uppercase tracking-wider text-[#070709]">
                YOUR BAG ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="p-2 rounded-full border border-black/10 hover:border-black text-zinc-600 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Indicator */}
          <div className="px-6 py-3 bg-black/5 border-b border-black/5 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-800 mb-1.5 font-bold">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-black" />
                {progressToFreeShipping >= 100
                  ? 'FREE EXPRESS GLOBAL SHIPPING UNLOCKED'
                  : `ADD ${formatPrice(freeShippingThreshold - subtotal)} FOR FREE SHIPPING`}
              </span>
            </div>
            <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-black/5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 font-mono space-y-3">
                <p className="text-xs font-bold">YOUR BAG IS CURRENTLY EMPTY.</p>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-full bg-[#070709] text-white hover:bg-black font-bold text-xs transition-colors shadow-sm"
                >
                  BROWSE PRODUCTS
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-20 bg-[#EBEBEF] border border-black/10 rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                    <video src={item.video} muted autoPlay loop playsInline className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-sm uppercase tracking-tight text-[#070709]">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            onRemoveItem(item.id, item.selectedSize);
                          }}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-600 mt-0.5 font-medium">
                        {item.selectedSize || 'STANDARD'} | {item.selectedColor || 'DEFAULT'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-black/10 rounded-full px-2 py-0.5 bg-black/5 font-mono text-xs">
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1);
                          }}
                          className="p-1 text-zinc-600 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1);
                          }}
                          className="p-1 text-zinc-600 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-black">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-black/10 bg-[#EBEBEF] space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>SHIPPING</span>
                  <span className="font-bold text-black">{progressToFreeShipping >= 100 ? 'FREE' : formatPrice(45)}</span>
                </div>
                <div className="flex items-center justify-between text-black text-sm font-bold pt-2 border-t border-black/10">
                  <span>TOTAL ESTIMATE</span>
                  <span className="text-black">{formatPrice(subtotal + (progressToFreeShipping >= 100 ? 0 : 45))}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onCheckout();
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="w-full py-3.5 rounded-full bg-[#070709] text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-accent-lime" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>256-BIT ENCRYPTED LUXURY CHECKOUT</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
