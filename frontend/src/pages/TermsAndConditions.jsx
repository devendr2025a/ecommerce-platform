import React from 'react';

const SECTIONS = [
  { id: 1, title: 'Eligibility', content: 'By using this website, you confirm that you are at least 18 years of age and legally capable of entering into binding contracts.' },
  { id: 2, title: 'Products & Services', content: 'We strive to ensure all product details, pricing, and availability are accurate. However, errors may occur, and we reserve the right to correct them.' },
  { id: 3, title: 'Order Acceptance', content: 'We reserve the right to cancel or refuse any order at our sole discretion, including in cases of suspected fraud or pricing errors.' },
  { id: 4, title: 'Pricing & Payments', content: 'All prices are listed in Indian Rupees (INR). Payments are processed through secure third-party payment gateways. Avrotide does not store any card details.' },
  { id: 5, title: 'Shipping', content: 'Orders are processed within 2–3 business days. Delivery timelines vary based on your location. See our Shipping Policy for details.' },
  { id: 6, title: 'User Responsibilities', content: 'You agree not to misuse the website, submit false information, engage in fraudulent activities, or attempt to access systems without authorization.' },
  { id: 7, title: 'Intellectual Property', content: 'All content on this website — including images, text, logos, and design — is owned by Avrotide and may not be reproduced without written permission.' },
  { id: 8, title: 'Limitation of Liability', content: 'Avrotide is not liable for indirect, incidental, or consequential damages arising from the use of our website or products to the fullest extent permitted by law.' },
  { id: 9, title: 'Governing Law', content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Gurugram, Haryana.' },
  { id: 10, title: 'Contact', content: 'For legal inquiries: support@avrotide.com | Avrotide Ventures, Gurugram, Haryana, India — 122001.' },
];

export default function TermsAndConditions() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Legal Framework</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-4">Terms & Conditions</h1>
          <div className="h-[3px] w-12 bg-[var(--vg-red)]" />
          <p className="text-[12px] text-[var(--vg-muted)] mt-4 uppercase tracking-widest font-bold">Last Updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <p className="text-sm text-[var(--vg-muted)] leading-relaxed mb-10">
          Welcome to Avrotide ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our website{' '}
          <a href="https://avrotide.com" className="text-[var(--vg-red)] hover:underline">avrotide.com</a>. By using this site you agree to these terms.
        </p>

        <div className="space-y-4">
          {SECTIONS.map((item) => (
            <div key={item.id} className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-5 sm:p-6 hover:border-[var(--vg-black)] transition-colors">
              <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.25em] mb-2">
                {item.id}. {item.title}
              </h3>
              <p className="text-[13px] text-[var(--vg-muted)] leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
