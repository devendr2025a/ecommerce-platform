import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Package,
  CheckCircle,
  Heart,
  X,
  Gift,
  Share2,
  Twitter,
  Facebook,
  Copy,
  Award,
  TrendingUp,
} from "lucide-react";
import { productAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

// Mock Data
const MOCK_PRODUCT = {
  _id: "demo123",
  name: "Premium Cotton Oversized T-Shirt",
  category: "MEN'S APPAREL",
  price: 2499,
  discount: 20,
  finalPrice: 1999,
  description: "Crafted from 100% organic cotton, this oversized tee offers breathable comfort with a relaxed silhouette.",
  material: "100% Organic Cotton (280 GSM)",
  fit: "Oversized Relaxed Fit",
  stock: 45,
  rating: 4.5,
  numReviews: 128,
  images: [
    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { url: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=500" },
  ],
  reviews: [
    {
      _id: "rev1",
      name: "Rahul Sharma",
      rating: 5,
      comment: "Amazing quality! The fabric is super soft.",
      createdAt: "2024-03-15T10:00:00Z"
    }
  ]
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [submittedReviewData, setSubmittedReviewData] = useState(null);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productAPI.getOne(id);
        setProduct(res.data.product || res.data);
      } catch (err) {
        console.log("API ERROR, using mock data", err);
        setProduct(MOCK_PRODUCT);
        toast.error("Using demo data", { duration: 2000 });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const discountedPrice = product.finalPrice ?? product.price;
  const getImageUrl = (url) => url?.startsWith("http") ? url : `${API_URL}${url}`;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    addToCart(product._id, quantity);
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!review.comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    setReviewLoading(true);
    try {
      await productAPI.addReview(id, review);
      setSubmittedReviewData({
        rating: review.rating,
        comment: review.comment,
        name: user.name || user.email?.split('@')[0] || "Valued Customer",
      });
      setShowThankYouModal(true);
      const { data } = await productAPI.getOne(id);
      setProduct(data.product);
      setReview({ rating: 5, comment: "" });
    } catch (err) {
      const newReview = {
        _id: "mock_" + Date.now(),
        name: user?.name || "Anonymous",
        rating: review.rating,
        comment: review.comment,
        createdAt: new Date().toISOString()
      };
      setProduct(prev => ({
        ...prev,
        reviews: [newReview, ...(prev.reviews || [])],
        numReviews: (prev.numReviews || 0) + 1,
      }));
      setSubmittedReviewData({
        rating: review.rating,
        comment: review.comment,
        name: user?.name || "Valued Customer",
      });
      setShowThankYouModal(true);
      setReview({ rating: 5, comment: "" });
      toast.success("Review submitted! (Demo)");
    } finally {
      setReviewLoading(false);
    }
  };

  // Enhanced Thank You Modal Component
  const ThankYouModal = () => {
    if (!showThankYouModal) return null;

    const couponCode = "THANKYOU20";
    const discountPercent = 20;

    const handleCopyCoupon = () => {
      navigator.clipboard.writeText(couponCode);
      setCopiedCoupon(true);
      toast.success("Coupon copied!");
      setTimeout(() => setCopiedCoupon(false), 2000);
    };

    const handleShare = (platform) => {
      const text = `I just reviewed ${product.name} on VogueGrid! Check it out!`;
      const url = window.location.href;
      if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
      }
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
        <div className="bg-white max-w-2xl w-full border border-[var(--vg-border)] shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
          
          {/* Decorative Header */}
          <div className="relative bg-gradient-to-r from-[var(--vg-black)] to-[#2c2c2c] p-6 text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-bounce">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
                THANK YOU!
              </h2>
              <p className="text-white/80 text-sm font-medium">
                Your voice makes us better
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowThankYouModal(false)}
            className="absolute right-4 top-4 text-white hover:text-white/80 transition-colors z-10 bg-black/20 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Review Preview */}
            <div className="mb-8 text-center">
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-5 w-5 ${s <= (submittedReviewData?.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic text-lg leading-relaxed">
                "{submittedReviewData?.comment}"
              </p>
              <p className="text-sm font-bold text-[var(--vg-black)] mt-3">
                — {submittedReviewData?.name}
              </p>
            </div>

            {/* Impact Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-800 text-sm mb-1">
                    Your review makes a difference!
                  </p>
                  <p className="text-xs text-green-700">
                    You've helped 1,247 other shoppers make informed decisions this month. 
                    Thank you for being part of our community! 🌟
                  </p>
                </div>
              </div>
            </div>

            {/* Special Offer Coupon */}
            <div className="border-2 border-dashed border-[var(--vg-border)] rounded-lg p-5 mb-6 bg-[var(--vg-gray)]">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="h-5 w-5 text-[var(--vg-red)]" />
                <span className="text-xs font-bold text-[var(--vg-black)] uppercase tracking-wider">
                  Exclusive Reward for You!
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Get <span className="font-bold text-[var(--vg-red)]">{discountPercent}% OFF</span> on your next purchase
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white border border-[var(--vg-border)] px-4 py-2 text-center font-mono font-bold text-lg tracking-wider">
                  {couponCode}
                </code>
                <button
                  onClick={handleCopyCoupon}
                  className="px-4 py-2 bg-[var(--vg-black)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--vg-red)] transition-colors flex items-center gap-2"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedCoupon ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">
                *Valid for 30 days. Minimum purchase ₹999.
              </p>
            </div>

            {/* Recommended Products */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[var(--vg-black)] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Heart className="h-3.5 w-3.5 fill-[var(--vg-red)] text-[var(--vg-red)]" />
                You might also like
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Slim Fit Jeans", price: 2999, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=150" },
                  { name: "Wool Blend Jacket", price: 5999, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 p-2 border border-[var(--vg-border)] rounded-lg">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="text-[10px] font-bold uppercase">{item.name}</p>
                      <p className="text-[10px] text-[var(--vg-muted)]">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Share */}
            <div className="border-t border-[var(--vg-border)] pt-5 mb-6">
              <p className="text-[10px] font-bold text-[var(--vg-muted)] uppercase tracking-wider text-center mb-3">
                Share your experience
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-black text-white rounded-full hover:bg-[#1DA1F2] transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-black text-white rounded-full hover:bg-[#1877F2] transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-black text-white rounded-full hover:bg-[var(--vg-red)] transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowThankYouModal(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 py-3 bg-[var(--vg-gray)] border border-[var(--vg-border)] text-[var(--vg-black)] text-[11px] font-bold uppercase tracking-wider hover:bg-[var(--vg-border)] transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setShowThankYouModal(false);
                 navigate(`/products/${product._id}`);
                }}
                className="flex-1 btn-primary py-3 text-[11px]"
              >
                Browse More
              </button>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="border-t border-[var(--vg-border)] p-3 bg-gradient-to-r from-yellow-50 to-orange-50">
            <p className="text-[9px] text-center text-gray-500 uppercase tracking-wider flex items-center justify-center gap-2">
              <span>✨</span> Verified Reviewer <span>•</span> 50 Loyalty Points Earned <span>•</span> 🌟 Top Contributor Badge Unlocked
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <ThankYouModal />
      
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--vg-muted)] hover:text-[var(--vg-red)] mb-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Section */}
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
            {product?.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 border-2 transition-all ${
                      selectedImage === i
                        ? "border-[var(--vg-black)]"
                        : "border-transparent hover:border-[var(--vg-border)]"
                    }`}
                  >
                    <img src={getImageUrl(img.url)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.4em]">
                {product?.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.05em] leading-tight">
                {product?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {product.numReviews > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3 w-3 ${s <= Math.round(product.rating) ? "fill-[var(--vg-black)] text-[var(--vg-black)]" : "fill-none text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-widest">
                      {product.rating?.toFixed(1)} ({product.numReviews} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="py-6 border-t border-b border-[var(--vg-border)]">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-black text-[var(--vg-black)] tracking-tight">
                  ₹{discountedPrice.toLocaleString("en-IN")}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-sm text-[var(--vg-muted)] line-through">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="bg-red-100 text-red-700 text-[10px] px-2 py-1 font-bold">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">
                Description
              </h3>
              <p className="text-[var(--vg-muted)] text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--vg-muted)]">
                  {product.stock > 0 ? `${product.stock} units available` : "Out of Stock"}
                </span>
              </div>
              {product.stock > 0 && (
                <div className="flex items-stretch gap-3">
                  <div className="flex items-center border border-[var(--vg-border)]">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-[var(--vg-gray)]">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-5 text-sm font-black min-w-[3rem] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-3 hover:bg-[var(--vg-gray)]">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button onClick={handleAddToCart} className="btn-primary flex-1 py-4 text-[12px]">
                    Add to Bag · ₹{discountedPrice.toLocaleString("en-IN")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-16 border-t border-[var(--vg-border)]">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">
              Customer Reviews
            </h2>
            <p className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.4em] mt-1">
              Verified purchasers share their experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Review List */}
            <div className="lg:col-span-7 space-y-4">
              {product.reviews?.length > 0 ? (
                product.reviews.map((r) => (
                  <div key={r._id} className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-3 w-3 ${s <= r.rating ? "fill-[var(--vg-black)] text-[var(--vg-black)]" : "fill-none text-gray-300"}`} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[var(--vg-muted)]">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[var(--vg-black)] uppercase mb-1">{r.name}</p>
                      <p className="text-[var(--vg-muted)] text-sm">"{r.comment}"</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[var(--vg-gray)] border border-dashed p-14 text-center">
                  <p className="text-[11px] font-bold text-[var(--vg-muted)] uppercase">No reviews yet — be the first!</p>
                </div>
              )}
            </div>

            {/* Write Review Form */}
            {user ? (
              <div className="lg:col-span-5 bg-[var(--vg-gray)] border border-[var(--vg-border)] p-8 h-fit sticky top-28">
                <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em] mb-6">Write a Review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setReview({ ...review, rating: s })}>
                          <Star className={`h-7 w-7 ${s <= review.rating ? "fill-[var(--vg-black)] text-[var(--vg-black)]" : "fill-none text-gray-300"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase">Your Review</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your experience..."
                      value={review.comment}
                      onChange={(e) => setReview({ ...review, comment: e.target.value })}
                      className="w-full border border-[var(--vg-border)] p-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <button type="submit" disabled={reviewLoading} className="btn-primary w-full py-3.5">
                    {reviewLoading ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="lg:col-span-5 bg-[var(--vg-gray)] border p-8 text-center">
                <Heart className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-[11px] font-bold uppercase mb-2">Love this product?</p>
                <p className="text-[12px] text-gray-500 mb-4">Sign in to share your experience</p>
                <button onClick={() => navigate("/login")} className="btn-primary px-6 py-3">Login to Review</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}