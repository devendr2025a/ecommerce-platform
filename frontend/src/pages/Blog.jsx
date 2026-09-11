import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  Search,
  Tag,
  ChefHat,
  Heart,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";

const BLOG_POSTS = [
  {
    id: 1,
    title: "How Grosliy Delivers Groceries in 10–30 Minutes Across Lucknow",
    slug: "how-grosliy-delivers-10-mins-lucknow",
    category: "Technology & Logistics",
    readTime: "3 min read",
    date: "Sep 08, 2026",
    excerpt:
      "A peek behind the scenes at our automated micro-warehouses (dark stores) in Gomti Nagar, Alambagh, and Hazratganj that make lightning-fast delivery possible.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    tags: ["Dark Store", "Lucknow", "Quick Commerce"],
  },
  {
    id: 2,
    title: "10 Daily Superfoods You Should Always Have in Your Kitchen",
    slug: "10-daily-superfoods-kitchen-guide",
    category: "Health & Nutrition",
    readTime: "4 min read",
    date: "Sep 05, 2026",
    excerpt:
      "From organic chia seeds and raw almonds to farm-fresh turmeric and desi ghee, discover the essential items that boost immunity and daily energy.",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    tags: ["Health", "Nutrition", "Fresh Produce"],
  },
  {
    id: 3,
    title: "Smart Grocery Shopping: How to Cut Your Monthly Bill by 30%",
    slug: "smart-grocery-shopping-save-money",
    category: "Smart Savings",
    readTime: "5 min read",
    date: "Aug 29, 2026",
    excerpt:
      "Proven strategies on using Grosliy bulk wholesale packs, combo offers, and seasonal fruits to maximize your household savings without compromising quality.",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
    tags: ["Budget", "Wholesale", "Deals"],
  },
  {
    id: 4,
    title: "Monsoon Food Storage Hacks: Keeping Atta, Spices & Fruits Fresh",
    slug: "monsoon-food-storage-hacks",
    category: "Kitchen Tips",
    readTime: "4 min read",
    date: "Aug 22, 2026",
    excerpt:
      "High humidity during the rainy season can spoil pulses and flour. Learn practical storage techniques and airtight container tips from culinary experts.",
    image:
      "https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=600&q=80",
    tags: ["Storage", "Freshness", "Kitchen Hacks"],
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Technology & Logistics",
    "Health & Nutrition",
    "Smart Savings",
    "Kitchen Tips",
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShare = (title) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success(`Copied article link: "${title}"`, { icon: "🔗" });
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-14">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-950 via-[#008848] to-emerald-900 text-white py-10 sm:py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Grosliy Editorial & Kitchen Journal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Fresh Stories, Recipes & Grocery Guides
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl mx-auto">
            Tips on nutrition, smart shopping, fast delivery logistics, and authentic recipes curated for Lucknow households.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-[76px] z-20 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#008848] text-white shadow-2xs"
                    : "text-gray-600 hover:text-[#008848] hover:bg-emerald-50/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blog articles..."
              className="w-full text-xs bg-[#f1f4f6] pl-9 pr-3 py-1.5 rounded-lg border border-transparent focus:border-[#008848] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
            >
              {/* Cover Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#008848] text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow-2xs tracking-wide uppercase">
                  {post.category}
                </span>

                <button
                  onClick={() => handleShare(post.title)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-2xs cursor-pointer"
                  title="Share article"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-gray-950 tracking-tight leading-snug group-hover:text-[#008848] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {post.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#008848] hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
