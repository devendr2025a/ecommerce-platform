import React from "react";
import { Link } from "react-router-dom";
import {
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  PackageX,
} from "lucide-react";

export default function ReturnPolicy() {
  const sections = [
    {
      id: "freshness",
      title: "Freshness & Quality Guarantee",
      content:
        "At Grosliy, we hand-pick fruits, vegetables, dairy, and bakery items daily. If any perishable item delivered is damaged, stale, or not up to quality standards, you can report it within 24 hours of delivery for an instant replacement or refund.",
    },
    {
      id: "packaged",
      title: "Packaged & Non-Perishable Goods",
      content:
        "Packaged grocery items (atta, rice, oil, biscuits, snacks, household cleaners) can be returned within 48 hours of delivery if the packaging is damaged, expired, or the wrong item was dispatched.",
    },
    {
      id: "process",
      title: "Easy 1-Click Return / Refund Request",
      content:
        "Go to 'My Orders' in your Grosliy account, select the item, and tap 'Report an Issue'. Upload a quick photo of the defective item. Our automated system approves eligible grocery claims instantly without requiring physical item pickup.",
    },
    {
      id: "non-returnable",
      title: "Items Exempt from Returns",
      content:
        "Opened or partially consumed items, personal hygiene products, and infant food (unless delivered expired or damaged) cannot be returned due to safety and health regulations.",
    },
    {
      id: "contact",
      title: "Customer Support Assistance",
      content:
        "For immediate assistance, reach our 24x7 support desk at support@grosliy.com or via WhatsApp support on the app.",
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
            <span className="text-emerald-700 font-bold">Return & Replacement Policy</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <RotateCcw className="w-4 h-4 text-emerald-600" />
            <span>Grosliy Freshness Guarantee</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Return & Replacement Policy
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            We stand behind every item we deliver. If you're not 100% satisfied with your fresh groceries or staples, we make returns and replacements effortless.
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
