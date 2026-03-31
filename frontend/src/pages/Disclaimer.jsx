import React from 'react';

const SECTIONS = [
  { id: 1, title: 'General Information', content: 'All information on this website is provided in good faith for general informational purposes only. We do not guarantee its completeness, reliability, or accuracy.' },
  { id: 2, title: 'Product Use', content: 'Products sold on Avrotide are for general consumer use. Results and fit may vary. Any reliance on product descriptions is at your own discretion.' },
  { id: 3, title: 'Limitation of Liability', content: 'Avrotide shall not be held liable for any indirect, incidental, or consequential damages arising from the purchase or use of products from this website.' },
  { id: 4, title: 'External Links', content: 'Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of those external sites.' },
  { id: 5, title: 'Contact', content: 'For disclaimer-related queries: support@avrotide.com | Avrotide Ventures, Gurugram, Haryana, India.' },
];

export default function Disclaimer() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Legal Notice</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-4">Disclaimer</h1>
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
