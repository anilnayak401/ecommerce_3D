import React, { useState } from 'react';
import { X, CheckCircle, Lock, CreditCard, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function CheckoutModal({ isOpen, onClose, cartItems, onCompleteOrder }) {
  const [step, setStep] = useState(1); // 1: Info, 2: Confirmation
  const [form, setForm] = useState({
    name: 'Alexander Wright',
    email: 'alexander.wright@monolith.studio',
    address: '740 Park Avenue, Apt 14B',
    city: 'New York',
    zip: '10021',
    country: 'United States'
  });
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playAddToBag();
    const generatedCode = 'MON-' + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(generatedCode);
    setStep(2);
  };

  const handleFinish = () => {
    soundEngine.playClick();
    onCompleteOrder();
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      <div className="relative w-full max-w-xl bg-[#0A0A0E] border border-white/10 rounded-2xl p-6 md:p-8 z-10 text-white shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-accent-lime text-xs font-mono mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>EXPRESS ENCRYPTED CHECKOUT</span>
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase tracking-wider">
                SHIPPING & PAYMENT
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 uppercase">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-lime"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 uppercase">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-lime"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 uppercase">DESTINATION ADDRESS</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-lime"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 uppercase">CITY</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-lime"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 uppercase">POSTAL CODE</label>
                  <input
                    type="text"
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-lime"
                  />
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-accent-lime" />
                <span>APPLE PAY / EXPRESS CARD</span>
              </div>
              <span className="font-bold text-accent-lime text-sm">${total.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              onMouseEnter={() => soundEngine.playHover()}
              className="w-full py-4 rounded-full bg-accent-lime text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_25px_rgba(226,245,68,0.25)]"
            >
              CONFIRM ORDER & PAY ${total.toLocaleString()}
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-accent-lime/20 text-accent-lime flex items-center justify-center mx-auto border border-accent-lime">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs text-accent-lime uppercase tracking-widest block mb-1">
                TRANSACTION CONFIRMED
              </span>
              <h3 className="font-display font-extrabold text-2xl uppercase tracking-wider">
                ORDER {orderCode}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-2 max-w-sm mx-auto">
                Thank you, {form.name}. Your bespoke dispatch has been logged and is undergoing final quality inspection.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left font-mono text-xs space-y-1">
              <div className="text-zinc-500 uppercase text-[10px]">DELIVERY DESTINATION</div>
              <div className="text-white font-bold">{form.address}, {form.city}</div>
              <div className="text-zinc-400">EXPRESS GLOBAL DISPATCH // 48 HOURS</div>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-accent-lime transition-all"
            >
              RETURN TO CATALOG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
