import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Lock, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI, addressAPI } from '../services/api';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'profile',   label: 'Profile',    icon: User },
  { id: 'addresses', label: 'Addresses',  icon: MapPin },
  { id: 'security',  label: 'Security',   icon: Lock },
];

const EMPTY_ADDR = {
  fullName: '', phone: '', addressLine1: '', addressLine2: '',
  city: '', state: '', pincode: '', country: 'India', isDefault: false,
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
    if (activeTab === 'addresses') {
      addressAPI.getAll()
        .then(({ data }) => setAddresses(data.addresses))
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
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (passwords.newPassword.length < 6) { toast.error('Minimum 6 characters required'); return; }
    setSecurityLoading(true);
    try {
      await userAPI.changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      toast.success('Password changed successfully');
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
        toast.success('Address updated');
      } else {
        const { data } = await addressAPI.add(addrForm);
        setAddresses([...addresses, data.address]);
        toast.success('Address added');
      }
      resetAddrForm();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save address');
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm('Delete this address?')) return;
    try {
      await addressAPI.delete(id);
      setAddresses(addresses.filter((a) => a._id !== id));
      toast.success('Address deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressAPI.setDefault(id);
      setAddresses(addresses.map((a) => ({ ...a, isDefault: a._id === id })));
      toast.success('Default address updated');
    } catch { toast.error('Failed to update'); }
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

  /* ── Render ── */
  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-10 sm:py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 bg-white border border-[var(--vg-border)] flex items-center justify-center flex-shrink-0">
            <User className="h-7 w-7 text-[var(--vg-black)] stroke-[1.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--vg-black)] uppercase tracking-[0.06em] truncate">{user?.name}</h1>
            <p className="text-[11px] text-[var(--vg-muted)] font-bold uppercase tracking-[0.3em] mt-0.5">{user?.email}</p>
          </div>
          <Link
            to="/orders"
            className="btn-primary flex items-center gap-2 self-start sm:self-auto whitespace-nowrap"
          >
            <Package className="h-3.5 w-3.5" /> My Orders
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* Sidebar tabs */}
          <div className="lg:col-span-3">
            <div className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all border whitespace-nowrap flex-shrink-0 lg:w-full
                    ${activeTab === id
                      ? 'bg-[var(--vg-black)] text-white border-[var(--vg-black)]'
                      : 'text-[var(--vg-muted)] border-[var(--vg-border)] hover:text-[var(--vg-black)] hover:border-[var(--vg-black)] bg-white'
                    }`}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content panel */}
          <div className="lg:col-span-9">

            {/* ── Profile Tab ── */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-[var(--vg-border)] p-6 sm:p-8">
                <div className="mb-6 pb-4 border-b border-[var(--vg-border)]">
                  <h2 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">Personal Details</h2>
                </div>
                <form onSubmit={handleProfileSave} className="space-y-5 max-w-md">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Full Name</label>
                    <input
                      required value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="input-field text-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Email Address</label>
                    <input
                      value={user?.email}
                      className="input-field text-sm bg-[var(--vg-gray)] text-[var(--vg-muted)] cursor-not-allowed"
                      disabled
                    />
                    <p className="text-[10px] text-[var(--vg-muted)] italic">Email cannot be changed</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Phone Number</label>
                    <input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="input-field text-sm"
                      placeholder="+91 00000 00000"
                      maxLength={10}
                    />
                  </div>
                  <button type="submit" disabled={profileLoading} className="btn-primary w-full py-3">
                    {profileLoading ? 'Saving…' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* ── Addresses Tab ── */}
            {activeTab === 'addresses' && (
              <div className="bg-white border border-[var(--vg-border)]">
                <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[var(--vg-border)]">
                  <h2 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">Saved Addresses</h2>
                  {!showAddrForm && (
                    <button
                      onClick={() => { resetAddrForm(); setShowAddrForm(true); }}
                      className="flex items-center gap-1.5 text-[10px] font-black text-[var(--vg-muted)] hover:text-[var(--vg-red)] uppercase tracking-widest transition-colors"
                    >
                      <Plus className="h-3 w-3" /> Add New
                    </button>
                  )}
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  {/* Address form */}
                  {showAddrForm && (
                    <form onSubmit={handleSaveAddress} className="border border-[var(--vg-border)] bg-[var(--vg-gray)] p-5 sm:p-6 space-y-4 mb-2">
                      <h3 className="text-[10px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">
                        {editingAddr ? 'Edit Address' : 'New Address'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input required placeholder="Full Name" value={addrForm.fullName}
                          onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                          className="input-field text-sm sm:col-span-2" />
                        <input required placeholder="Phone Number" value={addrForm.phone}
                          onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                          className="input-field text-sm sm:col-span-2" maxLength={10} />
                        <input required placeholder="Address Line 1" value={addrForm.addressLine1}
                          onChange={(e) => setAddrForm({ ...addrForm, addressLine1: e.target.value })}
                          className="input-field text-sm sm:col-span-2" />
                        <input placeholder="Address Line 2 (optional)" value={addrForm.addressLine2}
                          onChange={(e) => setAddrForm({ ...addrForm, addressLine2: e.target.value })}
                          className="input-field text-sm sm:col-span-2" />
                        <input required placeholder="City" value={addrForm.city}
                          onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                          className="input-field text-sm" />
                        <input required placeholder="State" value={addrForm.state}
                          onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                          className="input-field text-sm" />
                        <input required placeholder="Pincode" value={addrForm.pincode}
                          onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })}
                          className="input-field text-sm" maxLength={6} />
                        <div className="flex items-center gap-2 pt-1">
                          <input type="checkbox" id="defAddr" checked={addrForm.isDefault}
                            onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })}
                            className="w-4 h-4 accent-black" />
                          <label htmlFor="defAddr" className="text-[11px] font-bold text-[var(--vg-black)]">Set as default</label>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="btn-primary flex-1 py-3">
                          {editingAddr ? 'Update Address' : 'Save Address'}
                        </button>
                        <button type="button" onClick={resetAddrForm}
                          className="border border-[var(--vg-border)] px-6 py-3 text-[11px] font-bold text-[var(--vg-muted)] hover:border-[var(--vg-black)] hover:text-[var(--vg-black)] transition-all uppercase tracking-widest">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Address list */}
                  {addrLoading ? (
                    <div className="text-center py-10 text-[var(--vg-muted)] text-sm">Loading…</div>
                  ) : addresses.length === 0 && !showAddrForm ? (
                    <div className="text-center py-14 border border-dashed border-[var(--vg-border)]">
                      <MapPin className="h-8 w-8 text-[var(--vg-border)] mx-auto mb-3" />
                      <p className="text-[11px] font-black text-[var(--vg-muted)] uppercase tracking-[0.3em]">No saved addresses</p>
                      <button
                        onClick={() => setShowAddrForm(true)}
                        className="mt-4 text-[10px] font-bold text-[var(--vg-red)] uppercase tracking-widest hover:underline"
                      >
                        + Add your first address
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className={`border p-5 transition-all ${addr.isDefault
                            ? 'border-[var(--vg-black)] bg-[var(--vg-gray)]'
                            : 'border-[var(--vg-border)] hover:border-[var(--vg-black)]'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-[13px] font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">{addr.fullName}</p>
                                {addr.isDefault && (
                                  <span className="px-2 py-0.5 bg-[var(--vg-black)] text-white text-[8px] font-black uppercase tracking-wider">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-[12px] text-[var(--vg-muted)] font-bold">{addr.phone}</p>
                              <p className="text-[12px] text-[var(--vg-muted)] leading-relaxed">
                                {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                                {addr.city}, {addr.state} — {addr.pincode}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {!addr.isDefault && (
                                <button onClick={() => handleSetDefault(addr._id)} title="Set as default"
                                  className="p-1.5 text-[var(--vg-muted)] hover:text-[var(--vg-red)] transition-colors">
                                  <Check className="h-4 w-4" />
                                </button>
                              )}
                              <button onClick={() => startEditAddress(addr)}
                                className="p-1.5 text-[var(--vg-muted)] hover:text-[var(--vg-black)] transition-colors">
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleDeleteAddress(addr._id)}
                                className="p-1.5 text-[var(--vg-muted)] hover:text-[var(--vg-red)] transition-colors">
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

            {/* ── Security Tab ── */}
            {activeTab === 'security' && (
              <div className="bg-white border border-[var(--vg-border)] p-6 sm:p-8">
                <div className="mb-6 pb-4 border-b border-[var(--vg-border)]">
                  <h2 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">Change Password</h2>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Current Password</label>
                    <input type="password" required value={passwords.currentPassword}
                      onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                      className="input-field text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">New Password</label>
                    <input type="password" required value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      className="input-field text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest">Confirm New Password</label>
                    <input type="password" required value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      className="input-field text-sm" />
                  </div>
                  <button type="submit" disabled={securityLoading} className="btn-primary w-full py-3">
                    {securityLoading ? 'Updating…' : 'Update Password'}
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
