import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Use finalPrice safely, fallback to price if undefined
  const finalPrice =
    product.finalPrice !== undefined && product.finalPrice !== null
      ? product.finalPrice
      : product.price;

  const imageUrl = product.images?.[0]?.url
    ? product.images[0].url.startsWith("http")
      ? product.images[0].url
      : `${API_URL}${product.images[0].url}`
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product._id);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="card-hover group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[var(--vg-gray)] flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-95 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingCart className="h-10 w-10 stroke-[1]" />
          </div>
        )}

        {/* Badges */}
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 badge badge-red text-[9px]">
            SALE –{product.discount}%
          </span>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="badge badge-black px-3 py-1.5 text-[10px]">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="absolute bottom-0 left-0 right-0 bg-[var(--vg-black)] text-white text-[10px]
               font-bold uppercase tracking-[0.25em] py-2.5 opacity-0 group-hover:opacity-100
               transition-opacity duration-200 disabled:hidden"
        >
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1 px-0">
        <p className="text-[10px] text-[var(--vg-muted)] uppercase tracking-[0.2em] mb-1">
          {product.category}
        </p>
        <h3 className="text-[12px] font-bold text-[var(--vg-black)] uppercase tracking-[0.12em] leading-snug line-clamp-2 group-hover:text-[var(--vg-red)] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          {/* Show original price only if discount exists */}
          {product.discount > 0 && product.price && (
            <span className="text-[11px] text-[var(--vg-muted)] line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}

          <span className="text-[13px] font-bold text-[var(--vg-black)]">
            ₹{finalPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </Link>
  );
}
