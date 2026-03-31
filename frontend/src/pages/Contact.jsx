import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const CONTACTS = [
  { icon: Mail, label: 'Email Us', value: 'support@avrotide.com', href: 'mailto:support@avrotide.com' },
  { icon: Phone, label: 'Call Us', value: '+91-9876543210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Office', value: 'Gurugram, Haryana, India — 122001', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">We're Here to Help</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-1">Contact Us</h1>
          <p className="text-sm text-[var(--vg-muted)] mt-3">Our team responds within 24 business hours. Reach out anytime.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em] mb-1">Get In Touch</h2>
                <div className="h-[3px] w-10 bg-[var(--vg-red)]" />
              </div>
              <div className="space-y-4">
                {CONTACTS.map(({ icon: Icon, label, value, href }, i) => (
                  <div key={i} className="flex items-start gap-4 bg-[var(--vg-gray)] border border-[var(--vg-border)] p-4 sm:p-5 hover:border-[var(--vg-black)] transition-colors group">
                    <div className="w-10 h-10 flex items-center justify-center border border-[var(--vg-border)] group-hover:border-[var(--vg-black)] transition-colors flex-shrink-0">
                      <Icon className="h-4 w-4 text-[var(--vg-red)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-[13px] font-bold text-[var(--vg-black)] hover:text-[var(--vg-red)] transition-colors">{value}</a>
                      ) : (
                        <p className="text-[13px] font-bold text-[var(--vg-black)]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-[var(--vg-border)] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--vg-muted)] hover:text-[var(--vg-red)] hover:border-[var(--vg-red)] transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-6 sm:p-8">
              <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em] mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Full Name</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Email Address</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="input-field text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Message</label>
                  <textarea
                    rows={5} required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="input-field resize-none text-sm"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                  {loading ? 'Sending...' : <><Send className="h-3.5 w-3.5" /> Send Message</>}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
