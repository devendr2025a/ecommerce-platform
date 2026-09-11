import React, { useEffect, useState } from "react";
import FarmFreshHero from "../components/common/FarmFreshHero";
import PastelCategoryGrid from "../components/common/PastelCategoryGrid";
import PromoSplitSection from "../components/common/PromoSplitSection";
import BestSellingSection from "../components/common/BestSellingSection";
import ShopByBrands from "../components/common/ShopByBrands";
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

        {/* ── 5. Shop by Brands Section ── */}
        <div className="pt-2 pb-4">
          <ShopByBrands brandsSection={homeData?.brandsSection} />
        </div>
      </div>
    </div>
  );
}

