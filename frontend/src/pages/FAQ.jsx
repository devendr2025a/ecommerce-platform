import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Truck,
  Sparkles,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  MessageCircle,
  Phone,
  Mail,
  Home,
  ChevronRight,
  Sprout,
  CheckCircle2,
  Clock,
  PackageCheck,
  X,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions", icon: Sparkles },
  { id: "delivery", label: "Delivery & Timing", icon: Truck },
  { id: "quality", label: "Freshness & Quality", icon: Sprout },
  { id: "payments", label: "Payments & Refunds", icon: CreditCard },
  { id: "orders", label: "Orders & Cancellations", icon: PackageCheck },
  { id: "support", label: "Account & Support", icon: MessageCircle },
];

const FAQ_DATA = [
  // Delivery & Timing
  {
    category: "delivery",
    categoryLabel: "Delivery & Timing",
    icon: Truck,
    popular: true,
    q: "How fast will my grocery order be delivered?",
    a: "Orders are dispatched immediately from your nearest Grosliy local dark store. Typical delivery time is between 10 to 25 minutes depending on traffic and weather conditions in your area.",
    highlights: ["10–25 Min fast dispatch", "Live GPS tracking with rider phone mask"],
  },
  {
    category: "delivery",
    categoryLabel: "Delivery & Timing",
    icon: Clock,
    q: "What are Grosliy's operational delivery hours?",
    a: "We deliver fresh groceries, dairy, and household essentials every single day from 6:00 AM to 11:30 PM. You can also place late-night scheduled orders for early morning milk delivery.",
    highlights: ["Open 7 days a week: 6:00 AM – 11:30 PM", "Early morning milk delivery by 7:00 AM"],
  },
  {
    category: "delivery",
    categoryLabel: "Delivery & Timing",
    icon: Truck,
    q: "Are there any delivery charges?",
    a: "Delivery is 100% FREE on all grocery orders above ₹199! For smaller orders below ₹199, a nominal convenience fee of ₹15 to ₹25 is applied to support our local delivery riders.",
    highlights: ["FREE Delivery on orders ₹199+", "No hidden service fees"],
  },

  // Freshness & Quality
  {
    category: "quality",
    categoryLabel: "Freshness & Quality",
    icon: Sprout,
    popular: true,
    q: "How do you guarantee the freshness of vegetables, fruits & dairy?",
    a: "Our farm-fresh produce is audited and handpicked twice daily from certified local mandi partners. Milk, curd, and bread are strictly stocked with same-day manufacturing batch dates and stored in temperature-controlled chillers.",
    highlights: ["Hand-audited twice daily", "Same-day batch guaranteed for fresh milk & bread"],
  },
  {
    category: "quality",
    categoryLabel: "Freshness & Quality",
    icon: CheckCircle2,
    q: "What if I receive an item that is defective, stale, or near expiry?",
    a: "We offer a 100% Freshness Guarantee. If any item fails to meet your quality expectations, you can raise an instant return through 'My Orders'. Our rider will replace it or process a full refund within minutes.",
    highlights: ["No-questions-asked fresh guarantee", "Instant replacement or refund"],
  },

  // Payments & Refunds
  {
    category: "payments",
    categoryLabel: "Payments & Refunds",
    icon: CreditCard,
    popular: true,
    q: "What payment methods are supported on Grosliy?",
    a: "We support UPI (Google Pay, PhonePe, Paytm, BHIM), all Debit & Credit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ Indian banks, and Cash on Delivery (COD) for eligible pincodes.",
    highlights: ["Instant UPI 1-click payment", "Zero storage of card CVV or PINs"],
  },
  {
    category: "payments",
    categoryLabel: "Payments & Refunds",
    icon: RotateCcw,
    popular: true,
    q: "How quickly are refunds credited to my account?",
    a: "UPI and Grosliy Wallet refunds are processed instantly (typically within 5 to 15 minutes). Credit or Debit card refunds generally take 24 to 48 hours depending on your bank's clearance cycle.",
    highlights: ["Instant UPI refund (5–15 mins)", "Real-time SMS & email confirmation"],
  },
  {
    category: "payments",
    categoryLabel: "Payments & Refunds",
    icon: ShieldCheck,
    q: "Is my payment information safe and encrypted?",
    a: "Absolutely. All transactions on Grosliy are protected with industry-standard 256-Bit SSL encryption and processed through RBI-authorized PCI-DSS Level 1 compliant payment gateways (such as Razorpay).",
    highlights: ["256-Bit SSL secure checkout", "RBI-approved PCI-DSS Level 1"],
  },

  // Orders & Cancellations
  {
    category: "orders",
    categoryLabel: "Orders & Cancellations",
    icon: PackageCheck,
    q: "Can I cancel or modify my order after placing it?",
    a: "You can cancel your order free of cost with a single tap in 'My Orders' before our dark store team starts packing it. Once out for delivery with the rider, cancellations may incur a nominal restocking charge.",
    highlights: ["1-Tap instant free cancellation before packing", "Full refund initiated instantly"],
  },
  {
    category: "orders",
    categoryLabel: "Orders & Cancellations",
    icon: PackageCheck,
    q: "Can I add items to an order that is already in progress?",
    a: "Since our packing and dispatch takes under 5 minutes, you cannot edit an existing order. However, you can place a new order right away and our delivery partners often club them for your convenience.",
    highlights: ["Lightning fast 5-minute packing", "Separate orders can be placed anytime"],
  },

  // Account & Support
  {
    category: "support",
    categoryLabel: "Account & Support",
    icon: MessageCircle,
    popular: true,
    q: "How can I contact Grosliy customer support?",
    a: "Our customer success team is available 24/7. You can message us via WhatsApp, call our toll-free customer desk at +91 800-GROSLIY, or email support@grosliy.com. Average chat response time is under 2 minutes.",
    highlights: ["24/7 Customer Care", "Average chat response under 2 mins"],
  },
  {
    category: "support",
    categoryLabel: "Account & Support",
    icon: ShieldCheck,
    q: "How do I change my registered phone number or address?",
    a: "Simply head over to 'My Account' → 'Saved Addresses' or 'Profile Settings'. You can add, edit, or set default delivery addresses with custom GPS pin locations anytime.",
    highlights: ["Unlimited saved delivery addresses", "Exact GPS pin location support"],
  },
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMap, setOpenMap] = useState({ "0": true }); // First question open by default
  const [feedbackMap, setFeedbackMap] = useState({});

  // Filter questions based on search query and selected category tab
  const filteredQuestions = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (idx) => {
    setOpenMap((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleFeedback = (idx, type) => {
    setFeedbackMap((prev) => ({
      ...prev,
      [idx]: type,
    }));
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen text-gray-800 font-sans pb-12 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5">
        
        {/* ─────────────────────────────────────────────────────────────
            1. HERO SECTION (Compact, Top-Aligned & Modern)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative pb-5 sm:pb-6 border-b border-gray-100/90">
          <div className="max-w-3xl">
            {/* Breadcrumb Pill */}
            <nav className="inline-flex items-center gap-2 text-sm sm:text-[14px] font-semibold text-gray-600 mb-3 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-2xs">
              <Link
                to="/"
                className="hover:text-emerald-700 flex items-center gap-1.5 text-gray-700 transition-colors"
              >
                <Home className="w-4 h-4 text-[#008848]" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#008848] font-bold">Help & FAQs</span>
            </nav>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-none mb-2.5">
              <span className="text-[#1e293b]">Frequently Asked </span>
              <span className="text-[#008848]">Questions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#475569] text-xs sm:text-[13.5px] leading-relaxed mb-4 max-w-xl font-normal">
              Need help with your grocery order, delivery timings, product quality, or instant refunds? Find quick answers right here.
            </p>

            {/* Search Input Box */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., delivery time, refund, milk freshness)..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 shadow-2xs focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Badges on Top Right (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 absolute right-0 top-3">
            <div className="bg-white rounded-xl border border-gray-200/80 p-3 shadow-2xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center font-bold text-xs">
                ⚡
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">10–25 Mins</div>
                <div className="text-[10.5px] text-gray-500">Fast Delivery</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/80 p-3 shadow-2xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center font-bold text-xs">
                🥦
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">100% Fresh</div>
                <div className="text-[10.5px] text-gray-500">Quality Assured</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/80 p-3 shadow-2xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center font-bold text-xs">
                🛡️
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Instant Refund</div>
                <div className="text-[10.5px] text-gray-500">Zero Hassle</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. CATEGORY TABS (Scrollable on Mobile)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#008848] text-white shadow-xs shadow-emerald-700/20"
                    : "bg-white text-gray-600 border border-gray-200/90 hover:border-emerald-200 hover:text-[#008848]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-emerald-600"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. QUESTIONS LIST (Compact Accordion Cards)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-5 space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200/90 p-8 text-center max-w-md mx-auto my-8 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                No matching questions found
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                We couldn't find any questions matching "{searchQuery}". Try searching with different keywords.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-[#008848] text-white font-bold text-xs hover:bg-[#00703c] transition-colors cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            filteredQuestions.map((item, idx) => {
              const isOpen = !!openMap[idx];
              const Icon = item.icon;
              const feedback = feedbackMap[idx];

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "border-emerald-300 shadow-[0_2px_12px_rgba(0,136,72,0.06)]"
                      : "border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.02)] hover:border-emerald-200"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left transition-colors cursor-pointer gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen
                            ? "bg-emerald-50 text-[#008848] border border-emerald-200"
                            : "bg-gray-50 text-gray-600 border border-gray-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            {item.categoryLabel}
                          </span>
                          {item.popular && (
                            <span className="text-[9.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200/70 px-1.5 py-0.2 rounded-md">
                              Popular
                            </span>
                          )}
                        </div>
                        <h2 className="text-xs sm:text-[14px] font-bold text-gray-900 leading-snug">
                          {item.q}
                        </h2>
                      </div>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-emerald-50 text-[#008848] rotate-180"
                          : "text-gray-400 bg-gray-50"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-gray-100 bg-[#fcfdfd]">
                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-3xl">
                        {item.a}
                      </p>

                      {/* Key highlights bullets if any */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          {item.highlights.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] font-medium text-emerald-800"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#008848]" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Helpful Feedback Section */}
                      <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                        <span>Was this answer helpful?</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFeedback(idx, "yes")}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                              feedback === "yes"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold"
                                : "bg-white border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3 text-emerald-600" />
                            <span>Yes</span>
                          </button>
                          <button
                            onClick={() => handleFeedback(idx, "no")}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                              feedback === "no"
                                ? "bg-rose-100 text-rose-800 border-rose-300 font-bold"
                                : "bg-white border-gray-200 hover:border-rose-200"
                            }`}
                          >
                            <ThumbsDown className="w-3 h-3 text-gray-500" />
                            <span>No</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. STILL HAVE QUESTIONS? (Direct Action Cards)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 sm:mt-10 bg-[#f0f6fc] border border-blue-100/90 rounded-2xl p-5 sm:p-6">
          <div className="text-center max-w-xl mx-auto mb-5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
              24x7 Customer Support
            </span>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight mt-1.5">
              Still Have Questions? We're Here to Help!
            </h2>
            <p className="text-xs sm:text-[12.5px] text-gray-600 mt-1">
              Can't find the answer you're looking for? Reach out directly to our customer success team in Lucknow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 border border-gray-200/80 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#008848] mb-2 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-gray-900">WhatsApp Chat</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Response under 2 mins</p>
              <span className="text-xs font-bold text-[#008848] mt-2 group-hover:underline">
                Start Chat &rarr;
              </span>
            </a>

            {/* Toll Free Call */}
            <a
              href="tel:1800123456"
              className="bg-white rounded-xl p-4 border border-gray-200/80 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-gray-900">Call Us</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">+91 800-GROSLIY</p>
              <span className="text-xs font-bold text-blue-600 mt-2 group-hover:underline">
                Call Now &rarr;
              </span>
            </a>

            {/* Email Support */}
            <a
              href="mailto:support@grosliy.com"
              className="bg-white rounded-xl p-4 border border-gray-200/80 hover:border-purple-300 hover:shadow-xs transition-all flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-gray-900">Email Desk</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">support@grosliy.com</p>
              <span className="text-xs font-bold text-purple-600 mt-2 group-hover:underline">
                Write Email &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            5. BOTTOM FOOTER BANNER (Matching Design System)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-6 sm:mt-8 bg-white rounded-xl border border-gray-200/90 p-3.5 sm:p-4.5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left Text */}
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center flex-shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-emerald-800 italic">
                Your satisfaction and fresh daily essentials are our promise.
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Grosliy Technologies • Hazratganj, Lucknow, UP
              </p>
            </div>
          </div>

          {/* Right Text / Freshness Always Doodle */}
          <div className="flex items-center gap-1.5 select-none flex-shrink-0">
            <span className="font-['Caveat',_'Patrick_Hand',_cursive] text-xl sm:text-2xl font-bold text-[#008848] tracking-wide">
              Happy Shopping!
            </span>
            <span className="text-base">💚</span>
          </div>
        </div>

      </div>
    </div>
  );
}
