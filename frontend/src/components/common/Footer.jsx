import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Mail,
  ShieldCheck,
  MapPin,
  Building2,
  FileText,
} from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { label: "New Arrivals", to: "/products?sort=newest" },
    { label: "Best Sellers", to: "/products?sort=best-selling" },
    { label: "Trending Now", to: "/products?sort=trending" },
    { label: "All Products", to: "/products" },
  ],
  Policy: [
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Refund Policy", to: "/refund" },
    { label: "Return Policy", to: "/return" },
    { label: "Shipping Policy", to: "/shipping" },
    { label: "Disclaimer", to: "/disclaimer" },
  ],
  Info: [
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "FAQs", to: "/faq" },
    { label: "Track Order", to: "/dashboard" },
    { label: "How It Works", to: "/how-it-works" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white mt-auto">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/assets/logo.png"
                alt="AVROTIDE"
                className="h-8 w-auto brightness-0 invert select-none hover:opacity-80 transition-opacity"
              />
            </Link>

            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Premium fashion, curated and quality-checked. Delivered with care
              across India.
            </p>

            {/* Registered Address */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 group">
                <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0 group-hover:text-[var(--vg-red)] transition-colors" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-0.5 group-hover:text-gray-400 transition-colors">
                    Registered Address
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    A 32 Dilippur Tower, 5th Floor, HAZRATGANJ ROAD, Lucknow,
                    Uttar Pradesh - 226001
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 group">
                <Building2 className="h-3.5 w-3.5 text-gray-500 flex-shrink-0 group-hover:text-[var(--vg-red)] transition-colors" />
                <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors">
                  <span className="text-gray-600">GST:</span> 09AAZCA8378D2ZV
                </p>
              </div>

              <div className="flex items-center gap-2 group">
                <FileText className="h-3.5 w-3.5 text-gray-500 flex-shrink-0 group-hover:text-[var(--vg-red)] transition-colors" />
                <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors">
                  <span className="text-gray-600">CIN:</span>{" "}
                  U61900UP2023PTC194089
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-2">
                Stay Updated
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 text-xs text-white placeholder:text-gray-600 px-3 py-2 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button className="bg-[var(--vg-red)] px-3 text-white hover:bg-[var(--vg-red-dark)] hover:scale-105 transition-all duration-200">
                  <Mail className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-500 hover:text-white hover:scale-110 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3 hover:text-white transition-colors">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-[11px] text-gray-500 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Gap Kam Kiya */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              Secure 256-bit SSL · Razorpay · COD Available
            </span>
          </div>

          <p className="text-[10px] text-gray-700 uppercase tracking-widest text-center">
            © {new Date().getFullYear()} Avrotide Ventures — Gurugram, Haryana
          </p>

          <div className="flex items-center gap-3 opacity-50 hover:opacity-80 transition-opacity">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-3 w-auto invert"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
              alt="Razorpay"
              className="h-2.5 w-auto invert"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
