import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const QUESTIONS = [
  {
    category: 'Orders & Delivery',
    items: [
      { q: 'How can I track my order?', a: 'Go to My Account → My Orders in your dashboard. Once dispatched, a tracking link will also be sent to your registered email and phone.' },
      { q: 'Do you ship across India?', a: 'Yes! We deliver across all states and union territories in India. Delivery timelines vary by location — typically 5–10 business days.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be cancelled or modified within 24 hours of placement by contacting support@avrotide.com. After dispatch, changes are not possible.' },
    ],
  },
  {
    category: 'Products & Sizing',
    items: [
      { q: 'How do I find my correct size?', a: 'Each product page includes a detailed size chart. We recommend comparing measurements with a garment you already own for the best fit.' },
      { q: 'Are all Avrotide products genuine?', a: 'Absolutely. Every product is sourced directly and goes through a multi-point quality audit before listing. We guarantee 100% authenticity.' },
      { q: 'What if the product looks different from the photos?', a: 'We use accurate photography but slight color variations due to screen settings may occur. If significantly different, please raise a return request within 7 days.' },
    ],
  },
  {
    category: 'Payments & Security',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and all major wallets via our secure payment gateway. COD is available on select orders.' },
      { q: 'Is my payment information secure?', a: 'Yes. All transactions are processed through SSL-encrypted payment gateways. We never store your card details on our servers.' },
      { q: 'How do I contact customer support?', a: 'Email us at support@avrotide.com, use the WhatsApp button on our site, or fill the Contact Us form. We respond within 24 business hours.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is the return window?', a: 'You can return products within 7 days of delivery. Items must be unused, unwashed, and in original packaging with all tags intact.' },
      { q: 'How long does a refund take?', a: 'Once we receive and verify the returned item, refunds are processed within 5–7 business days to your original payment method.' },
    ],
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState({});

  const toggle = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenIdx((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Support</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-1">Frequently Asked Questions</h1>
          <p className="text-sm text-[var(--vg-muted)] mt-3">Find quick answers to the most common questions about Avrotide.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        {QUESTIONS.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-0">
            <h2 className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-[0.5em] pb-3 border-b border-[var(--vg-border)] mb-0">
              {cat.category}
            </h2>
            <div className="divide-y divide-[var(--vg-border)] border-b border-[var(--vg-border)]">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = openIdx[key];
                return (
                  <div key={itemIdx}>
                    <button
                      onClick={() => toggle(catIdx, itemIdx)}
                      className="w-full flex items-center justify-between py-4 sm:py-5 text-left hover:bg-[var(--vg-gray)] px-3 sm:px-4 transition-colors -mx-3 sm:-mx-4 gap-3"
                    >
                      <span className="text-[13px] font-bold text-[var(--vg-black)]">{item.q}</span>
                      <Plus className={`h-4 w-4 flex-shrink-0 text-[var(--vg-muted)] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-3 sm:px-4 pb-4">
                        <p className="text-[13px] text-[var(--vg-muted)] leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center bg-[var(--vg-gray)] border border-[var(--vg-border)] p-8 sm:p-12 space-y-4 mt-10">
          <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">Still need help?</h3>
          <p className="text-sm text-[var(--vg-muted)]">Our team is standing by to help with your specific question.</p>
          <a href="/contact" className="btn-primary inline-flex px-10 py-3">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
