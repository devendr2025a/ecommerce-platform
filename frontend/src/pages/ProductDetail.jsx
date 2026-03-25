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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-white mb-12 text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
        <ArrowLeft className="h-3 w-3" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-6">
          <div className="bg-[#020202] border border-gray-900 aspect-square overflow-hidden">
            {product.images?.length > 0 ? (
              <img src={getImageUrl(product.images[selectedImage]?.url)} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-800">
                <Package className="h-20 w-20 stroke-[1]" />
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-20 border transition-all ${selectedImage === i ? 'border-white' : 'border-gray-900 hover:border-gray-700'}`}>
                  <img src={getImageUrl(img.url)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">{product.category}</span>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-tight">{product.name}</h1>
            
            {product.numReviews > 0 && (
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating) ? 'fill-white text-white' : 'text-gray-800'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{product.rating?.toFixed(1)} / {product.numReviews} Reviews</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-4 py-8 border-y border-gray-900">
            <span className="text-4xl font-black text-white tracking-tighter">₹{discountedPrice.toLocaleString('en-IN')}</span>
            {product.discount > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-lg text-gray-600 line-through tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-[10px] font-black bg-white text-black px-2 py-0.5 uppercase tracking-tighter">-{product.discount}%</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Description</h3>
            <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-wide font-medium">
                {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-white' : 'bg-red-900'}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-gray-400' : 'text-red-900'}`}>
                {product.stock > 0 ? `${product.stock} units available` : 'Sold out'}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <div className="flex items-center border border-gray-900 bg-black w-full sm:w-auto">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-gray-900 transition-colors disabled:opacity-20">
                  <Minus className="h-4 w-4 text-white" />
                </button>
                <span className="px-6 py-2 text-sm font-black text-white min-w-[4rem] text-center tracking-tighter">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-4 hover:bg-gray-900 transition-colors disabled:opacity-20">
                  <Plus className="h-4 w-4 text-white" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary w-full py-4 text-xs tracking-[0.3em] flex-1">
                ADD TO BAG
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-32 border-t border-gray-900 pt-20">
        <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Client Testimonials</h2>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Verified purchasers share their experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Review list */}
          <div className="lg:col-span-7 space-y-6">
            {product.reviews?.length > 0 ? product.reviews.map((r) => (
              <div key={r._id} className="bg-[#020202] border border-gray-900 p-8 space-y-4 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`h-2.5 w-2.5 ${s <= r.rating ? 'fill-white text-white' : 'text-gray-800'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1">
                    <p className="text-[11px] font-black text-white uppercase tracking-widest">{r.name}</p>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed italic">"{r.comment}"</p>
                </div>
              </div>
            )) : (
                <div className="bg-[#050505] border border-dashed border-gray-900 p-12 text-center">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">No feedback available yet</p>
                </div>
            )}
          </div>

          {/* Write review */}
          {user && (
            <div className="lg:col-span-5 bg-[#050505] border border-gray-900 p-10 h-fit sticky top-28">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">Share Feedback</h3>
              <form onSubmit={handleSubmitReview} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Overall Satisfaction</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} type="button" onClick={() => setReview({ ...review, rating: s })}>
                        <Star className={`h-8 w-8 transition-all ${s <= review.rating ? 'fill-white text-white' : 'fill-none text-gray-800 hover:text-white'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Detailed Remarks</label>
                  <textarea required rows={4} placeholder="TYPE YOUR THOUGHTS..."
                    value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    className="input-field resize-none text-[10px] font-bold tracking-widest uppercase" />
                </div>
                <button type="submit" disabled={reviewLoading} className="btn-primary w-full py-4 tracking-[0.2em] text-[10px]">
                  {reviewLoading ? 'PROCESSESING...' : 'PUBLISH REVIEW'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
