import React, { useEffect, useState } from "react";
import FarmFreshHero from "../components/common/FarmFreshHero";
import PastelCategoryGrid from "../components/common/PastelCategoryGrid";
import PromoSplitSection from "../components/common/PromoSplitSection";
import BestSellingSection from "../components/common/BestSellingSection";
import QuickCommerceProductRow from "../components/common/QuickCommerceProductRow";
import DepartmentExploreGrid from "../components/common/DepartmentExploreGrid";
import { QUICK_COMMERCE_SECTIONS } from "../data/categoryCatalogData";
import { productAPI } from "../services/api";

export default function Home() {
  const [homeData, setHomeData] = useState({
    bestDeals: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch homepage products from backend API
    productAPI
      .getGroceryHomepage()
      .then(({ data }) => {
        if (data?.data) {
          setHomeData(data.data);
        }
      })
      .catch((err) => {
        console.warn("Backend grocery homepage info:", err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen relative pb-6">
      {/* ── 1. Farm Fresh Hero Banner: Full Width (Covers all side space) ── */}
      <FarmFreshHero />

      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-8 space-y-2 sm:space-y-4 mt-2 sm:mt-4">
        {/* ── 2. 9 Pastel Rounded Category Strip ── */}
        <PastelCategoryGrid />

        {/* ── 3. Split Promotional & Guarantee Section ── */}
        <PromoSplitSection />

        {/* ── 4. Best Selling Products Section ── */}
        <BestSellingSection products={homeData?.bestDeals?.products} />

        {/* ── 5. Category-wise Quick Commerce Product Sections ── */}
        <div className="space-y-4 sm:space-y-6 pt-2">
          {QUICK_COMMERCE_SECTIONS.map((section) => (
            <QuickCommerceProductRow key={section.id} section={section} />
          ))}
        </div>

        {/* ── 6. Department-wise Category Exploration Grid ── */}
        <DepartmentExploreGrid />
      </div>
    </div>
  );
}

