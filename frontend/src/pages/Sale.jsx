import React from 'react';
import { CheckCircle2, Users, Package, ShoppingBag, Truck, IndianRupee } from 'lucide-react';

const WHOLESALE_BENEFITS = [
  { icon: Users, title: 'Dedicated account support', desc: 'for bulk buyers' },
  { icon: Package, title: 'Flexible ordering options', desc: 'across categories' },
  { icon: ShoppingBag, title: 'Curated collections', desc: 'aligned with current market demand' },
  { icon: Truck, title: 'Streamlined processing', desc: 'and pan-India delivery' },
];

const MOQ_TABLE = [
  { category: 'Cotton Kurtas', moq: '1000 pieces' },
  { category: 'Chikankari Suits', moq: '500 pieces' },
  { category: 'Silk Sarees', moq: '500 pieces' },
  { category: 'Linen Shirts & Pants', moq: '1000 pieces' },
  { category: 'Pashmina Stoles', moq: '300 pieces' },
];

export default function Sale() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-14 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.5em]">Bulk Orders</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[var(--vg-black)] uppercase tracking-[0.06em] leading-none">Wholesale & Bulk Orders</h1>
          <p className="text-sm text-[var(--vg-muted)] leading-relaxed max-w-xl mx-auto">
            Extend our craftsmanship beyond individual customers — collaborate with boutique owners, resellers, 
            and business partners who value authenticity, quality, and timeless ethnic fashion.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] hover:text-[var(--vg-red)] transition-colors cursor-pointer">Why Partner with Avrotide?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Premium handcrafted collections',
              'Consistent quality from trusted artisans',
              'Competitive wholesale pricing',
              'Exclusive designs with limited availability',
              'Reliable & scalable supply',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 border border-[var(--vg-border)] bg-[var(--vg-gray)] cursor-pointer hover:border-[var(--vg-red)] hover:bg-white hover:shadow-md transition-all duration-300 group">
                <CheckCircle2 className="h-4 w-4 text-[var(--vg-red)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-[var(--vg-black)] uppercase tracking-[0.05em] group-hover:text-[var(--vg-red)] transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Partner */}
      <section className="py-14 sm:py-20 px-4 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8 hover:text-[var(--vg-red)] transition-colors cursor-pointer">Who Can Partner With Us?</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Boutique stores', 'Ethnic wear retailers', 'Online resellers', 'Fashion curators', 'Personal stylists'].map((item) => (
              <span key={item} className="px-4 py-2 bg-white border border-[var(--vg-border)] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--vg-black)] cursor-pointer hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] hover:shadow-md transition-all duration-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Benefits */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8 hover:text-[var(--vg-red)] transition-colors cursor-pointer">Wholesale Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHOLESALE_BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 bg-[var(--vg-gray)] border border-[var(--vg-border)] cursor-pointer hover:border-[var(--vg-red)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <Icon className="h-5 w-5 text-[var(--vg-red)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.1em] group-hover:text-[var(--vg-red)] transition-colors">{title}</p>
                  <p className="text-[10px] text-[var(--vg-muted)] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOQ Table */}
      <section className="py-14 sm:py-20 px-4 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8 hover:text-[var(--vg-red)] transition-colors cursor-pointer">Minimum Order Quantity (MOQ)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--vg-black)] text-white">
                  <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-[0.1em]">Category</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-[0.1em]">MOQ</th>
                </tr>
              </thead>
              <tbody>
                {MOQ_TABLE.map((item, idx) => (
                  <tr key={item.category} className={`border-b border-[var(--vg-border)] ${idx % 2 === 0 ? 'bg-white' : 'bg-[var(--vg-gray)]'} cursor-pointer hover:bg-[var(--vg-red)]/5 transition-colors duration-300 group`}>
                    <td className="py-3 px-4 text-sm font-bold text-[var(--vg-black)] group-hover:text-[var(--vg-red)] transition-colors">{item.category}</td>
                    <td className="py-3 px-4 text-sm text-[var(--vg-muted)] group-hover:text-[var(--vg-black)] transition-colors">{item.moq}</td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[var(--vg-muted)] mt-2 italic text-center">MOQ may vary depending on design availability and customisation requirements.</p>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8 hover:text-[var(--vg-red)] transition-colors cursor-pointer">Wholesale Pricing Structure</h2>
          <div className="space-y-2">
            {[
              { tier: 'Standard Wholesale', desc: 'Ideal for small boutiques and new resellers' },
              { tier: 'Volume-Based Pricing', desc: 'Better margins on higher quantities' },
              { tier: 'Custom Orders', desc: 'Special pricing for curated or exclusive requirements' },
            ].map((item) => (
              <div key={item.tier} className="flex items-center gap-3 p-3 bg-[var(--vg-gray)] border border-[var(--vg-border)] cursor-pointer hover:border-[var(--vg-red)] hover:shadow-md hover:translate-x-1 transition-all duration-300 group">
                <IndianRupee className="h-4 w-4 text-[var(--vg-red)] group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[12px] font-black text-[var(--vg-black)] uppercase tracking-[0.05em] group-hover:text-[var(--vg-red)] transition-colors">{item.tier}</p>
                  <p className="text-[10px] text-[var(--vg-muted)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[var(--vg-muted)] mt-2 text-center">Detailed pricing is shared upon inquiry to ensure a tailored approach based on your business needs and order volume.</p>
        </div>
      </section>

      {/* Order Process */}
      <section className="py-14 sm:py-20 px-4 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8 hover:text-[var(--vg-red)] transition-colors cursor-pointer">Order & Fulfilment Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[
              'Share requirement via email',
              'Receive catalogue & pricing',
              'Confirm order & payment',
              'Order processing & QC',
              'Dispatch with tracking',
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-2 p-3 bg-white border border-[var(--vg-border)] text-center cursor-pointer hover:border-[var(--vg-red)] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <span className="text-[var(--vg-red)] font-black text-sm group-hover:scale-110 transition-transform">{i + 1}</span>
                <span className="text-[10px] font-bold text-[var(--vg-black)] uppercase tracking-[0.05em] group-hover:text-[var(--vg-red)] transition-colors">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agreement */}
      <section className="py-14 sm:py-20 px-4 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 bg-[var(--vg-gray)] border border-[var(--vg-border)] cursor-pointer hover:border-[var(--vg-red)] hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em] mb-3 hover:text-[var(--vg-red)] transition-colors text-center">Wholesale Agreement & Policies</h2>
            <ul className="space-y-2 text-xs text-[var(--vg-muted)]">
              <li className="hover:text-[var(--vg-black)] transition-colors">• All wholesale orders are confirmed against advance payment</li>
              <li className="hover:text-[var(--vg-black)] transition-colors">• Production timelines may vary based on order size</li>
              <li className="hover:text-[var(--vg-black)] transition-colors">• Minor variations may occur due to the handcrafted nature of products</li>
              <li className="hover:text-[var(--vg-black)] transition-colors">• Returns/exchanges for wholesale orders are subject to mutual agreement</li>
              <li className="hover:text-[var(--vg-black)] transition-colors">• A detailed wholesale agreement can be shared upon request</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 bg-[var(--vg-gray)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center p-8 bg-white border border-[var(--vg-border)] cursor-pointer hover:border-[var(--vg-red)] hover:shadow-xl transition-all duration-300 group">
            <h2 className="text-xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em] mb-3 group-hover:text-[var(--vg-red)] transition-colors">How to Get Started</h2>
            <p className="text-sm text-[var(--vg-muted)] mb-4 group-hover:text-[var(--vg-black)] transition-colors">
              Reach out with: Business name & location • Product categories of interest • Approximate order quantity
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--vg-black)] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--vg-red)] hover:scale-105 transition-all duration-300 cursor-pointer">
              📩 Email us: wholesale@avrotide.com
            </div>
            <p className="text-[10px] text-[var(--vg-muted)] mt-4 italic">
              Our team will connect with you promptly to share the catalogue, pricing, and next steps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}