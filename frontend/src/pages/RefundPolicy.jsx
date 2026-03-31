import React from 'react';

const SECTIONS = [
  { id: 1, title: 'Order Cancellation', content: 'Orders can be cancelled within 24 hours of placement. Once an order has entered the shipping phase, cancellation is no longer possible.' },
  { id: 2, title: 'Refund Eligibility', content: 'Refunds are processed in cases of damaged products upon delivery, incorrect items shipped, or orders cancelled within the allowed window.' },
  { id: 3, title: 'Refund Timeline', content: 'Approved refunds are processed within 5–7 business days back to the original payment method.' },
  { id: 4, title: 'Non-Refundable Items', content: 'Used or washed products, items damaged by the user, custom or made-to-order pieces, and products returned without original packaging are not eligible.' },
  { id: 5, title: 'Contact', content: 'Email support@avrotide.com with your order ID and issue description for all refund-related requests.' },
];

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Financial Protocols</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-4">Refund & Cancellation</h1>
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
