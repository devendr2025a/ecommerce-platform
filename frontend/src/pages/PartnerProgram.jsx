import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Users,
  Store,
  Warehouse,
  Bike,
  Layers,
  CheckCircle2,
  ArrowRight,
  Send,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Clock,
  IndianRupee,
  Building2,
} from "lucide-react";
import toast from "react-hot-toast";

const PROGRAMS = [
  {
    id: "partner",
    path: "/partner",
    title: "Partner with Grosliy",
    badge: "Brand & Strategic Partnerships",
    tagline: "Grow your grocery brand with Lucknow's fastest quick-commerce network.",
    icon: Users,
    stats: [
      { label: "Active Customers", value: "25,000+" },
      { label: "Average Delivery", value: "10-25 Mins" },
      { label: "Monthly Growth", value: "35% MoM" },
      { label: "Coverage", value: "Across Lucknow" },
    ],
    benefits: [
      "Direct exposure to thousands of daily household buyers in Lucknow",
      "Prime shelf visibility on Grosliy app & website home screen",
      "Real-time sales analytics and stock movement insights",
      "Dedicated account manager & 48-hour payment settlements",
    ],
    formTitle: "Brand Partnership Inquiry",
  },
  {
    id: "franchise",
    path: "/franchise",
    title: "Franchise & Dark Stores",
    badge: "Business Expansion",
    tagline: "Operate a Grosliy quick-commerce micro-warehouse dark store in Lucknow.",
    icon: Store,
    stats: [
      { label: "Initial Space", value: "1,200 - 2,500 sq.ft" },
      { label: "ROI Horizon", value: "8 - 14 Months" },
      { label: "Orders / Day", value: "400 - 1,200+" },
      { label: "Tech Support", value: "100% Automated" },
    ],
    benefits: [
      "Proven dark store operational model with pre-mapped delivery radius",
      "Centralized procurement and cold-chain inventory replenishment",
      "Automated picking, barcode scanning, and order packing software",
      "Complete branding, marketing, and customer acquisition handled by Grosliy",
    ],
    formTitle: "Franchise Application",
  },
  {
    id: "seller",
    path: "/seller",
    title: "Sell on Grosliy",
    badge: "Local Producer & Supplier Onboarding",
    tagline: "List your farm-fresh produce, regional snacks, and grocery goods.",
    icon: Building2,
    stats: [
      { label: "Onboarding", value: "Within 24 Hours" },
      { label: "Commission", value: "0% for First 30 Days" },
      { label: "Payouts", value: "Twice Weekly" },
      { label: "Support", value: "Dedicated Manager" },
    ],
    benefits: [
      "Zero hassle fulfillment: our riders pick up directly or you drop at hub",
      "Instant reach to Lucknow's residential clusters and apartments",
      "Transparent pricing dashboard and bulk B2B demand forecasts",
      "Guaranteed fair trade pricing for local agricultural producers",
    ],
    formTitle: "Vendor Registration",
  },
  {
    id: "warehouse",
    path: "/warehouse",
    title: "Fulfillment & Warehousing",
    badge: "Supply Chain & Logistics",
    tagline: "State-of-the-art cold-storage and rapid inventory distribution in Lucknow.",
    icon: Warehouse,
    stats: [
      { label: "Total Capacity", value: "45,000+ sq.ft" },
      { label: "Cold Storage", value: "2°C - 8°C Zones" },
      { label: "Dispatch Speed", value: "< 90 Seconds" },
      { label: "Quality Checks", value: "3-Tier Audit" },
    ],
    benefits: [
      "Temperature-controlled zones for fresh dairy, fruits, and frozen foods",
      "Barcode-scanned real-time inventory tracking with zero dead-stock waste",
      "Direct integration with FMCG supply partners like Amul, Tata, and Coca-Cola",
      "24/7 security, CCTV surveillance, and hygienic sanitization protocols",
    ],
    formTitle: "Warehouse Supply Inquiry",
  },
  {
    id: "deliver",
    path: "/deliver",
    title: "Deliver with Us (Rider Partner)",
    badge: "Fleet & Rider Careers",
    tagline: "Earn ₹25,000 - ₹35,000/month delivering groceries with flexible hours.",
    icon: Bike,
    stats: [
      { label: "Monthly Earning", value: "₹25k - ₹35k" },
      { label: "Weekly Payout", value: "Every Tuesday" },
      { label: "Joining Bonus", value: "₹2,000" },
      { label: "Insurance", value: "₹5 Lakh Cover" },
    ],
    benefits: [
      "Short delivery radius (within 2–4 km of your assigned Lucknow dark store)",
      "Flexible shifts: Morning, Evening, or Full-Day options available",
      "Performance incentives, surge pay during peak hours, and tip retention",
      "Free Grosliy safety gear, delivery bag, and medical insurance coverage",
    ],
    formTitle: "Rider Application Form",
  },
  {
    id: "resources",
    path: "/resources",
    title: "Seller & Partner Resources",
    badge: "Documentation & Guidelines",
    tagline: "Guides, compliance checklists, FSSAI standards, and operational manuals.",
    icon: Layers,
    stats: [
      { label: "FSSAI Compliant", value: "100% Certified" },
      { label: "Quality Standard", value: "Grade A Only" },
      { label: "Support", value: "Mon-Sun 7AM-11PM" },
      { label: "API Docs", value: "Available" },
    ],
    benefits: [
      "Comprehensive packaging & labeling guide for fresh food suppliers",
      "Dark store standard operating procedures (SOP) and picking manuals",
      "GST, trade license, and food safety regulatory compliance documentation",
      "Developer API access for bulk inventory synchronization and tracking",
    ],
    formTitle: "Resource & Document Request",
  },
];

