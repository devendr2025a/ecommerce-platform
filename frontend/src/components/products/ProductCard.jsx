import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const imageUrl = product.images?.[0]?.url
    ? product.images[0].url.startsWith('http')
      ? product.images[0].url
      : `${API_URL}${product.images[0].url}`
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    addToCart(product._id);
  };

  return (
    <Link to={`/products/${product._id}`} className="card-hover overflow-hidden flex flex-col group bg-black border-gray-900 border-opacity-50">
      <div className="relative overflow-hidden aspect-square bg-gray-950">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-800">
            <ShoppingCart className="h-10 w-10 stroke-[1.5]" />
          </div>
        )}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-black px-2 py-1 uppercase tracking-tighter">
            SALE -{product.discount}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white px-3 py-1.5">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-gray-300 transition-colors">
            {product.name}
            </h3>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-900/50">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-white tracking-tight">₹{discountedPrice.toLocaleString('en-IN')}</span>
            {product.discount > 0 && (
              <span className="text-[11px] text-gray-700 line-through">₹{product.price.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="text-white hover:opacity-70 transition-opacity p-1 disabled:opacity-30"
          >
            <ShoppingCart className="h-4 w-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </Link>
  );
}
