import React, { useState, useEffect } from 'react';
import { Eye, ToggleLeft, ToggleRight, Search, Users } from 'lucide-react';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      const { data } = await adminAPI.getUsers(params);
      setUsers(data.users);
      setMeta(data.meta);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page, search]);

  const handleViewUser = async (user) => {
    try {
      const { data } = await adminAPI.getUser(user._id);
      setSelectedUser(data.user);
      setUserOrders(data.orders);
    } catch {
      toast.error('Failed to load user details');
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const { data } = await adminAPI.toggleUser(userId);
      setUsers(users.map((u) => (u._id === userId ? data.user : u)));
      if (selectedUser?._id === userId) setSelectedUser(data.user);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update user');
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Users</h1>

      {/* Search */}
      <div className="card p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search by name or email..." value={search}
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
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">User</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Role</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Joined</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{user.phone || '—'}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`badge ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleViewUser(user)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        {user.role !== 'admin' && (
                          <button onClick={() => handleToggleStatus(user._id)} className={`p-1.5 rounded-lg transition-colors ${user.isActive ? 'text-green-500 hover:bg-red-50 hover:text-red-500' : 'text-red-400 hover:bg-green-50 hover:text-green-600'}`} title="Toggle status">
                            {user.isActive ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Users className="h-10 w-10 mx-auto mb-2" />
                <p>No users found</p>
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

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                  {selectedUser.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">{selectedUser.name}</p>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <span className={`badge text-xs ${selectedUser.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedUser.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <p className="font-medium">{selectedUser.phone || '—'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-0.5">Role</p>
                  <p className="font-medium capitalize">{selectedUser.role}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-0.5">Joined</p>
                  <p className="font-medium">{new Date(selectedUser.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-0.5">Orders</p>
                  <p className="font-medium">{userOrders.length}</p>
                </div>
              </div>
              {userOrders.length > 0 && (
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Recent Orders</p>
                  {userOrders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-700 font-mono">#{order._id.slice(-8).toUpperCase()}</span>
                      <span className="font-medium">₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                      <span className={`badge text-xs ${
                        order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>{order.orderStatus}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
