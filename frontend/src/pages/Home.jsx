import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
} from "lucide-react";
import { productAPI } from "../services/api";
import ProductCard from "../components/products/ProductCard";
import ProductSkeleton from "../components/products/ProductSkeleton";
import HeroBanner from "../components/common/HeroBanner";

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Products",
    desc: "Sourced directly and quality verified",
  },
  {
    icon: Truck,
    title: "Free Shipping ₹1999+",
    desc: "Fast & reliable delivery across India",
  },
  {
    icon: RefreshCw,
    title: "Secure Payments",
    desc: "100% encrypted checkout",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Here to help every step of the way",
  },
];

const CATEGORIES = [
  {
    name: "Women's Wear",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=700&fit=crop",
  },
  {
    name: "Men's Wear",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Ethnic Wear",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=700&fit=crop",
  },
  {
    name: "Accessories",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=700&fit=crop",
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI
      .getAll({ limit: 8, sort: "newest" })
      .then(({ data }) => setFeatured(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── Trust Pillars ── */}
      <section className="bg-[var(--vg-gray)] py-6 sm:py-10 border-b border-[var(--vg-border)] overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
            {TRUST_PILLARS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-2.5 sm:gap-3">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--vg-red)] flex-shrink-0 mt-0.5 stroke-[2]" />
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--vg-black)] leading-snug">
                    {title}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[var(--vg-muted)] mt-0.5 leading-snug hidden sm:block">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Releases ── */}
      <section className="py-12 md:py-24 bg-[var(--vg-gray)]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <h2 className="section-title">New Releases</h2>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--vg-black)] hover:text-[var(--vg-red)] transition-colors group"
            >
              View All{" "}
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <ProductSkeleton count={8} />
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[var(--vg-muted)]">
              <p className="text-sm uppercase tracking-widest font-bold">
                Restocking soon — check back!
              </p>
            </div>
          )}

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              to="/products"
              className="btn-primary px-10 sm:px-12 py-3 sm:py-3.5"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shop By Category ── */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="section-title mb-6 sm:mb-10">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {CATEGORIES.map(({ name, img }) => (
              <Link
                key={name}
                to={`/products?category=${encodeURIComponent(name)}`}
                className="relative overflow-hidden aspect-[3/4] group"
              >
                <img
                  src={img}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors" />
                <div className="absolute inset-0 flex items-end p-3 sm:p-5">
                  <span className="text-white text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
                    {name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="py-12 md:py-24 bg-[var(--vg-gray)] border-t border-[var(--vg-border)]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=600&fit=crop&q=90"
                alt="Avrotide"
                className="w-full object-cover"
              />
            </div>
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--vg-red)]">
                Our Philosophy
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[var(--vg-black)] leading-tight">
                Quality First.
                <br />
                Always.
              </h2>
              <p className="text-[var(--vg-muted)] text-sm leading-relaxed">
                Avrotide is built on a single promise — quality you can feel.
                Every product we carry is hand-selected, quality-checked, and
                delivered with care. We believe style shouldn't cost trust.
              </p>
              <div className="flex items-center gap-6 sm:gap-10 pt-1">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[var(--vg-black)]">
                    2K+
                  </p>

                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--vg-muted)] font-bold mt-0.5">
                    Happy Customers
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[var(--vg-black)]">
                    100%
                  </p>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--vg-muted)] font-bold mt-0.5">
                    Genuine Sourcing
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[var(--vg-black)]">
                    4.8★
                  </p>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--vg-muted)] font-bold mt-0.5">
                    Average Rating
                  </p>
                </div>
              </div>
              <Link to="/about" className="btn-secondary inline-flex mt-1">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[var(--vg-black)] text-white py-14 sm:py-20 px-4 sm:px-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-3 sm:mb-4">
          Join the Community
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-3 sm:mb-4">
          Shop Avrotide Today
        </h2>
        <p className="text-gray-400 text-sm max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
          Premium quality products, trusted delivery, and a shopping experience
          that puts you first.
        </p>
        <Link
          to="/products"
          className="btn-primary px-10 sm:px-12 py-3.5 sm:py-4 text-[12px]"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
