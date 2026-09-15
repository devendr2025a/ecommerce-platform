import React from "react";
import QuickCommerceProductRow from "./QuickCommerceProductRow";

// 8 authentic Best Selling products with crystal-clear 1000x1000 HD packshots
const DEFAULT_BEST_SELLING = [
  {
    id: "deal-tata-salt-1kg",
    name: "Tata Salt Vacuum Evaporated Iodised Salt",
    unit: "1 pack (1 kg)",
    price: 30,
    finalPrice: 28,
    discount: 7,
    discountLabel: "₹2 OFF",
    rating: 4.9,
    ratingCount: "83.2k",
    image: "/images/qc/tata_salt_hd.png",
  },
  {
    id: "deal-amul-butter-500g",
    name: "Amul Pasteurised Salted Cream Butter",
    unit: "1 pack (500 g)",
    price: 295,
    finalPrice: 275,
    discount: 7,
    discountLabel: "₹20 OFF",
    rating: 4.9,
    ratingCount: "54.2k",
    image: "/images/qc/amul_butter_hd.png",
  },
  {
    id: "deal-maggi-2min-noodles-420g",
    name: "Maggi 2-Minute Instant Noodles Masala",
    unit: "1 pack (420 g)",
    price: 95,
    finalPrice: 78,
    discount: 18,
    discountLabel: "₹17 OFF",
    rating: 4.9,
    ratingCount: "89.4k",
    image: "/images/qc/instant_1.png",
  },
  {
    id: "deal-lays-magic-masala-90g",
    name: "Lay's India's Magic Masala Potato Chips",
    unit: "1 pack (90 g)",
    price: 50,
    finalPrice: 38,
    discount: 24,
    discountLabel: "₹12 OFF",
    rating: 4.9,
    ratingCount: "42.8k",
    image: "/images/blinkit/deal_lays_chips.png",
  },
  {
    id: "deal-coca-cola-can-300ml",
    name: "Coca-Cola Original Taste Cold Drink Can",
    unit: "1 can (300 ml)",
    price: 45,
    finalPrice: 40,
    discount: 11,
    discountLabel: "₹5 OFF",
    rating: 4.9,
    ratingCount: "52.3k",
    image: "/images/blinkit/deal_coca_cola.png",
  },
  {
    id: "deal-nestle-kitkat-38g",
    name: "Nestle KitKat 4 Finger Crispy Wafer Bar",
    unit: "1 pack (38.5 g)",
    price: 35,
    finalPrice: 30,
    discount: 14,
    discountLabel: "₹5 OFF",
    rating: 4.9,
    ratingCount: "54.1k",
    image: "/images/blinkit/deal_nestle_kitkat.png",
  },
  {
    id: "deal-daawat-basmati-rice-1kg",
    name: "Daawat Quick Cooking Brown Basmati Rice",
    unit: "1 jar (1 kg)",
    price: 210,
    finalPrice: 165,
    discount: 21,
    discountLabel: "₹45 OFF",
    rating: 4.9,
    ratingCount: "9.5k",
    image: "/images/qc/daawat_basmati_hd.png",
  },
  {
    id: "deal-rin-matic-liquid-2kg",
    name: "Rin Matic Top Load Detergent Liquid | Pouch",
    unit: "1 pack (2 kg)",
    price: 260,
    finalPrice: 215,
    discount: 17,
    discountLabel: "₹45 OFF",
    rating: 4.8,
    ratingCount: "40.2k",
    image: "/images/qc/laundry_1.png",
  },
];

export default function BestSellingSection({ products }) {
  // Normalize items if passed from backend, otherwise use default authentic quick-commerce best sellers
  const normalizedProducts =
    products && products.length > 0
      ? products.map((p, idx) => ({
          id: p._id || p.id || `best-${idx}`,
          name: p.name,
          unit: p.unit || p.weight || "1 pack",
          price: p.price || 50,
          finalPrice: p.finalPrice || p.price || 40,
          discount: p.discount || (p.discountLabel ? null : 15),
          discountLabel: p.discountLabel || (p.discount ? `${p.discount}% OFF` : null),
          rating: p.rating || 4.8,
          ratingCount: p.ratingCount || "1k+",
          image: p.image || "/images/qc/tata_salt_hd.png",
        }))
      : DEFAULT_BEST_SELLING;

  const sectionData = {
    id: "best-selling",
    title: "Best Selling",
    seeAllLink: "/products?filter=best-sellers",
    products: normalizedProducts,
  };

  return <QuickCommerceProductRow section={sectionData} />;
}
