import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import ProductSkeleton from '../components/products/ProductSkeleton';
import HeroBanner from '../components/common/HeroBanner';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹500' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '7-day return policy' },
  { icon: ShieldCheck, title: 'Secure Payment', desc: '100% safe & encrypted' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated customer support' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ limit: 8, sort: 'newest' })
      .then(({ data }) => setFeatured(data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <HeroBanner />

      {/* Features */}
      <section className="py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
              <p className="text-gray-500 mt-1">Fresh arrivals just for you</p>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-blue-600 font-medium hover:underline text-sm">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <ProductSkeleton count={8} />
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No products available yet.</p>
              <p className="text-sm mt-1">Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to start shopping?</h2>
          <p className="text-gray-400 mb-6">Join thousands of happy customers today.</p>
          <Link to="/register" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors inline-block">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
