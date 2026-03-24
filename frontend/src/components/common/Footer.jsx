import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <ShoppingBag className="h-5 w-5 text-blue-400" />
              ShopEasy
            </div>
            <p className="text-sm leading-relaxed">Your trusted online shopping destination. Quality products, great prices.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@shopeasy.com</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          © {new Date().getFullYear()} ShopEasy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
