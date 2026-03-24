import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Package } from 'lucide-react';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    productAPI.getOne(id)
      .then(({ data }) => setProduct(data.product))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return null;

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const getImageUrl = (url) => url?.startsWith('http') ? url : `${API_URL}${url}`;

  const handleAddToCart = () => {
    if (!user) { navigate('/login'); return; }
    addToCart(product._id, quantity);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setReviewLoading(true);
    try {
      await productAPI.addReview(id, review);
      toast.success('Review submitted!');
      const { data } = await productAPI.getOne(id);
      setProduct(data.product);
      setReview({ rating: 5, comment: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-3">
          <div className="card overflow-hidden aspect-square bg-gray-100">
            {product.images?.length > 0 ? (
              <img src={getImageUrl(product.images[selectedImage]?.url)} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <Package className="h-24 w-24" />
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-blue-600' : 'border-gray-200'}`}>
                  <img src={getImageUrl(img.url)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <span className="text-sm font-medium text-blue-600">{product.category}</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
            {product.numReviews > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{product.rating?.toFixed(1)} ({product.numReviews} reviews)</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">₹{discountedPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="badge bg-red-100 text-red-700 font-semibold">{product.discount}% OFF</span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className={`flex items-center gap-2 text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2 flex-1 justify-center py-2.5">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-14">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review list */}
          <div className="lg:col-span-2 space-y-4">
            {product.reviews?.length > 0 ? product.reviews.map((r) => (
              <div key={r._id} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-medium text-sm text-gray-800">{r.name}</span>
                  <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </div>
            )) : <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>}
          </div>

          {/* Write review */}
          {user && (
            <div className="card p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} type="button" onClick={() => setReview({ ...review, rating: s })}>
                        <Star className={`h-6 w-6 cursor-pointer transition-colors ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                  <textarea required rows={3} placeholder="Share your experience..."
                    value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    className="input-field resize-none text-sm" />
                </div>
                <button type="submit" disabled={reviewLoading} className="btn-primary w-full text-sm">
                  {reviewLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
