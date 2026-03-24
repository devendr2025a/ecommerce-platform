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
    <Link to={`/products/${product._id}`} className="card group hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 badge bg-red-100 text-red-700 font-semibold">
            -{product.discount}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-blue-600 font-medium mb-1">{product.category}</span>
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors flex-1">
          {product.name}
        </h3>
        {product.numReviews > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{product.rating?.toFixed(1)} ({product.numReviews})</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-gray-900">₹{discountedPrice.toLocaleString('en-IN')}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">₹{product.price.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
