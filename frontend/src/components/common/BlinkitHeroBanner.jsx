import React from "react";
import { Link } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/imageUrl";

export default function BlinkitHeroBanner({ banner }) {
  const rawImage = banner?.image || "/images/blinkit/hero_banner_ultra_hd.png";
  const imageSrc = getBackendImageUrl(rawImage);
  const linkTo = banner?.link || "/products";
  const altText =
    banner?.alt ||
    "Stock up on daily essentials - 100% Fresh & Natural - Fresh Produce, Best Quality, Fast Delivery, Healthy Living - Shop Now";

  return (
    <section className="w-full">
      <Link
        to={linkTo}
        className="block w-full rounded-lg md:rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
        aria-label={altText}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-auto block rounded-lg md:rounded-xl transform group-hover:scale-[1.008] transition-transform duration-300 select-none"
          loading="eager"
        />
      </Link>
    </section>
  );
}

