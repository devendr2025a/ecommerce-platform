import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Upload, Search, Package } from 'lucide-react';
import { productAPI } from '../../services/api';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
const CATEGORIES = [
  "Women's Wear",
  "Men's Wear",
  "Kids' Wear",
  'Ethnic Wear',
  'Western Wear',
  'Footwear',
  'Accessories',
  'Bags & Handbags',
  'Jewellery',
  'Activewear',
  'Innerwear & Sleepwear',
  'Winter Wear',
  'Sarees',
  'Kurtas & Suits',
];
const EMPTY_FORM = { name: '', description: '', price: '', discount: '0', category: '', stock: '', isActive: true };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      const { data } = await productAPI.getAll(params);
      setProducts(data.products);
      setMeta(data.meta);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [page, search]);

  const openCreate = () => { setForm(EMPTY_FORM); setImages([]); setEditingId(null); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price, discount: p.discount, category: p.category, stock: p.stock, isActive: p.isActive });
    setImages([]);
    setEditingId(p._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      images.forEach((img) => fd.append('images', img));

      if (editingId) {
        const { data } = await productAPI.update(editingId, fd);
        setProducts(products.map((p) => (p._id === editingId ? data.product : p)));
        toast.success('Product updated');
      } else {
        const { data } = await productAPI.create(fd);
        setProducts([data.product, ...products]);
        toast.success('Product created');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input-field pl-9 text-sm" />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? <Loading fullScreen={false} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Product</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Stock</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => {
                  const imgUrl = p.images?.[0]?.url ? (p.images[0].url.startsWith('http') ? p.images[0].url : `${API_URL}${p.images[0].url}`) : null;
                  const discounted = p.price - (p.price * p.discount) / 100;
                  return (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {imgUrl ? <img src={imgUrl} alt="" className="w-full h-full object-cover" /> : <Package className="h-5 w-5 text-gray-300 m-2.5" />}
                          </div>
                          <span className="font-medium text-gray-800 line-clamp-1 max-w-[180px]">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{p.category}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-900">₹{discounted.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        {p.discount > 0 && <span className="text-xs text-green-600 ml-1">(-{p.discount}%)</span>}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={p.stock <= 10 ? 'text-red-600 font-semibold' : 'text-gray-600'}>{p.stock}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={`badge ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(p._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Package className="h-10 w-10 mx-auto mb-2" />
                <p>No products found</p>
              </div>
            )}
          </div>
        )}
        {meta.totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-gray-100">
            <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="btn-secondary text-sm disabled:opacity-40">Previous</button>
            <span className="flex items-center px-3 text-sm text-gray-600">{page} / {meta.totalPages}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page === meta.totalPages} className="btn-secondary text-sm disabled:opacity-40">Next</button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field text-sm" placeholder="Product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field text-sm resize-none" placeholder="Product description" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field text-sm" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input type="number" min="0" max="100" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="input-field text-sm" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field text-sm">
                    <option value="">Select...</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input required type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field text-sm" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (max 5)</label>
                <div
                  onClick={() => fileRef.current.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-500">Click to upload images</p>
                  {images.length > 0 && <p className="text-xs text-blue-600 mt-1">{images.length} file(s) selected</p>}
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                  onChange={(e) => setImages(Array.from(e.target.files))} />
              </div>
              {editingId && (
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-blue-600" />
                  <label htmlFor="isActive" className="text-sm text-gray-700">Active (visible to customers)</label>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 py-2.5">
                  {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary px-5">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
