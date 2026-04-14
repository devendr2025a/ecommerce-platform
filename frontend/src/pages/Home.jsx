import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
  CheckCircle2,
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

const WHY_CHOOSE = [
  "100% Authentic & Premium Fabrics",
  "Handcrafted by Skilled Artisans",
  "Direct Sourcing from Small Retailers",
  "Affordable Luxury Pricing",
  "Trusted by 2000+ Happy Customers",
];

const CATEGORIES = [
  {
    name: "chikankari suit",
    img: "https://i.etsystatic.com/25343224/r/il/60e9ab/5894597556/il_570xN.5894597556_g0oc.jpg",
  },
  {
    name: "cotton kurta",
    img: "https://5.imimg.com/data5/SELLER/Default/2022/8/OU/CF/NF/74166486/party-wear-male-female-kurta-pajama-combo-500x500.jpeg",
  },
  {
    name: "silk sarees",
    img: "https://m.media-amazon.com/images/I/717FRfcyG-L._AC_UY1100_.jpg",
  },
  {
    name: "Accessories",
    img: "https://panaxmart.com/cdn/shop/articles/Jewelry-laydown-two.jpg?v=1695801014",
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
          ) : featured?.length > 0 ? (
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
                Avrotide is built on a single promise quality you can feel.
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

      {/* ── Why Choose Avrotide (Before Final CTA) ── */}
      <section className="py-12 md:py-16 bg-white border-b border-[var(--vg-border)]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] text-center mb-8">
            Why Choose Avrotide?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3 border border-[var(--vg-border)] bg-[var(--vg-gray)] cursor-pointer hover:border-[var(--vg-red)] hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--vg-red)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-[var(--vg-black)] uppercase tracking-[0.05em] group-hover:text-[var(--vg-red)] transition-colors">
                  {item}
                </span>
              </div>
            ))}
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
