import React from 'react';
import { ShieldCheck, Truck, Headphones, CheckCircle2 } from 'lucide-react';

const PILLARS = [
  { icon: CheckCircle2, label: 'Verified Sourcing' },
  { icon: Truck, label: 'Reliable Delivery' },
  { icon: ShieldCheck, label: 'Secure Payments' },
  { icon: Headphones, label: 'Dedicated Support' },
];

export default function About() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-14 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.5em]">Our Identity</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[var(--vg-black)] uppercase tracking-[0.06em] leading-none">Avrotide</h1>
          <p className="text-sm text-[var(--vg-muted)] leading-relaxed max-w-xl mx-auto">
            A registered business committed to delivering quality products and a seamless shopping experience across India.
          </p>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em]">Quality Assurance</h2>
              <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
                At Avrotide, we bring you carefully selected products with absolute quality assurance. Every item in our catalog undergoes a multi-point verification process before it reaches your hands. We bridge the gap between premium design and accessibility.
              </p>
            </div>
            <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-10 sm:p-12 flex flex-col items-center text-center space-y-4">
              <ShieldCheck className="h-12 w-12 text-[var(--vg-black)] stroke-[1.5]" />
              <p className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">100% Genuine Guarantee</p>
              <p className="text-[12px] text-[var(--vg-muted)] leading-relaxed">Every product is quality-checked before dispatch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-12 sm:py-16 px-4 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {PILLARS.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-center py-6 sm:py-8 border border-[var(--vg-border)] bg-white hover:border-[var(--vg-black)] transition-colors">
                <Icon className="h-6 w-6 text-[var(--vg-red)] stroke-[1.5]" />
                <span className="text-[10px] sm:text-[11px] font-black text-[var(--vg-black)] uppercase tracking-widest leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-14 sm:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h3 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">Our Commitment</h3>
          <p className="text-sm text-[var(--vg-muted)] leading-relaxed max-w-2xl mx-auto">
            From Gurugram to every corner of Bharat, we are redefining modern commerce with transparency, high standards, and a customer-first philosophy.
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-14 pt-4">
            {[['50K+', 'Happy Customers'], ['100%', 'Genuine Products'], ['4.8★', 'Avg Rating']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-[var(--vg-black)]">{val}</p>
                <p className="text-[10px] sm:text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.2em] mt-1">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
