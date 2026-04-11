  import React, { useState, useEffect, useRef } from "react";
  import {
    Plus,
    Edit2,
    Trash2,
    X,
    Upload,
    Search,
    Package,
    Image as ImageIcon,
    AlertCircle,
  } from "lucide-react";
  import { productAPI } from "../../services/api";
  import Loading from "../../components/common/Loading";
  import toast from "react-hot-toast";

  const API_URL =
    import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

  const CATEGORIES = [
    "Silk Sarees",
    "100% Cotton Kurtas",
    "Chikankari Suits",
    "Ethnic Wear",
    "Linen Shirts & Pants",
    "Pashmina Shwal",
    "Accessories",
  ];

  const EMPTY_FORM = {
    name: "",
    description: "",
    price: "",
    discount: "0",
    category: "",
    stock: "",
    isActive: true,
  };

  function getImageUrl(img) {
    if (!img?.url) return null;
    return img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`;
  }

  export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    // Existing (already-uploaded) images for the product being edited
    const [existingImages, setExistingImages] = useState([]);
    // New files chosen by the user (File objects)
    const [newFiles, setNewFiles] = useState([]);
    // Preview URLs for newFiles
    const [newPreviews, setNewPreviews] = useState([]);
    // IDs of existing images the user wants to delete
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const [saving, setSaving] = useState(false);
    const [deletingImageId, setDeletingImageId] = useState(null);
    const fileRef = useRef();

    /* ─── Fetch Products ─── */
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 10 };
        if (search) params.search = search;
        const { data } = await productAPI.getAll(params);

        setProducts(data.products || []);
        setMeta(data.meta || {});
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, [page, search]);

    /* ─── Modal helpers ─── */
    const openCreate = () => {
      setForm(EMPTY_FORM);
      setExistingImages([]);
      setNewFiles([]);
      setNewPreviews([]);
      setImagesToDelete([]);
      setEditingId(null);
      setShowModal(true);
    };

    const openEdit = (p) => {
      setForm({
        name: p.name,
        description: p.description,
        price: p.price,
        discount: p.discount,
        category: p.category,
        stock: p.stock,
        isActive: p.isActive,
      });
      setExistingImages(p.images || []);
      setNewFiles([]);
      setNewPreviews([]);
      setImagesToDelete([]);
      setEditingId(p._id);
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
      // Revoke object URLs to free memory
      newPreviews.forEach(URL.revokeObjectURL);
    };

    /* ─── File selection ─── */
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      const remaining = 5 - (existingImages.length - imagesToDelete.length);
      if (files.length > remaining) {
        toast.error(
          `You can add at most ${remaining} more image${remaining !== 1 ? "s" : ""}`,
        );
        return;
      }

      // Revoke old previews
      newPreviews.forEach(URL.revokeObjectURL);

      setNewFiles(files);
      setNewPreviews(files.map((f) => URL.createObjectURL(f)));
      // Reset the input so the same file can be re-selected
      e.target.value = "";
    };

    const removeNewFile = (idx) => {
      URL.revokeObjectURL(newPreviews[idx]);
      setNewFiles((prev) => prev.filter((_, i) => i !== idx));
      setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
    };

    /* ─── Mark/unmark existing image for deletion ─── */
    const toggleDeleteExisting = (imgId) => {
      setImagesToDelete((prev) =>
        prev.includes(imgId)
          ? prev.filter((id) => id !== imgId)
          : [...prev, imgId],
      );
    };

    /* ─── Submit ─── */
    const handleSubmit = async (e) => {
      e.preventDefault();
      const keepCount = existingImages.length - imagesToDelete.length;
      if (!editingId && newFiles.length === 0) {
        toast.error("Please upload at least one product image");
        return;
      }
      setSaving(true);
      try {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        newFiles.forEach((f) => fd.append("images", f));

        // Tell backend which existing images to remove
        if (imagesToDelete.length > 0) {
          imagesToDelete.forEach((id) => fd.append("deleteImages", id));
        }

        if (editingId) {
          const { data } = await productAPI.update(editingId, fd);
          setProducts((prev) =>
            prev.map((p) => (p._id === editingId ? data.product : p)),
          );
          toast.success("Product updated successfully");
        } else {
          const { data } = await productAPI.create(fd);
          setProducts((prev) => [data.product, ...prev]);
          toast.success("Product created successfully");
        }
        closeModal();
      } catch (err) {
        const msg =
          err.response?.data?.message || err.message || "Failed to save product";
        toast.error(msg);
        console.error("Product save error:", err.response?.data || err);
      } finally {
        setSaving(false);
      }
    };

    /* ─── Delete product ─── */
    const handleDelete = async (id) => {
      if (!confirm("Delete this product? This cannot be undone.")) return;
      try {
        await productAPI.delete(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted");
      } catch {
        toast.error("Failed to delete product");
      }
    };

    /* ─── Delete single image directly (without full form submit) ─── */
    const handleDeleteImageDirect = async (productId, imageId) => {
      setDeletingImageId(imageId);
      try {
        const { data } = await productAPI.deleteImage(productId, imageId);
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? data.product : p)),
        );
        setExistingImages(data.product.images || []);
        toast.success("Image removed");
      } catch {
        toast.error("Failed to remove image");
      } finally {
        setDeletingImageId(null);
      }
    };

    /* ─── Render ─── */
    const activeExisting = existingImages.filter(
      (img) => !imagesToDelete.includes(img._id),
    );
    const totalSlots = activeExisting.length + newFiles.length;

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <button
            onClick={openCreate}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="card p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="input-field pl-9 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {loading ? (
            <Loading fullScreen={false} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                      Stock
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">
                      Images
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products?.map((p) => {
                    const imgUrl = getImageUrl(p.images?.[0]);
                    const discounted = p.finalPrice;
                    return (
                      <tr
                        key={p._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="h-5 w-5 text-gray-300 m-2.5" />
                              )}
                            </div>
                            <span className="font-medium text-gray-800 line-clamp-1 max-w-[180px]">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                          {p.category}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900">
                            ₹{p.finalPrice?.toLocaleString("en-IN")}
                          </span>

                          {p.discount > 0 && (
                            <>
                              <span className="line-through text-gray-500 ml-1 text-xs">
                                ₹{p.price?.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-green-600 ml-1">
                                (-{p.discount}%)
                              </span>
                            </>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span
                            className={
                              p.stock <= 10
                                ? "text-red-600 font-semibold"
                                : "text-gray-600"
                            }
                          >
                            {p.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span
                            className={`badge ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            {p.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                          {p.images?.length || 0} photo
                          {p.images?.length !== 1 ? "s" : ""}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(p)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {products?.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Package className="h-10 w-10 mx-auto mb-2" />
                  <p>No products found</p>
                </div>
              )}
            </div>
          )}
          {meta?.totalPages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t border-gray-100">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="btn-secondary text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="flex items-center px-3 text-sm text-gray-600">
                {page} / {meta.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === meta.totalPages}
                className="btn-secondary text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* ─── Modal ─── */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="font-bold text-gray-900 text-lg">
                  {editingId ? "Edit Product" : "Add Product"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field text-sm"
                    placeholder="Product name"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="input-field text-sm resize-none"
                    placeholder="Product description"
                  />
                </div>

                {/* Price / Discount */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="input-field text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={form.discount}
                      onChange={(e) =>
                        setForm({ ...form, discount: e.target.value })
                      }
                      className="input-field text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Category / Stock */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="input-field text-sm"
                    >
                      <option value="">Select…</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                      }
                      className="input-field text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* ─── Image Section ─── */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Images{" "}
                      <span className="text-gray-400 font-normal">(max 5)</span>
                    </label>
                    <span
                      className={`text-xs font-semibold ${totalSlots >= 5 ? "text-red-500" : "text-gray-400"}`}
                    >
                      {totalSlots}/5 used
                    </span>
                  </div>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                        Current Images
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {existingImages.map((img) => {
                          const url = getImageUrl(img);
                          const markedForDelete = imagesToDelete.includes(
                            img._id,
                          );
                          return (
                            <div
                              key={img._id}
                              className={`relative group w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                              ${markedForDelete ? "border-red-400 opacity-40" : "border-gray-200"}`}
                            >
                              {url ? (
                                <img
                                  src={url}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <ImageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                              {/* Delete / Restore overlay */}
                              <button
                                type="button"
                                onClick={() =>
                                  editingId
                                    ? handleDeleteImageDirect(editingId, img._id)
                                    : toggleDeleteExisting(img._id)
                                }
                                disabled={deletingImageId === img._id}
                                className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {deletingImageId === img._id ? (
                                  <span className="text-white text-[10px] font-bold">
                                    Removing…
                                  </span>
                                ) : markedForDelete ? (
                                  <span className="text-white text-[10px] font-bold">
                                    Undo
                                  </span>
                                ) : (
                                  <Trash2 className="h-4 w-4 text-white" />
                                )}
                              </button>
                              {markedForDelete && (
                                <div className="absolute top-0.5 right-0.5 bg-red-500 rounded-full p-0.5">
                                  <X className="h-2.5 w-2.5 text-white" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1.5">
                        Hover over an image and click the trash icon to remove it.
                      </p>
                    </div>
                  )}

                  {/* New Files Preview */}
                  {newPreviews.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                        New Images to Upload
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {newPreviews.map((url, idx) => (
                          <div
                            key={idx}
                            className="relative group w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-300"
                          >
                            <img
                              src={url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewFile(idx)}
                              className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload area — only show if slots remain */}
                  {totalSlots < 5 && (
                    <div
                      onClick={() => fileRef.current.click()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
                    >
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">
                        Click to{" "}
                        {existingImages.length > 0 ? "add more" : "upload"} images
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        JPG, PNG, WebP · Max 5MB each
                      </p>
                    </div>
                  )}
                  {totalSlots >= 5 && (
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <p className="text-xs">
                        Maximum 5 images reached. Remove an existing image to add
                        a new one.
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Active toggle (edit only) */}
                {editingId && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                      className="accent-blue-600 w-4 h-4"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                      Active (visible to customers)
                    </label>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"
                  >
                    {saving && (
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                    )}
                    {saving
                      ? "Saving…"
                      : editingId
                        ? "Update Product"
                        : "Create Product"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn-secondary px-5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
