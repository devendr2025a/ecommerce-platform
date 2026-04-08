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

  const discountedPrice = product.finalPrice ?? product.price;


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
    <div className="bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--vg-muted)] hover:text-[var(--vg-red)] mb-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Images ── */}
          <div className="space-y-4">
            <div className="bg-[var(--vg-gray)] aspect-square overflow-hidden">
              {product.images?.length > 0 ? (
                <img
                  src={getImageUrl(product.images[selectedImage]?.url)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Package className="h-20 w-20 stroke-[1]" />
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 border-2 transition-all ${
                      selectedImage === i
                        ? 'border-[var(--vg-black)]'
                        : 'border-transparent hover:border-[var(--vg-border)]'
                    }`}
                  >
                    <img src={getImageUrl(img.url)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="space-y-8">

            {/* Category + Name */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.4em]">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.05em] leading-tight">
                {product.name}
              </h1>

              {/* Rating + Social proof */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {product.numReviews > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating) ? 'fill-[var(--vg-black)] text-[var(--vg-black)]' : 'fill-none text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-widest">
                      {product.rating?.toFixed(1)} ({product.numReviews} reviews)
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-[var(--vg-muted)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">12 viewing now</span>
                </div>
              </div>
              <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest">
                🔥 24 units sold in the last 48 hours
              </p>
            </div>

            {/* Price + Countdown */}
            <div className="py-6 border-t border-b border-[var(--vg-border)] space-y-5">
              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-black text-[var(--vg-black)] tracking-tight">
                  ₹{discountedPrice.toLocaleString('en-IN')}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-sm text-[var(--vg-muted)] line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="badge badge-red text-[10px] px-2 py-1">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
                <span className="ml-auto text-[10px] font-bold text-[var(--vg-muted)] uppercase tracking-widest">
                  Secure Checkout ✓
                </span>
              </div>

              {/* Countdown Timer */}
              <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-[var(--vg-black)] uppercase tracking-widest">Limited Time Offer</p>
                  <p className="text-[10px] text-[var(--vg-muted)] font-bold uppercase tracking-widest mt-0.5">Sale expires soon. Act now.</p>
                </div>
                <div className="flex gap-3">
                  {['02', '14', '55'].map((v, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="text-base font-black text-[var(--vg-black)]">{v}</span>
                      <span className="text-[8px] text-[var(--vg-muted)] font-bold uppercase tracking-wider">{['HRS','MIN','SEC'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-4 space-y-1">
                <span className="text-[9px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Fabric</span>
                <p className="text-[11px] font-bold text-[var(--vg-black)] uppercase tracking-wide leading-snug">
                  {product.material || '100% Organic Cotton (240 GSM)'}
                </p>
              </div>
              <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-4 space-y-1">
                <span className="text-[9px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Fit</span>
                <p className="text-[11px] font-bold text-[var(--vg-black)] uppercase tracking-wide leading-snug">
                  {product.fit || 'Tailored Slim Fit | Relaxed Drape'}
                </p>
              </div>
            </div>

            {/* Model Reference */}
            <div className="flex items-center gap-4 bg-[var(--vg-gray)] border-l-4 border-[var(--vg-black)] p-4">
              <div>
                <p className="text-[9px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-0.5">Model Reference</p>
                <p className="text-[11px] font-bold text-[var(--vg-black)] uppercase tracking-wide">
                  Height 5'8" (173cm) · Wearing Size S
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">Description</h3>
              <p className="text-[var(--vg-muted)] text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Accordion */}
            <div className="border-t border-[var(--vg-border)]">
              {[
                { title: 'Fabric & Care', content: 'Gentle machine wash cold. Do not bleach. Tumble dry low. Cool iron if needed. 95% Organic Cotton, 5% Elastane.' },
                { title: 'Size Guide', content: 'Sizes follow international standards. For a relaxed fit, size up. Model is 6\'1" (185cm) wearing size Large.' },
                { title: 'Shipping & Returns', content: 'Dispatched within 24–48 hours. 7-day return policy. Quality assured on every shipment.' },
              ].map((item, idx) => (
                <details key={idx} className="group border-b border-[var(--vg-border)]">
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none">
                    <span className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.2em]">{item.title}</span>
                    <Plus className="h-3.5 w-3.5 text-[var(--vg-muted)] group-open:rotate-45 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="pb-5">
                    <p className="text-[12px] text-[var(--vg-muted)] leading-relaxed">{item.content}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* Stock + Add to Cart */}
            <div className="space-y-4">
              {/* Stock indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? (product.stock < 10 ? 'bg-orange-500 animate-pulse' : 'bg-green-500') : 'bg-red-500'}`} />
                <span className={`text-[11px] font-bold uppercase tracking-widest ${product.stock > 0 ? (product.stock < 10 ? 'text-orange-500' : 'text-[var(--vg-muted)]') : 'text-red-500'}`}>
                  {product.stock > 0
                    ? (product.stock < 10 ? `Only ${product.stock} left — hurry!` : `${product.stock} units available`)
                    : 'Currently Out of Stock'}
                </span>
              </div>

              {product.stock > 0 && (
                <div className="space-y-3">
                  {/* Desktop quantity + add to cart */}
                  <div className="hidden lg:flex items-stretch gap-3">
                    {/* Quantity */}
                    <div className="flex items-center border border-[var(--vg-border)]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 text-[var(--vg-black)] hover:bg-[var(--vg-gray)] transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-5 text-sm font-black text-[var(--vg-black)] min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-4 py-3 text-[var(--vg-black)] hover:bg-[var(--vg-gray)] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    {/* Add to bag */}
                    <button onClick={handleAddToCart} className="btn-primary flex-1 py-4 text-[12px]">
                      Add to Bag · ₹{discountedPrice.toLocaleString('en-IN')}
                    </button>
                  </div>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/917388330600?text=I'm interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-[var(--vg-border)] py-3.5 text-[11px] font-bold text-[var(--vg-muted)] hover:text-[var(--vg-red)] hover:border-[var(--vg-red)] transition-all uppercase tracking-[0.2em] w-full"
                  >
                    Inquire on WhatsApp
                  </a>

                  {/* Mobile sticky CTA */}
                  <div className="fixed bottom-0 left-0 right-0 z-[90] lg:hidden bg-white border-t border-[var(--vg-border)] px-4 py-3 flex items-center gap-3">
                    <div className="flex items-center border border-[var(--vg-border)]">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 hover:bg-[var(--vg-gray)] transition-colors">
                        <Minus className="h-3.5 w-3.5 text-[var(--vg-black)]" />
                      </button>
                      <span className="px-4 text-sm font-black text-[var(--vg-black)]">{quantity}</span>
                      <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2.5 hover:bg-[var(--vg-gray)] transition-colors">
                        <Plus className="h-3.5 w-3.5 text-[var(--vg-black)]" />
                      </button>
                    </div>
                    <button onClick={handleAddToCart} className="btn-primary flex-1 py-3 text-[11px]">
                      Add to Bag · ₹{discountedPrice.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="mt-24 pt-16 border-t border-[var(--vg-border)]">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">Customer Reviews</h2>
            <p className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.4em] mt-1">Verified purchasers share their experience</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Review list */}
            <div className="lg:col-span-7 space-y-4">
              {product.reviews?.length > 0 ? product.reviews.map((r) => (
                <div key={r._id} className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`h-3 w-3 ${s <= r.rating ? 'fill-[var(--vg-black)] text-[var(--vg-black)]' : 'fill-none text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-[var(--vg-muted)] uppercase tracking-widest">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-wider mb-1">{r.name}</p>
                    <p className="text-[var(--vg-muted)] text-sm leading-relaxed">"{r.comment}"</p>
                  </div>
                </div>
              )) : (
                <div className="bg-[var(--vg-gray)] border border-dashed border-[var(--vg-border)] p-14 text-center">
                  <p className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.4em]">
                    No reviews yet — be the first!
                  </p>
                </div>
              )}
            </div>

            {/* Write review */}
            {user && (
              <div className="lg:col-span-5 bg-[var(--vg-gray)] border border-[var(--vg-border)] p-8 h-fit sticky top-28">
                <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em] mb-6">Write a Review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Rating</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map((s) => (
                        <button key={s} type="button" onClick={() => setReview({ ...review, rating: s })}>
                          <Star className={`h-7 w-7 transition-all ${s <= review.rating ? 'fill-[var(--vg-black)] text-[var(--vg-black)]' : 'fill-none text-gray-300 hover:text-[var(--vg-black)]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Your Review</label>
                    <textarea
                      required rows={4}
                      placeholder="Share your experience..."
                      value={review.comment}
                      onChange={(e) => setReview({ ...review, comment: e.target.value })}
                      className="input-field resize-none text-sm"
                    />
                  </div>
                  <button type="submit" disabled={reviewLoading} className="btn-primary w-full py-3.5">
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
