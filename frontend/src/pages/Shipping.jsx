import React from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Clock,
  ShieldCheck,
  MapPin,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  PackageCheck,
  Zap,
} from "lucide-react";

export default function Shipping() {
  const lastUpdated = "September 2026";

  const shippingHighlights = [
    {
      icon: <Zap className="w-5 h-5 text-emerald-600" />,
      title: "10-15 Minute Delivery",
      desc: "Fast grocery dispatch directly from our local Grosliy dark stores.",
    },
    {
      icon: <PackageCheck className="w-5 h-5 text-emerald-600" />,
      title: "Free Delivery Above ₹499",
      desc: "Enjoy zero delivery fee on all orders of ₹499 or more.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "Temperature Controlled",
      desc: "Cold storage bags keep milk, ice cream, and veggies fresh.",
    },
    {
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      title: "Lucknow Coverage",
      desc: "Serving Hazratganj, Gomti Nagar, Aliganj, Indira Nagar & more.",
    },
  ];

  const sections = [
    {
      id: "speed",
      title: "Instant Delivery Timelines",
      content:
        "Grosliy operates micro-fulfillment dark stores across Lucknow. Once your order is placed, our store pickers pack your items in under 3 minutes, and our delivery partner delivers straight to your doorstep within 10–20 minutes.",
    },
    {
      id: "charges",
      title: "Shipping & Delivery Charges",
      content:
        "Orders valued at ₹499 and above qualify for 100% Free Standard Delivery. For orders below ₹499, a nominal delivery charge of ₹15 to ₹29 applies depending on distance and surge periods.",
    },
    {
      id: "tracking",
      title: "Live GPS Order Tracking",
      content:
        "Track your delivery partner live from our fulfillment hub to your doorstep on the order tracking map. Real-time updates and contact links are provided right inside your Grosliy account.",
    },
    {
      id: "slot",
      title: "Operating Hours & Slots",
      content:
        "Grosliy delivers 7 days a week from 6:00 AM to 11:30 PM. Scheduled delivery slots are also available at checkout for morning milk delivery or evening groceries.",
    },
    {
      id: "delays",
      title: "Weather & Heavy Traffic Delays",
      content:
        "During extreme monsoons, waterlogging, or festival traffic peaks, delivery times may slightly extend. Our customer support team keeps you updated via SMS & WhatsApp.",
    },
  ];

  return (
    <div className="bg-[#fbfcfb] min-h-screen text-gray-800 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#eaf8f0] via-[#f2faf5] to-[#fbfcfb] border-b border-[#c8eed9]/60 pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800/80 mb-4">
            <Link to="/" className="hover:text-emerald-700 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-emerald-700 font-bold">Shipping & Delivery Policy</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Grosliy Express Logistics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Shipping & Delivery Policy
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Fast, reliable doorstep grocery delivery across Lucknow. Here is everything you need to know about our delivery speeds, charges, and coverage.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {shippingHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-emerald-100/90 shadow-[0_4px_16px_rgba(0,136,72,0.06)]"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-2 border border-emerald-100">
                {item.icon}
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-gray-900">{item.title}</h2>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-4">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs hover:border-emerald-200 transition-all"
          >
            <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-black flex items-center justify-center">
                {idx + 1}
              </span>
              {sec.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
