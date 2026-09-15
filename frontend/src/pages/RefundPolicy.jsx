import React from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function RefundPolicy() {
  const sections = [
    {
      id: "instant-upi",
      title: "Instant UPI & Wallet Refunds",
      content:
        "For payments made via UPI (GPay, PhonePe, Paytm) or Grosliy Wallet, refunds for out-of-stock items or accepted returns are credited back instantly to 2 hours into your account.",
    },
    {
      id: "cards-netbanking",
      title: "Credit/Debit Cards & Net Banking",
      content:
        "Refunds for debit and credit card transactions are initiated immediately from our payment gateway and typically reflect in your bank account within 3–5 business days as per banking settlement cycles.",
    },
    {
      id: "cancellation",
      title: "Order Cancellation Refunds",
      content:
        "If you cancel an order before it has been dispatched from our dark store, 100% of your payment is refunded immediately without any cancellation fee or deduction.",
    },
    {
      id: "missing-damaged",
      title: "Damaged or Missing Item Adjustments",
      content:
        "If an item is found missing or damaged in your delivery bag, our customer support team provides an instant credit or immediate free replacement delivery.",
    },
    {
      id: "contact",
      title: "Refund Queries & Assistance",
      content:
        "Need help with a refund status? Reach out to support@grosliy.com with your Order ID, and our financial support team will assist you within 24 hours.",
    },
  ];

  return (
    <div className="bg-[#fbfcfb] min-h-screen text-gray-800 pb-16">
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
            <span className="text-emerald-700 font-bold">Refund Policy</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Fast Automated Refunds</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Refund & Cancellation Policy
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Transparent, zero-hassle refunds for your groceries. We believe in fast resolutions so you can shop with 100% confidence.
          </p>
        </div>
      </div>

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
