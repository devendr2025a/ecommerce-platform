import React from 'react';

const SECTIONS = [
  { id: 1, title: 'Processing Time', content: 'Orders are processed within 2–3 business days of payment confirmation, excluding Sundays and public holidays.' },
  { id: 2, title: 'Delivery Time', content: 'Standard delivery across India typically takes 5–10 business days depending on your location. Remote areas may take longer.' },
  { id: 3, title: 'Shipping Charges', content: 'Shipping fees are calculated at checkout based on weight and destination. Orders above ₹499 qualify for free standard shipping.' },
  { id: 4, title: 'Delays', content: 'Occasional delays may occur due to courier constraints, extreme weather, or peak sale seasons. We will notify you in such cases.' },
  { id: 5, title: 'Order Tracking', content: 'Once dispatched, a tracking number will be sent to your registered email and phone number within 24 hours.' },
  { id: 6, title: 'Contact', content: 'For shipping inquiries: support@avrotide.com | Avrotide Ventures, Gurugram, Haryana, India.' },
];

export default function Shipping() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Logistics</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-4">Shipping Policy</h1>
          <div className="h-[3px] w-12 bg-[var(--vg-red)]" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-4">
        {SECTIONS.map((item) => (
          <div key={item.id} className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-5 sm:p-6 hover:border-[var(--vg-black)] transition-colors">
            <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.25em] mb-2">{item.id}. {item.title}</h3>
            <p className="text-[13px] text-[var(--vg-muted)] leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
