import React from "react";
import { Link } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/imageUrl";

const DEFAULT_ROW_1 = [
  {
    id: "paan-corner",
    name: "Paan Corner",
    image: "/images/blinkit/new_cat_paan_corner.png",
    link: "/products?search=Paan",
  },
  {
    id: "dairy-bread-eggs",
    name: "Dairy, Bread & Eggs",
    image: "/images/blinkit/new_cat_dairy_bread_eggs.png",
    link: "/products?category=dairy-breakfast",
  },
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image: "/images/blinkit/new_cat_fruits_vegetables.png",
    link: "/products?category=fruits-vegetables",
  },
  {
    id: "cold-drinks-juices",
    name: "Cold Drinks & Juices",
    image: "/images/blinkit/new_cat_cold_drinks_juices.png",
    link: "/products?category=beverages",
  },
  {
    id: "snacks-munchies",
    name: "Snacks & Munchies",
    image: "/images/blinkit/new_cat_snacks_munchies.png",
    link: "/products?category=snacks-branded-foods",
  },
  {
    id: "breakfast-instant",
    name: "Breakfast & Instant Food",
    image: "/images/blinkit/new_cat_breakfast_instant.png",
    link: "/products?search=Instant",
  },
  {
    id: "sweet-tooth",
    name: "Sweet Tooth",
    image: "/images/blinkit/new_cat_sweet_tooth.png",
    link: "/products?category=bakery-cakes",
  },
];

const DEFAULT_ROW_2 = [
  {
    id: "bakery-biscuits",
    name: "Bakery & Biscuits",
    image: "/images/blinkit/new_cat_bakery_biscuits.png",
    link: "/products?search=Bakery",
  },
  {
    id: "tea-coffee",
    name: "Tea, Coffee & Milk Drinks",
    image: "/images/blinkit/new_cat_tea_coffee.png",
    link: "/products?search=Tea",
  },
  {
    id: "atta-rice-dal",
    name: "Atta, Rice & Dal",
    image: "/images/blinkit/new_cat_atta_rice_dal.png",
    link: "/products?search=Atta",
  },
  {
    id: "masala-oil",
    name: "Masala, Oil & More",
    image: "/images/blinkit/new_cat_masala_oil.png",
    link: "/products?search=Masala",
  },
  {
    id: "sauces-spreads",
    name: "Sauces & Spreads",
    image: "/images/blinkit/new_cat_sauces_spreads.png",
    link: "/products?search=Sauce",
  },
  {
    id: "chicken-meat-fish",
    name: "Chicken, Meat & Fish",
    image: "/images/blinkit/new_cat_chicken_meat_fish.png",
    link: "/products?category=meat-seafood",
  },
  {
    id: "organic-healthy",
    name: "Organic & Healthy Living",
    image: "/images/blinkit/new_cat_organic_healthy.png",
    link: "/products?search=Organic",
  },
];

const DEFAULT_ROW_3 = [
  {
    id: "baby-care",
    name: "Baby Care",
    image: "/images/blinkit/new_cat_baby_care.png",
    link: "/products?category=baby-care",
  },
  {
    id: "pharma-wellness",
    name: "Pharma & Wellness",
    image: "/images/blinkit/new_cat_pharma_wellness.png",
    link: "/products?category=pharma-wellness",
  },
  {
    id: "cleaning-essentials",
    name: "Cleaning Essentials",
    image: "/images/blinkit/new_cat_cleaning_essentials.png",
    link: "/products?category=household-essentials",
  },
  {
    id: "home-office",
    name: "Home & Office",
    image: "/images/blinkit/new_cat_home_office.png",
    link: "/products?search=Office",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "/images/blinkit/new_cat_personal_care.png",
    link: "/products?category=personal-care",
  },
  {
    id: "pet-care",
    name: "Pet Care",
    image: "/images/blinkit/new_cat_pet_care.png",
    link: "/products?category=pet-care",
  },
];

export default function BlinkitCategoryGrid({ categories, banner }) {
  const bannerImg = getBackendImageUrl(
    banner?.image || "/images/blinkit/cat_header_banner.png"
  );
  const bannerAlt =
    banner?.alt ||
    "Shop by Category - Freshness for a Better You - Everything you need, in one place";

  const row1 =
    Array.isArray(categories?.row1) && categories.row1.length > 0
      ? categories.row1
      : DEFAULT_ROW_1;

  const row2 =
    Array.isArray(categories?.row2) && categories.row2.length > 0
      ? categories.row2
      : DEFAULT_ROW_2;

  const row3 =
    Array.isArray(categories?.row3) && categories.row3.length > 0
      ? categories.row3
      : DEFAULT_ROW_3;

  return (
    <section className="w-full py-1 space-y-2.5 sm:space-y-3">
      {/* ── 1. Top Category Header Banner ── */}
      <div className="w-full overflow-hidden select-none">
        <img
          src={bannerImg}
          alt={bannerAlt}
          className="w-full h-auto block rounded-lg select-none"
          loading="eager"
        />
      </div>

      {/* ── 2. Category Cards: Row 1 (7 Categories) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-2.5 items-stretch">
        {row1.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            className="group block w-full transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-[0.99]"
            title={cat.name}
            aria-label={cat.name}
          >
            <img
              src={getBackendImageUrl(cat.image)}
              alt={cat.name}
              className="w-full h-auto block select-none group-hover:brightness-[0.98] transition-all duration-200"
              loading="lazy"
            />
          </Link>
        ))}
      </div>

      {/* ── 3. Category Cards: Row 2 (7 Categories) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-2.5 items-stretch">
        {row2.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            className="group block w-full transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-[0.99]"
            title={cat.name}
            aria-label={cat.name}
          >
            <img
              src={getBackendImageUrl(cat.image)}
              alt={cat.name}
              className="w-full h-auto block select-none group-hover:brightness-[0.98] transition-all duration-200"
              loading="lazy"
            />
          </Link>
        ))}
      </div>

      {/* ── 4. Category Cards: Row 3 (6 Categories) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5 items-stretch">
        {row3.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            className="group block w-full transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-[0.99]"
            title={cat.name}
            aria-label={cat.name}
          >
            <img
              src={getBackendImageUrl(cat.image)}
              alt={cat.name}
              className="w-full h-auto block select-none group-hover:brightness-[0.98] transition-all duration-200"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

