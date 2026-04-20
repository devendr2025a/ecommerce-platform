import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
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

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5" />
                <p className="text-[11px] text-gray-500">
                  A 32 Dilippur Tower, Hazratganj, Lucknow - 226001
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-gray-500" />
                <p className="text-[11px] text-gray-500">
                  GST: 09AAZCA8378D2ZV
                </p>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-gray-500" />
                <p className="text-[11px] text-gray-500">
                  CIN: U61900UP2023PTC194089
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-1">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/5 border border-white/10 text-xs text-white px-3 py-2"
                />
                <button className="bg-red-600 px-3">
                  <Mail className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#">
                  <Icon className="h-4 w-4 text-gray-500 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] text-gray-400 mb-3">
                  {title}
                </h4>

                <ul className="space-y-2">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        onClick={() => {
                          // ✅ Safari FIX
                          setTimeout(() => {
                            window.scrollTo(0, 0);
                          }, 0);
                        }}
                        className="text-[11px] text-gray-500 hover:text-white"
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

        {/* Bottom */}
        <div className="mt-8 pt-5 border-t border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
            <span className="text-[10px] text-gray-600">
              Secure Payment
            </span>
          </div>

          <p className="text-[10px] text-gray-600">
            © {new Date().getFullYear()} Avrotide
          </p>
        </div>

      </div>
    </footer>
  );
}