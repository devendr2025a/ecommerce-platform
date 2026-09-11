import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Lock, Plus, Trash2, Edit2, Check, ShieldCheck, Phone, Mail, ChevronRight, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI, addressAPI } from '../services/api';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'profile',   label: 'Personal Details', icon: User },
  { id: 'addresses', label: 'Saved Addresses',  icon: MapPin },
  { id: 'security',  label: 'Account Security', icon: Lock },
];

const EMPTY_ADDR = {
  fullName: '', phone: '', addressLine1: '', addressLine2: '',
  city: 'Lucknow', state: 'Uttar Pradesh', pincode: '', country: 'India', isDefault: false,
};

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [profileLoading, setProfileLoading] = useState(false);

  // Security
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [securityLoading, setSecurityLoading] = useState(false);

  // Addresses
  const [addresses, setAddresses] = useState([]);
  const [addrLoading, setAddrLoading] = useState(true);
  const [editingAddr, setEditingAddr] = useState(null);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState(EMPTY_ADDR);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'addresses') {
      addressAPI.getAll()
        .then(({ data }) => setAddresses(data.addresses || []))
        .catch(() => {})
        .finally(() => setAddrLoading(false));
    }
  }, [activeTab]);

  /* ── Handlers ── */
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const { data } = await userAPI.updateProfile(profile);
      updateUser(data.user);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setSecurityLoading(true);
    try {
      await userAPI.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success('Password changed successfully!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (editingAddr) {
        const { data } = await addressAPI.update(editingAddr, addrForm);
        setAddresses(addresses.map((a) => (a._id === editingAddr ? data.address : a)));
        toast.success('Address updated successfully!');
      } else {
        const { data } = await addressAPI.add(addrForm);
        setAddresses([...addresses, data.address]);
        toast.success('Address added successfully!');
      }
      resetAddrForm();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save address');
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    try {
      await addressAPI.delete(id);
      setAddresses(addresses.filter((a) => a._id !== id));
      toast.success('Address deleted');
    } catch {
      toast.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressAPI.setDefault(id);
      setAddresses(addresses.map((a) => ({ ...a, isDefault: a._id === id })));
      toast.success('Default delivery address updated');
    } catch {
      toast.error('Failed to update default address');
    }
  };

  const startEditAddress = (addr) => {
    setEditingAddr(addr._id);
    setAddrForm({ ...addr });
    setShowAddrForm(true);
  };

  const resetAddrForm = () => {
    setEditingAddr(null);
    setShowAddrForm(false);
    setAddrForm(EMPTY_ADDR);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12">
      {/* ── 1. Premium User Header ── */}
      <section className="bg-gradient-to-r from-emerald-50 via-teal-50/40 to-emerald-50/20 border-b border-emerald-100/70 py-8 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* User Avatar with Initials */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#008848] to-[#025c31] text-white flex items-center justify-center font-black text-2xl shadow-sm ring-4 ring-white/90 shrink-0">
              {user?.name ? user.name[0].toUpperCase() : <User className="w-7 h-7" />}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  {user?.name || 'Customer Profile'}
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#008848] tracking-wider inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1">
                <Mail className="w-3 h-3 text-gray-400" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>

          <Link
            to="/orders"
            className="bg-[#008848] hover:bg-[#00703b] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer active:scale-[0.98]"
          >
            <Package className="w-4 h-4" />
            <span>My Orders & Reorder</span>
          </Link>
        </div>
      </section>

      {/* ── 2. Main Dashboard Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200/70 shadow-2xs p-2 sm:p-2.5">
              <div className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
                {TABS.map(({ id, label, icon: Icon }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 lg:w-full cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50/90 text-[#008848] border border-emerald-200/70 shadow-2xs'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#008848]' : 'text-gray-400'}`} />
                        <span>{label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 hidden lg:block ${isActive ? 'text-[#008848]' : 'text-gray-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Customer Support Box in Sidebar */}
            <div className="bg-white rounded-2xl border border-gray-200/70 shadow-2xs p-4 hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#008848]" />
                <h3 className="text-xs font-bold text-gray-900">Need Assistance?</h3>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                Have questions about your grocery order or delivery in Lucknow? Our customer support is always here.
              </p>
              <Link
                to="/contact"
                className="text-xs font-bold text-[#008848] hover:underline inline-flex items-center gap-1"
              >
                <span>Contact Customer Support</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* ── Tab 1: Personal Details ── */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-gray-200/70 shadow-2xs p-5 sm:p-7">
                <div className="mb-5 pb-3.5 border-b border-gray-100">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">Personal Details</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Manage your personal information and contact details.</p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-500 cursor-not-allowed select-none"
                    />
                    <p className="text-[10px] text-gray-400 italic">Email address is permanently linked to your account.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-10 pr-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all font-mono"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="bg-[#008848] hover:bg-[#00703b] text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm shadow-xs hover:shadow transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
                    >
                      {profileLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Tab 2: Saved Addresses ── */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-gray-200/70 shadow-2xs p-5 sm:p-7">
                <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-100">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">Delivery Addresses</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Manage your shipping addresses in Lucknow.</p>
                  </div>

                  {!showAddrForm && (
                    <button
                      onClick={() => { resetAddrForm(); setShowAddrForm(true); }}
                      className="bg-emerald-50 text-[#008848] hover:bg-emerald-100/80 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Address</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Address form */}
                  {showAddrForm && (
                    <form onSubmit={handleSaveAddress} className="bg-[#f8fafc] border border-emerald-200/70 rounded-xl p-4 sm:p-5 space-y-3 mb-4 animate-in fade-in">
                      <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#008848]" />
                        <span>{editingAddr ? 'Edit Address' : 'Add New Delivery Address'}</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          required
                          placeholder="Recipient Full Name"
                          value={addrForm.fullName}
                          onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#008848] focus:outline-none"
                        />
                        <input
                          required
                          placeholder="Phone Number (10 digits)"
                          value={addrForm.phone}
                          onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#008848] focus:outline-none font-mono"
                          maxLength={10}
                        />
                        <input
                          required
                          placeholder="House No., Building Name, Street"
                          value={addrForm.addressLine1}
                          onChange={(e) => setAddrForm({ ...addrForm, addressLine1: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#008848] focus:outline-none sm:col-span-2"
                        />
                        <input
                          placeholder="Landmark, Area (optional)"
                          value={addrForm.addressLine2}
                          onChange={(e) => setAddrForm({ ...addrForm, addressLine2: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#008848] focus:outline-none sm:col-span-2"
                        />
                        <input
                          required
                          placeholder="City"
                          value={addrForm.city}
                          onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#008848] focus:outline-none"
                        />
                        <input
                          required
                          placeholder="Pincode"
                          value={addrForm.pincode}
                          onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#008848] focus:outline-none font-mono"
                          maxLength={6}
                        />
                        <div className="flex items-center gap-2 pt-1 sm:col-span-2">
                          <input
                            type="checkbox"
                            id="defAddr"
                            checked={addrForm.isDefault}
                            onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })}
                            className="w-4 h-4 accent-[#008848] rounded cursor-pointer"
                          />
                          <label htmlFor="defAddr" className="text-xs font-semibold text-gray-700 cursor-pointer">
                            Set as default delivery address
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-2">
                        <button
                          type="submit"
                          className="bg-[#008848] hover:bg-[#00703b] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-2xs transition-all cursor-pointer"
                        >
                          {editingAddr ? 'Update Address' : 'Save Address'}
                        </button>
                        <button
                          type="button"
                          onClick={resetAddrForm}
                          className="bg-white border border-gray-200 text-gray-600 hover:text-gray-900 text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Address list */}
                  {addrLoading ? (
                    <div className="text-center py-8 text-gray-400 text-xs">Loading addresses...</div>
                  ) : addresses.length === 0 && !showAddrForm ? (
                    <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl">
                      <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-gray-600">No saved addresses</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Add an address for speedy delivery in Lucknow</p>
                      <button
                        onClick={() => setShowAddrForm(true)}
                        className="mt-3 text-xs font-bold text-[#008848] hover:underline inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Your First Address</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className={`rounded-xl p-4 transition-all border ${
                            addr.isDefault
                              ? 'border-emerald-300 bg-emerald-50/30 shadow-2xs'
                              : 'border-gray-200/80 bg-white hover:border-gray-300 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs sm:text-sm font-bold text-gray-900">{addr.fullName}</p>
                                {addr.isDefault && (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-[#008848] text-[9px] font-extrabold rounded-full uppercase tracking-wider">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 font-mono">{addr.phone}</p>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                                {addr.city}, {addr.state} — {addr.pincode}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {!addr.isDefault && (
                                <button
                                  onClick={() => handleSetDefault(addr._id)}
                                  title="Set as default"
                                  className="p-1.5 text-gray-400 hover:text-[#008848] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => startEditAddress(addr)}
                                title="Edit address"
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr._id)}
                                title="Delete address"
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Tab 3: Security ── */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl border border-gray-200/70 shadow-2xs p-5 sm:p-7">
                <div className="mb-5 pb-3.5 border-b border-gray-100">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">Account Security</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Keep your account safe by updating your password regularly.</p>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwords.currentPassword}
                      onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">New Password</label>
                    <input
                      type="password"
                      required
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all"
                      placeholder="Minimum 6 characters"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all"
                      placeholder="Re-enter new password"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={securityLoading}
                      className="bg-[#008848] hover:bg-[#00703b] text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm shadow-xs hover:shadow transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
                    >
                      {securityLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
