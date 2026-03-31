import React from 'react';

const SECTIONS = [
  { id: 1, title: 'Return Window', content: 'Products may be returned within 7 days of confirmed delivery. Requests made after this period will not be accepted.' },
  { id: 2, title: 'Eligibility', content: 'Items must be unused, unwashed, and returned in original packaging with all tags, labels, and accessories intact.' },
  { id: 3, title: 'Return Process', content: 'Email support@avrotide.com with your order number and clear photographs of the product. Our team will initiate a pickup within 2 business days.' },
  { id: 4, title: 'Refund Method', content: 'Once the returned item passes our quality audit, refunds will be credited to the original payment method within 5–7 business days.' },
  { id: 5, title: 'Contact', content: 'Email: support@avrotide.com | Avrotide Ventures, Gurugram, Haryana, India.' },
];

export default function ReturnPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Quality Assurance</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-4">Return Policy</h1>
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
