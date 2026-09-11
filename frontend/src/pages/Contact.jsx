import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Headphones,
  User,
  Leaf,
  Truck,
  Heart,
} from "lucide-react";
import { getBackendImageUrl } from "../utils/imageUrl";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Exact mockup decorative assets
  const topLeftLeavesImg = getBackendImageUrl("/images/blinkit/transparent_top_left.png");
  const topRightBagImg = getBackendImageUrl("/images/blinkit/mockup_top_right.png");
  const bottomLeftBasketImg = getBackendImageUrl("/images/blinkit/mockup_bottom_left.png");
  const bottomRightLeavesImg = getBackendImageUrl("/images/blinkit/transparent_bottom_right.png");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Thank you! Your message has been sent to Grosliy Support.", {
      icon: "🌿",
      style: {
        borderRadius: "10px",
        background: "#008848",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
      },
    });
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="bg-[#f9faf9] min-h-screen text-gray-800 selection:bg-emerald-100 selection:text-emerald-900 font-sans pb-16 relative overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          EXACT MATCHING CORNER DECORATIONS FROM MOCKUP
         ───────────────────────────────────────────────────────────── */}
      {/* Top-Left: Floating leaves & handwritten "We're Here to Help" */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-6 lg:left-10 w-40 sm:w-52 lg:w-60 pointer-events-none select-none z-10 hidden sm:block">
        <img
          src={topLeftLeavesImg}
          alt="We're Here to Help"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Top-Right: Fresh Produce Grocery Bag (GroCity) with soft blend */}
      <div
        className="absolute top-0 right-0 w-56 sm:w-72 lg:w-88 pointer-events-none select-none z-0 hidden sm:block"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at 85% 15%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(ellipse at 85% 15%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      >
        <img
          src={topRightBagImg}
          alt="Fresh grocery bag produce"
          className="w-full h-auto object-contain object-top"
        />
      </div>

      {/* Bottom-Left: Vegetable produce basket */}
      <div
        className="absolute bottom-0 left-0 w-32 sm:w-44 lg:w-52 pointer-events-none select-none z-0 hidden md:block"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at 15% 85%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(ellipse at 15% 85%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      >
        <img
          src={bottomLeftBasketImg}
          alt="Fresh produce basket"
          className="w-full h-auto object-contain object-bottom"
        />
      </div>

      {/* Bottom-Right: Soft mint leaves */}
      <div className="absolute bottom-1 right-2 sm:bottom-3 sm:right-6 w-28 sm:w-36 pointer-events-none select-none z-0 hidden sm:block">
        <img
          src={bottomRightLeavesImg}
          alt="Fresh mint leaves"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10">
        {/* 1. Centered Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 pb-6 sm:pb-8">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-[#008848]/30 inline-block" />
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#008848] text-[11px] font-extrabold uppercase tracking-wider shadow-2xs">
              <MessageSquare className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>GROSLY CUSTOMER CARE</span>
            </div>
            <span className="w-6 h-[1.5px] bg-[#008848]/30 inline-block" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-900 tracking-tight leading-tight">
            Contact &amp; Support
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-lg mx-auto">
            Need help with your grocery order or delivery in Lucknow? We're always here
            for you.
          </p>

          {/* Decorative leaf divider */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="w-12 h-[1px] bg-emerald-300 inline-block" />
            <span className="text-emerald-600 text-sm leading-none">🍃</span>
            <span className="w-12 h-[1px] bg-emerald-300 inline-block" />
          </div>
        </div>

        {/* 2. Two-Column Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ──── LEFT CARD: Get In Touch ──── */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-emerald-950/5 border border-gray-100 space-y-4">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                  Get In Touch
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  Choose your preferred way to reach our team.
                </p>
              </div>
            </div>

            {/* 3 Contact Items */}
            <div className="space-y-2.5 pt-1">
              {/* Item 1: Email Support */}
              <a
                href="mailto:support@grosly.com"
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#fafbfa] hover:bg-emerald-50/40 border border-gray-100 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                      EMAIL SUPPORT
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#008848] transition-colors truncate">
                      support@grosly.com
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">
                      Replies within 2 business hours
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0 group-hover:bg-[#008848] group-hover:text-white transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>

              {/* Item 2: Direct Phone */}
              <a
                href="tel:+917388330600"
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#fafbfa] hover:bg-emerald-50/40 border border-gray-100 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                      DIRECT PHONE
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#008848] transition-colors truncate">
                      +91 7388330600
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">
                      Mon - Sun: 7:00 AM - 10:00 PM
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0 group-hover:bg-[#008848] group-hover:text-white transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>

              {/* Item 3: Delivery Hub */}
              <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#fafbfa] border border-gray-100 transition-all group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                      DELIVERY HUB
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900 truncate">
                      Lucknow, Uttar Pradesh
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">
                      Serving Lucknow express delivery
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0">
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Official WhatsApp Button */}
            <div className="pt-1">
              <a
                href="https://wa.me/917388330600?text=Hi%20Grosliy,%20I%20need%20assistance%20with%20my%20grocery%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#16a34a] hover:bg-[#15803d] active:scale-98 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-full shadow-md shadow-green-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                {/* WhatsApp SVG Icon */}
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.03C9.36 7.03 9.09 7.09 8.87 7.33C8.65 7.57 8.02 8.16 8.02 9.36C8.02 10.56 8.9 11.72 9.02 11.89C9.14 12.05 10.73 14.5 13.17 15.56C13.75 15.81 14.2 15.96 14.55 16.07C15.13 16.26 15.66 16.23 16.08 16.17C16.55 16.1 17.52 15.58 17.72 15.01C17.93 14.45 17.93 13.97 17.87 13.87C17.81 13.77 17.65 13.71 17.41 13.59C17.17 13.47 15.98 12.89 15.76 12.81C15.54 12.73 15.38 12.69 15.22 12.93C15.06 13.17 14.6 13.71 14.46 13.87C14.32 14.03 14.18 14.05 13.94 13.93C13.7 13.81 12.92 13.56 12 12.74C11.28 12.1 10.79 11.31 10.65 11.07C10.51 10.83 10.64 10.7 10.76 10.58C10.87 10.47 11.01 10.29 11.13 10.15C11.25 10.01 11.29 9.91 11.37 9.75C11.45 9.59 11.41 9.45 11.35 9.33C11.29 9.21 10.83 8.08 10.64 7.62C10.45 7.17 10.26 7.23 10.12 7.22C9.99 7.22 9.83 7.22 9.67 7.22L9.53 7.03Z" />
                </svg>
                <span>Chat Directly on WhatsApp</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Guarantee Box */}
            <div className="bg-[#eaf7ee] border border-[#c3ebcb] rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="text-[11px] text-gray-700 leading-relaxed">
                <strong className="font-extrabold text-gray-900">
                  100% Fresh &amp; Authentic Guarantee:
                </strong>{" "}
                If you receive any damaged or unsatisfactory item in Lucknow, we
                offer instant replacement or refund.
              </div>
            </div>
          </div>

          {/* ──── RIGHT CARD: Send Us a Message ──── */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-emerald-950/5 border border-gray-100 space-y-4">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                  Send Us a <span className="text-[#008848]">Message</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  Fill out the quick form and our team will get back to you promptly.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <User className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Full Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 bg-white focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Mail className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Email Address</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 bg-white focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: How Can We Help? */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                  <MessageSquare className="w-3.5 h-3.5 text-[#16a34a]" />
                  <span>How Can We Help?</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your question, order issue, or feedback here..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 bg-white focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] active:scale-98 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-full shadow-md shadow-green-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. Bottom 4-Pillar Floating Value Proposition Strip */}
        <div className="mt-8 sm:mt-12 bg-white/95 backdrop-blur-md rounded-full border border-gray-100 shadow-md py-3 px-6 sm:px-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 divide-y sm:divide-y-0 lg:divide-x divide-gray-100 text-center">
            {/* Pillar 1: Fresh Products */}
            <div className="flex items-center justify-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#16a34a] flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-gray-900">Fresh Products</div>
                <div className="text-[10px] text-gray-400 font-medium">Always fresh &amp; healthy</div>
              </div>
            </div>

            {/* Pillar 2: Fast Delivery */}
            <div className="flex items-center justify-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#16a34a] flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-gray-900">Fast Delivery</div>
                <div className="text-[10px] text-gray-400 font-medium">At your doorstep</div>
              </div>
            </div>

            {/* Pillar 3: Secure Payments */}
            <div className="flex items-center justify-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#16a34a] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-gray-900">Secure Payments</div>
                <div className="text-[10px] text-gray-400 font-medium">100% safe &amp; encrypted</div>
              </div>
            </div>

            {/* Pillar 4: Happy Customers */}
            <div className="flex items-center justify-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#16a34a] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-gray-900">Happy Customers</div>
                <div className="text-[10px] text-gray-400 font-medium">Trusted by thousands</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
