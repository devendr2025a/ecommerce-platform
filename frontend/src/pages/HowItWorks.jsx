import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Package, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: ShoppingBag,
    step: '01',
    title: 'Browse & Select',
    desc: 'Explore our curated collections. Every product is hand-verified for quality before being listed on the platform.',
  },
  {
    icon: CreditCard,
    step: '02',
    title: 'Secure Checkout',
    desc: 'Complete your purchase through our 100% encrypted payment gateway. We accept UPI, cards, wallets & net banking.',
  },
  {
    icon: Package,
    step: '03',
    title: 'Quality Inspection',
    desc: 'Our team performs a final multi-point quality audit before your order is packaged and dispatched.',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Fast Delivery',
    desc: 'Your order ships within 2–3 business days with real-time tracking updates via email and SMS.',
  },
];

const CHECKLIST = [
  'Fabric Stress & Integrity Testing',
  'Dimensional Accuracy Audit',
  'Packaging Durability Calibration',
  'Final Hand-Stitch Inspection',
];

export default function HowItWorks() {
  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Operational Framework</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.06em] leading-tight">The Avrotide Process</h1>
          <p className="text-sm text-[var(--vg-muted)] max-w-xl mx-auto leading-relaxed">
            Transparency is the foundation of our trust. Here's exactly what happens from the moment you place your order.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, idx) => (
              <div key={idx} className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-6 sm:p-8 space-y-4 hover:border-[var(--vg-black)] transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 flex items-center justify-center border border-[var(--vg-border)] group-hover:border-[var(--vg-black)] transition-colors">
                    <s.icon className="h-5 w-5 text-[var(--vg-red)] stroke-[1.5]" />
                  </div>
                  <span className="text-[32px] font-black text-[var(--vg-border)] leading-none select-none">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-[12px] font-black text-[var(--vg-black)] uppercase tracking-[0.2em] mb-2">{s.title}</h3>
                  <p className="text-[13px] text-[var(--vg-muted)] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-14 sm:py-20 px-4 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Our Standard</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 leading-tight">
                  Commitment to<br />Quality Assurance
                </h2>
              </div>
              <p className="text-sm text-[var(--vg-muted)] leading-relaxed">
                Our quality audit is not a checkbox — it's an obsession. We inspect every seam, every button, every fold. If it isn't perfect, it isn't Avrotide.
              </p>
              <ul className="space-y-3">
                {CHECKLIST.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[var(--vg-red)] flex-shrink-0 stroke-[2]" />
                    <span className="text-[13px] font-bold text-[var(--vg-black)] uppercase tracking-[0.1em]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/products" className="btn-primary inline-flex gap-2 mt-2">
                Shop Now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?w=900&h=1100&fit=crop&q=90"
                alt="Quality Inspection"
                className="w-full object-cover hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 bg-white text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="text-xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">Ready to experience it?</h3>
          <p className="text-sm text-[var(--vg-muted)]">Browse our latest collections and find something made for you.</p>
          <Link to="/products" className="btn-primary inline-flex gap-2 px-10 py-3.5">
            Explore Collection <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
