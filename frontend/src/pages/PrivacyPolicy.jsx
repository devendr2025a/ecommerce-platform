import React from "react";
import {
  ShieldCheck,
  Lock,
  User,
  MapPin,
  CreditCard,
  FileText,
  MessageSquare,
  ShoppingCart,
  Bell,
  Megaphone,
  Settings,
  Users,
  Database,
  Cloud,
  Calendar,
  Sprout,
} from "lucide-react";

// Handshake SVG for crisp icon
function HandshakeIcon({ className = "w-4 h-4 text-blue-600" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88" />
      <path d="m7 13-2 2a1 1 0 0 0 0 1.41l2.59 2.59a1 1 0 0 0 1.41 0l3-3" />
      <path d="m10 10-2.5-2.5a1 1 0 0 0-1.41 0L3.5 10.09a3 3 0 0 0 0 4.24l.88.88" />
      <path d="M7 7 5.5 5.5a1 1 0 0 1 0-1.41l1.59-1.59a1 1 0 0 1 1.41 0L10 4" />
      <path d="M17 7l1.5-1.5a1 1 0 0 0 0-1.41l-1.59-1.59a1 1 0 0 0-1.41 0L14 4" />
    </svg>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fcfdfd] min-h-screen text-gray-800 font-sans pb-10 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5">
        
        {/* ─────────────────────────────────────────────────────────────
            HERO HEADER SECTION (Shifted to Top, Clean & Compact)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 pb-4 sm:pb-5 border-b border-gray-100/80">
          {/* Left Hero Content */}
          <div className="flex-1 max-w-2xl z-10">
            {/* Main Title: Privacy Policy */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-none mb-2">
              <span className="text-[#1e293b]">Privacy </span>
              <span className="text-[#008848]">Policy</span>
            </h1>

            {/* Intro Paragraph (Refined, professional & trustworthy) */}
            <p className="text-[#475569] text-xs sm:text-[13.5px] leading-relaxed mb-3.5 max-w-xl font-normal">
              At <strong className="text-gray-900 font-semibold">Grosliy</strong>, your privacy is our core priority. We are committed to protecting your personal data, delivery addresses, and payment details with enterprise-grade encryption and zero third-party selling.
            </p>

            {/* Metadata Pills (Compact Side-by-Side) */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-700">
              {/* Effective Date */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200/90 rounded-lg px-3 py-1.5 shadow-2xs">
                <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-gray-900 font-semibold">Effective Date:</strong> September 20, 2025
                </span>
              </div>

              {/* Governed By */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200/90 rounded-lg px-3 py-1.5 shadow-2xs">
                <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-gray-900 font-semibold">Governed by:</strong> Information Technology (IT) Rules of India
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Visuals (Compact Grocery Bag & Clean Doodle) */}
          <div className="relative w-full sm:w-[380px] lg:w-[360px] flex items-center justify-center pt-2">
            {/* Cursive callout doodle - stacked 2 lines, safely within viewport without any clipping */}
            <div className="absolute top-1 left-2 sm:-left-4 z-20 select-none pointer-events-none text-center">
              <div className="font-['Caveat',_cursive] text-emerald-700 text-lg sm:text-xl font-bold rotate-[-8deg] leading-[1.1] tracking-wide drop-shadow-2xs">
                Your Data
                <br />
                Our Priority
              </div>
              <div className="text-emerald-600 text-sm rotate-[-8deg] mt-0.5">
                💚
              </div>
            </div>

            {/* Grosliy Branded Grocery Bag with Produce */}
            <div className="relative rounded-2xl pt-2">
              <img
                src="/images/grosliy_privacy_hero_bag.png"
                alt="Grosliy Fresh Grocery Bag"
                className="w-full max-h-[220px] sm:max-h-[240px] object-contain drop-shadow-md hover:scale-[1.01] transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/products/veg_basket.png";
                }}
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: Information We Collect (5 Compact Cards)
           ───────────────────────────────────────────────────────────── */}
        <section className="mt-5 sm:mt-6">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 shadow-xs">
              1
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight leading-tight">
                Information We Collect
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Essential data collected solely to ensure timely grocery preparation and doorstep delivery.
              </p>
            </div>
          </div>

          {/* 5 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-2.5 text-blue-600">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Personal Identification
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Full name, verified mobile number, and optional email address.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2.5 text-emerald-600">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Location Information
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Apartment/flat address, pin code, and GPS delivery coordinates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center mb-2.5 text-purple-600">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Payment Information
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                UPI IDs & gateway references. We never store card CVV or PINs.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mb-2.5 text-amber-600">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Device & Usage Data
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Browser type, device ID, and app analytics for bug-free browsing.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-2.5 text-teal-600">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Communication Data
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Customer support chats, rating feedback, and delivery notes.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: How We Use Your Information (6 Cards in 3x2 Grid)
           ───────────────────────────────────────────────────────────── */}
        <section className="mt-5 sm:mt-7">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 shadow-xs">
              2
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight leading-tight">
                How We Use Your Information
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Every record is used strictly to enhance your daily grocery shopping experience:
              </p>
            </div>
          </div>

          {/* 6 Cards Grid (3 Columns x 2 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card 1: Order Fulfillment */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">
                  Order Fulfillment
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  Packing fresh grocery items at the dark store and doorstep dispatch.
                </p>
              </div>
            </div>

            {/* Card 2: Customer Support */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">
                  Customer Support
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  Instant resolution for grocery quality, item refunds, or missing items.
                </p>
              </div>
            </div>

            {/* Card 3: Real-time Updates */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">
                  Real-time Updates
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  Live order tracking, delivery rider location, and digital e-bills.
                </p>
              </div>
            </div>

            {/* Card 4: Marketing & Promotions */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">
                  Marketing & Offers
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  Seasonal grocery discounts and price-drop alerts (1-click opt-out).
                </p>
              </div>
            </div>

            {/* Card 5: Service Improvement */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">
                  Service Improvement
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  Optimizing delivery routes and keeping fresh dairy/veggies in stock.
                </p>
              </div>
            </div>

            {/* Card 6: Legal Compliance */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 hover:shadow-xs transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">
                  Legal Compliance
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  Adhering to Indian E-commerce guidelines and tax audit standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: How We Share Your Information (Compact Blue Box)
           ───────────────────────────────────────────────────────────── */}
        <section className="mt-5 sm:mt-7 bg-[#f0f6fc] border border-blue-100/90 rounded-2xl p-4 sm:p-5">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 shadow-xs">
              3
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight leading-tight">
                How We Share Your Information
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500">
                We strictly never sell or rent your personal data. Sharing happens only for:
              </p>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1: Service Providers */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-2.5">
                <HandshakeIcon className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Service Providers
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Trusted payment gateways (Razorpay) and SMS notification channels.
              </p>
            </div>

            {/* Card 2: Legal Requirements */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center mb-2.5 text-purple-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Legal Requirements
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                When mandated by law enforcement, Indian courts, or regulatory bodies.
              </p>
            </div>

            {/* Card 3: Business Transfers */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-emerald-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2.5 text-emerald-600">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Business Transfers
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Mergers or acquisitions with binding confidentiality safeguards.
              </p>
            </div>

            {/* Card 4: With Your Consent */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-amber-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mb-2.5 text-amber-600">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                With Your Consent
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                When you explicitly give permission for co-branded grocery offers.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4: Data Security & Cloud Infrastructure (Compact Purple Box)
           ───────────────────────────────────────────────────────────── */}
        <section className="mt-5 sm:mt-7 bg-[#faf7ff] border border-purple-100/90 rounded-2xl p-4 sm:p-5">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#a855f7] text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 shadow-xs">
              4
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight leading-tight">
                Data Security & Cloud Infrastructure
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Enterprise security practices defending your grocery orders 24/7.
              </p>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1: Encryption */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-rose-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mb-2.5 text-rose-500">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                256-Bit SSL
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                End-to-end encrypted sessions guarding logins and checkout carts.
              </p>
            </div>

            {/* Card 2: Secure Storage */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-indigo-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-2.5 text-indigo-600">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Encrypted Storage
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Hashed passwords and isolated customer address databases.
              </p>
            </div>

            {/* Card 3: Access Control */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-teal-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-2.5 text-teal-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Strict Access Control
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Only verified support staff can review specific order tickets.
              </p>
            </div>

            {/* Card 4: Cloud Infrastructure */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-all flex flex-col justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-2.5 text-blue-500">
                <Cloud className="w-4 h-4" />
              </div>
              <h3 className="text-[12.5px] font-bold text-gray-900 leading-snug mb-1">
                Tier-1 Cloud
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                High-availability secure cloud hosting with 99.9% uptime.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM FOOTER BANNER (Compact & Clean)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-6 sm:mt-8 bg-white rounded-xl border border-gray-200/90 p-3.5 sm:p-4.5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left Text */}
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center flex-shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-emerald-800 italic">
                We're committed to keeping your information safe and private.
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Have questions or privacy requests? Write to us at{" "}
                <a
                  href="mailto:support@grosliy.com"
                  className="font-bold text-gray-900 underline hover:text-[#008848] transition-colors"
                >
                  support@grosliy.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Text / Thank You */}
          <div className="flex items-center gap-1.5 select-none flex-shrink-0">
            <span className="font-['Caveat',_'Patrick_Hand',_cursive] text-xl sm:text-2xl font-bold text-[#008848] tracking-wide">
              Thank You!
            </span>
            <span className="text-base">💚</span>
          </div>
        </div>

      </div>
    </div>
  );
}
