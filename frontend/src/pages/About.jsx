import React from 'react';
import { ShieldCheck, Truck, Headphones, CheckCircle2, Heart, Eye, Star, Users, Package, TrendingUp, ShoppingBag, IndianRupee, Award } from 'lucide-react';

const PILLARS = [
  { icon: CheckCircle2, label: 'Authentic Fabrics' },
  { icon: Heart, label: 'Artisan Crafted' },
  { icon: Eye, label: 'Premium Quality' },
  { icon: Star, label: '2000+ Happy Customers' },
];

const CATEGORIES = [
  { name: 'Cotton Kurtas', range: '₹1,800 – ₹2,800', desc: 'Breathable, daily & festive wear' },
  { name: 'Chikankari Suits', range: '₹2,500 – ₹4,500', desc: 'Hand-embroidered elegance' },
  { name: 'Silk Sarees', range: '₹3,500 – ₹5,500', desc: 'Premium festive & occasion wear' },
  { name: 'Linen Shirts & Pants', range: '₹2,000 – ₹3,800', desc: 'Smart ethnic-fusion wear' },
  { name: 'Pashmina Stoles', range: '₹2,800 – ₹5,000', desc: 'Soft, luxurious winter wear' },
];

const WHY_CHOOSE = [
  '100% Authentic & Premium Fabrics',
  'Handcrafted by Skilled Artisans',
  'Direct Sourcing from Small Retailers',
  'Affordable Luxury Pricing',
  'Trusted by 2000+ Happy Customers',
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
            We celebrate the quiet luxury of tradition. Born from a deep appreciation for India's rich textile legacy.
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-5 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em]">Timeless Craftsmanship</h2>
            <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
              Avrotide is a refined expression of timeless craftsmanship reimagined for the modern connoisseur. 
              Each creation is a tribute to heritage where age-old techniques meet contemporary elegance.
            </p>
            <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
              We work closely with a select network of skilled artisans, master weavers, and ethical suppliers, 
              sourcing fabrics that are not only authentic but exceptional in quality. From the softness of pure 
              cotton and linen to the opulence of silk and the finesse of intricate Chikankari, every piece is 
              thoughtfully curated to embody understated sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { title: 'Craftsmanship', desc: 'over mass production' },
              { title: 'Quality', desc: 'over quantity' },
              { title: 'Authenticity', desc: 'over trends' },
            ].map((item) => (
              <div key={item.title} className="border border-[var(--vg-border)] p-6 bg-[var(--vg-gray)] cursor-pointer hover:border-[var(--vg-red)] hover:shadow-lg transition-all duration-300 group">
                <p className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.2em] group-hover:text-[var(--vg-red)] transition-colors">{item.title}</p>
                <p className="text-xs text-[var(--vg-muted)] mt-1 group-hover:text-[var(--vg-black)] transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Vision */}
      <section className="py-14 sm:py-20 px-4 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3 cursor-pointer hover:translate-x-1 transition-transform duration-300">
            <h3 className="text-xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em] hover:text-[var(--vg-red)] transition-colors">Our Philosophy</h3>
            <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
              To redefine ethnic wear as a form of everyday luxury in which tradition is not just preserved but elevated.
            </p>
          </div>
          <div className="space-y-3 cursor-pointer hover:translate-x-1 transition-transform duration-300">
            <h3 className="text-xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em] hover:text-[var(--vg-red)] transition-colors">Our Vision</h3>
            <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
              To be recognised as a distinguished destination for premium ethnic fashion, known for its craftsmanship, 
              authenticity, and enduring style.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Avrotide */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8">Why Choose Avrotide?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {WHY_CHOOSE.map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 border border-[var(--vg-border)] bg-[var(--vg-gray)] cursor-pointer hover:border-[var(--vg-red)] hover:bg-white hover:shadow-md transition-all duration-300 group">
                <CheckCircle2 className="h-4 w-4 text-[var(--vg-red)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-[var(--vg-black)] uppercase tracking-[0.05em] group-hover:text-[var(--vg-red)] transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOAT */}
      <section className="py-14 sm:py-20 px-4 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] hover:text-[var(--vg-red)] transition-colors cursor-pointer">Our MOAT</h2>
          <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
            At Avrotide, our journey begins at the source within the ateliers of India's finest artisans, 
            where heritage is not recreated, but lived.
          </p>
          <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
            We partner with a select circle of master craftsmen, weavers, and ethical suppliers, whose work is rooted 
            in tradition and refined through generations. In an age of mass production, we choose a different path — 
            one of intentional creation and quiet luxury.
          </p>
          <div className="border-t border-[var(--vg-border)] pt-6 mt-4">
            <p className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.2em] italic hover:text-[var(--vg-red)] transition-colors cursor-pointer">
              "What you wear from Avrotide is more than clothing; it is a reflection of craftsmanship, culture, and considered design."
            </p>
          </div>
        </div>
      </section>

      {/* Category Table */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8">Our Collections</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--vg-black)]">
                  <th className="text-left py-3 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--vg-black)]">Category</th>
                  <th className="text-left py-3 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--vg-black)]">Description</th>
                  <th className="text-left py-3 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--vg-black)]">Price Range</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((cat, idx) => (
                  <tr key={cat.name} className={`border-b border-[var(--vg-border)] ${idx % 2 === 0 ? 'bg-white' : 'bg-[var(--vg-gray)]'} cursor-pointer hover:bg-[var(--vg-red)]/5 transition-colors duration-300 group`}>
                    <td className="py-3 px-4 text-sm font-bold text-[var(--vg-black)] group-hover:text-[var(--vg-red)] transition-colors">{cat.name}</td>
                    <td className="py-3 px-4 text-xs text-[var(--vg-muted)] group-hover:text-[var(--vg-black)] transition-colors">{cat.desc}</td>
                    <td className="py-3 px-4 text-sm font-bold text-[var(--vg-red)] group-hover:scale-105 transition-transform">{cat.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PILLARS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center cursor-pointer group">
                <Icon className="h-6 w-6 text-[var(--vg-red)] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] font-black text-[var(--vg-black)] uppercase tracking-widest text-center group-hover:text-[var(--vg-red)] transition-colors">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}