export default function PartnerProgram() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active program based on URL or default to 'partner'
  const activeProgram =
    PROGRAMS.find((p) => p.path === currentPath) || PROGRAMS[0];

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Lucknow",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        `Thank you ${form.fullName}! Our Lucknow onboarding team will contact you within 2 hours.`,
        {
          icon: "🤝",
          style: {
            borderRadius: "10px",
            background: "#008848",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "600",
          },
          duration: 5000,
        }
      );
      setForm({
        fullName: "",
        phone: "",
        email: "",
        city: "Lucknow",
        message: "",
      });
    }, 600);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12">
      {/* ── 1. Header Banner ── */}
      <section className="bg-gradient-to-r from-emerald-900 via-[#008848] to-emerald-800 text-white py-8 sm:py-12 px-4 shadow-xs">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>{activeProgram.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {activeProgram.title}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl mx-auto">
            {activeProgram.tagline}
          </p>
        </div>
      </section>

      {/* ── 2. Navigation Tabs ── */}
      <div className="border-b border-gray-200 bg-white sticky top-[76px] z-20 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 py-2.5 min-w-max">
            {PROGRAMS.map((prog) => {
              const Icon = prog.icon;
              const isActive = prog.id === activeProgram.id;
              return (
                <Link
                  key={prog.id}
                  to={prog.path}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#008848] text-white shadow-2xs"
                      : "text-gray-600 hover:text-[#008848] hover:bg-emerald-50/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{prog.title.split(" ")[0]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. Main Content Grid ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {activeProgram.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/80 rounded-xl p-3.5 text-center shadow-2xs"
            >
              <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] font-semibold text-gray-500 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Key Benefits & Features */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 space-y-4 text-left">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <activeProgram.icon className="w-5 h-5 text-[#008848]" />
                <h2 className="text-base sm:text-lg font-black text-gray-900">
                  Why Partner with Grosliy?
                </h2>
              </div>

              <div className="space-y-3">
                {activeProgram.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Support Notice */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 flex items-center justify-between gap-4 text-left">
              <div>
                <p className="text-xs font-black text-gray-900">
                  Prefer direct phone or WhatsApp conversation?
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Our regional Lucknow partnership lead is available daily 7 AM – 11 PM.
                </p>
              </div>

              <a
                href="https://wa.me/917388330600?text=Hi%20Grosliy%20Team%2C%20I%20am%20interested%20in%20the%20partnership%20program."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#008848] hover:bg-[#00703b] text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 flex-shrink-0 shadow-2xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Application / Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs p-5 sm:p-6 text-left">
              <div className="mb-4">
                <h3 className="text-sm sm:text-base font-black text-gray-900">
                  {activeProgram.formTitle}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Fill in your details below and we will get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="e.g. Rahul Verma"
                    className="w-full bg-[#f8fafc] text-gray-800 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-[#008848] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="e.g. 9876543210"
                    className="w-full bg-[#f8fafc] text-gray-800 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-[#008848] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-[#f8fafc] text-gray-800 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-[#008848] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    City / Preferred Area
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Gomti Nagar, Lucknow"
                    className="w-full bg-[#f8fafc] text-gray-800 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-[#008848] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Brief Note or Business Details
                  </label>
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your brand, vehicle, or store location..."
                    className="w-full bg-[#f8fafc] text-gray-800 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-[#008848] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#008848] hover:bg-[#00703b] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {submitting ? "Submitting..." : "Submit Application"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
