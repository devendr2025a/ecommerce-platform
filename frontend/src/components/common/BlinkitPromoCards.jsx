import React from "react";
import { Link } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/imageUrl";

const DEFAULT_PROMO_CARDS = [
  {
    id: "pharmacy",
    name: "Pharmacy at your doorstep!",
    image: "/images/blinkit/promo_card_pharmacy_ultra_hd.png",
    link: "/products?category=pharma-wellness",
    alt: "Pharmacy at your doorstep! Health & Wellness - Cough syrups, pain relief sprays & more - Order Now",
  },
  {
    id: "pet-care",
    name: "Pet care supplies at your door",
    image: "/images/blinkit/promo_card_pet_ultra_hd.png",
    link: "/products?category=pet-care",
    alt: "Pet care supplies at your door - Pet Care - Food, treats, toys & more - Order Now",
  },
  {
    id: "baby-care",
    name: "No time for a diaper run?",
    image: "/images/blinkit/promo_card_baby_ultra_hd.png",
    link: "/products?category=baby-care",
    alt: "No time for a diaper run? Baby Care - Get baby care essentials - Order Now",
  },
];

export default function BlinkitPromoCards({ cards }) {
  const promoList =
    Array.isArray(cards) && cards.length > 0 ? cards : DEFAULT_PROMO_CARDS;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-3.5 items-stretch">
        {promoList.map((card) => {
          const imgSrc = getBackendImageUrl(card.image);
          const linkTo = card.link || `/products?category=${card.id}`;
          const altText =
            card.alt ||
            card.name ||
            "Special promotion offer - Order now on Blinkit Lucknow";

          return (
            <Link
              key={card.id || card.name}
              to={linkTo}
              className="block w-full rounded-lg sm:rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
              aria-label={altText}
            >
              <img
                src={imgSrc}
                alt={altText}
                className="w-full h-auto block rounded-lg sm:rounded-xl transform group-hover:scale-[1.015] transition-transform duration-300 select-none"
                loading="eager"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

