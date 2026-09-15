import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

export default function Disclaimer() {
  const sections = [
    {
      id: "general",
      title: "General Information & Catalog Accuracy",
      content:
        "All grocery information, including nutritional values, ingredient lists, and product descriptions on Grosliy are provided based on details supplied by brand manufacturers. While we verify information regularly, manufacturers may alter ingredient or packaging details without prior notice.",
    },
    {
      id: "allergies",
      title: "Allergies & Dietary Requirements",
      content:
        "Customers with specific food allergies, lactose intolerance, or dietary restrictions are strongly advised to inspect the physical product packaging and ingredient labels before consumption.",
    },
    {
      id: "fresh-produce",
      title: "Natural Produce Variations",
      content:
        "Fresh farm fruits and vegetables are natural products and may vary slightly in appearance, shape, and seasonal sweetness from the representative product imagery shown on the website.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content:
        "Grosliy Technologies shall not be held liable for any indirect or consequential damages resulting from product misuse, improper cold storage by the consumer, or unforeseen third-party distributor constraints.",
    },
    {
      id: "contact",
      title: "Queries & Support",
      content:
        "For any disclaimer or product inquiry, please contact our support team at support@grosliy.com | Hazratganj, Lucknow - 226001.",
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
            <span className="text-emerald-700 font-bold">Disclaimer</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <span>Grosliy Legal Disclaimer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Legal Disclaimer
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Important notices regarding product representations, dietary allergen considerations, and manufacturer packaging guidelines on Grosliy.
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
