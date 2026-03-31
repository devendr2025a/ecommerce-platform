import React from 'react';

const SECTIONS = [
  { id: 1, title: 'Information We Collect', content: 'Name, email address, phone number, shipping & billing address, and payment details (processed securely via third-party providers — we never store card data).' },
  { id: 2, title: 'How We Use Your Data', content: 'To process and fulfill orders, to improve your shopping experience, to send order updates, and to communicate promotional offers (with your consent).' },
  { id: 3, title: 'Data Sharing', content: 'We do not sell your personal data. Information may be shared only with trusted payment gateways and logistics partners strictly for order fulfillment.' },
  { id: 4, title: 'Cookies', content: 'We use cookies to enhance your browsing experience, track site preferences, and analyze traffic. You may disable cookies via browser settings.' },
  { id: 5, title: 'Data Security', content: 'We implement industry-standard security measures including SSL encryption and secure server infrastructure to protect your personal information.' },
  { id: 6, title: 'Your Rights', content: 'You have the right to access, update, or request deletion of your personal data at any time by contacting us at support@avrotide.com.' },
  { id: 7, title: 'Contact', content: 'For privacy-related concerns: support@avrotide.com | Avrotide Ventures, Gurugram, Haryana, India.' },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Data Protection</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-4">Privacy Policy</h1>
          <div className="h-[3px] w-12 bg-[var(--vg-red)]" />
          <p className="text-[12px] text-[var(--vg-muted)] mt-4 uppercase tracking-widest font-bold">Last Updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <p className="text-sm text-[var(--vg-muted)] leading-relaxed mb-10">
          Avrotide respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
        </p>
        <div className="space-y-4">
          {SECTIONS.map((item) => (
            <div key={item.id} className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-5 sm:p-6 hover:border-[var(--vg-black)] transition-colors">
              <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.25em] mb-2">{item.id}. {item.title}</h3>
              <p className="text-[13px] text-[var(--vg-muted)] leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
