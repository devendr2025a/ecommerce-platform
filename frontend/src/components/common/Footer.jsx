import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, Mail, ShieldCheck } from 'lucide-react';

const FOOTER_LINKS = {
  Shop: [
    { label: 'New Arrivals', to: '/products?sort=newest' },
    { label: 'Best Sellers', to: '/products?sort=best-selling' },
    { label: 'Trending Now', to: '/products?sort=trending' },
    { label: 'All Products', to: '/products' },
  ],
  'Policy': [
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Refund Policy', to: '/refund' },
    { label: 'Return Policy', to: '/return' },
    { label: 'Shipping Policy', to: '/shipping' },
    { label: 'Disclaimer', to: '/disclaimer' },
  ],
  Info: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'FAQs', to: '/faq' },
    { label: 'Track Order', to: '/dashboard' },
    { label: 'How It Works', to: '/how-it-works' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-auto">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-7">
            <Link to="/">
              <img src="/assets/logo.png" alt="AVROTIDE" className="h-9 w-auto brightness-0 invert select-none" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium fashion, curated and quality-checked. Delivered with care across India.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-300 mb-3">Stay Updated</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 px-4 py-2.5 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button className="bg-[var(--vg-red)] px-4 text-white hover:bg-[var(--vg-red-dark)] transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-500 hover:text-white transition-colors">
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-5">{title}</h4>
                <ul className="space-y-3">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link to={to} className="text-[12px] text-gray-500 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Secure 256-bit SSL · Razorpay · COD Available</span>
          </div>

          <p className="text-[11px] text-gray-600 uppercase tracking-widest text-center">
            &copy; {new Date().getFullYear()} Avrotide Ventures &mdash; Gurugram, Haryana
          </p>

          <div className="flex items-center gap-4 opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 w-auto invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-3 w-auto invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}
