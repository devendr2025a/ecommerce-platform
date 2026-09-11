import React from "react";
import { Link } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/imageUrl";

// 8 official brand cards matching user reference
const BRAND_CARDS = [
  {
    id: "amul",
    name: "Amul",
    image: "/images/blinkit/brand_card_amul.png",
    link: "/products?search=Amul",
  },
  {
    id: "mother-dairy",
    name: "Mother Dairy",
    image: "/images/blinkit/brand_card_mother_dairy.png",
    link: "/products?search=Mother%20Dairy",
  },
  {
    id: "nandini",
    name: "Nandini",
    image: "/images/blinkit/brand_card_nandini.png",
    link: "/products?search=Nandini",
  },
  {
    id: "tata",
    name: "TATA",
    image: "/images/blinkit/brand_card_tata.png",
    link: "/products?search=Tata",
  },
  {
    id: "maggi",
    name: "Maggi",
    image: "/images/blinkit/brand_card_maggi.png",
    link: "/products?search=Maggi",
  },
  {
    id: "lays",
    name: "Lay's",
    image: "/images/blinkit/brand_card_lays.png",
    link: "/products?search=Lay%27s",
  },
  {
    id: "britannia",
    name: "Britannia",
    image: "/images/blinkit/brand_card_britannia.png",
    link: "/products?search=Britannia",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    image: "/images/blinkit/brand_card_coca_cola.png",
    link: "/products?search=Coca-Cola",
  },
];

export default function ShopByBrands({ brandsSection }) {
  const bannerImg = getBackendImageUrl(
    brandsSection?.banner || "/images/blinkit/shop_by_brands_header.png"
  );
  const brandsList =
    Array.isArray(brandsSection?.brands) && brandsSection.brands.length > 0
      ? brandsSection.brands
      : BRAND_CARDS;

  return (
    <section className="py-2 sm:py-3">
      {/* Panoramic Shop by Brands Header Banner */}
      <Link
        to="/products"
        className="block w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-3.5 sm:mb-4 border border-[#c8eed9] shadow-[0_4px_20px_rgba(0,136,72,0.06)] hover:shadow-md transition-all group"
        title="View All Brands"
      >
        <img
          src={bannerImg}
          alt="Shop by Brands - Trusted Brands, Better Choices. Discover your favourite brands, all in one place."
          className="w-full h-auto object-cover select-none group-hover:scale-[1.004] transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* 8 Brand Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 lg:gap-3.5">
        {brandsList.map((brand) => (
          <Link
            key={brand.id}
            to={brand.link}
            className="group relative block w-full rounded-2xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 cursor-pointer"
            title={`Shop ${brand.name} Products`}
            aria-label={`Shop ${brand.name}`}
          >
            <img
              src={getBackendImageUrl(brand.image)}
              alt={brand.name}
              className="w-full h-auto object-contain block select-none group-hover:scale-[1.025] transition-transform duration-300"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

