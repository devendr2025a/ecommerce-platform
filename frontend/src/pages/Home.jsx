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
    productAPI.getAll({ limit: 20, sort: 'newest' })
      .then(({ data }) => setFeatured(data.products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <HeroBanner />

      {/* Features */}
      <section className="py-16 px-4 bg-[#050505] border-b border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-800 group-hover:bg-white group-hover:text-black transition-all">
                <Icon className="h-5 w-5 stroke-[1]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{title}</h3>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-20 px-4 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">The Latest Drop</h2>
              <div className="h-1 w-12 bg-white" />
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">New Arrivals. Shop the collection.</p>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white border-b border-transparent hover:border-white transition-all pb-1 w-fit">
              View All Products <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              <ProductSkeleton count={10} />
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-2 lg:gap-4">
              {featured.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-700 bg-[#050505] rounded-sm border border-dashed border-gray-900">
              <p className="text-sm font-bold uppercase tracking-widest">Restocking soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Explore Categories */}
      <section className="py-24 px-4 bg-[#080808] border-y border-gray-900">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Shop By Category</h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">Curated selections for every lifestyle</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                    "Kids' Wear", "Accessories", "Footwear", "Winter Wear", 
                    "Jewellery", "Activewear", "Ethinic Wear", "Bags & Handbags",
                    "Western Wear", "Sarees", "Kurtas & Suits", "Men's Wear",
                    "Women's Wear", "Innerwear"
                ].map((cat) => (
                    <Link 
                        key={cat} 
                        to={`/products?category=${encodeURIComponent(cat)}`}
                        className="group relative h-40 flex items-center justify-center bg-[#000000] border border-gray-900 hover:border-white transition-all p-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <span className="relative z-20 text-[10px] font-black uppercase tracking-[0.2em] transform group-hover:scale-110 transition-transform">
                            {cat}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#000000] text-white py-32 px-4 border-t border-gray-900">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Join the Movement</h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">Become a member of the AVROTIDE community.</p>
          </div>
          <Link to="/register" className="btn-primary inline-block">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}
