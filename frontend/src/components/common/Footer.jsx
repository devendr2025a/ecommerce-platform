import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white mt-auto border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Newsletter Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="max-w-sm">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-4">Join the Club</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Stay up to date on all things ShopEasy by signing up for our newsletters below.
              </p>
              
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent border-b border-gray-700 py-3 pr-10 focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 text-sm"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-6 mt-10">
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Youtube className="h-5 w-5" /></a>
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Twitter className="h-5 w-5" /></a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Discovery</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
                <li><Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">Trending Now</Link></li>
                <li><Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">Gift Cards</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Journal</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Accessibility</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Support</h4>
              <ul className="space-y-4">
                <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link to="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/shipping" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/orders" className="text-sm text-gray-400 hover:text-white transition-colors">Order Tracking</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 order-2 md:order-1">
            <select className="bg-[#111111] text-xs font-bold py-2 px-4 rounded border border-gray-800 focus:outline-none focus:border-gray-600 cursor-pointer">
              <option>India (INR ₹)</option>
              <option>United States (USD $)</option>
              <option>United Kingdom (GBP £)</option>
            </select>
          </div>
          
          <div className="text-center order-1 md:order-2 flex flex-col items-center gap-2">
            <Link to="/" className="mb-2">
              <img src="/assets/logo.png" alt="AVROTIDE" className="h-10 w-auto brightness-0 invert select-none" />
            </Link>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} AVROTIDE. All Rights Reserved.
            </p>
          </div>

          <div className="md:w-[140px] order-3"></div> {/* Spacer for symmetry */}
        </div>
      </div>
    </footer>
  );
}
