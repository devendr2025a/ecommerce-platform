import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Lock, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI, addressAPI } from '../services/api';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'security', label: 'Security', icon: Lock },
];

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
  const [addrForm, setAddrForm] = useState({
    fullName: '', phone: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', country: 'India', isDefault: false
  });

  useEffect(() => {
    if (activeTab === 'addresses') {
      addressAPI.getAll().then(({ data }) => setAddresses(data.addresses)).finally(() => setAddrLoading(false));
    }
  }, [activeTab]);

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
    if (passwords.newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setSecurityLoading(true);
    try {
      await userAPI.changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      toast.success('Password changed');
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
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressAPI.setDefault(id);
      setAddresses(addresses.map((a) => ({ ...a, isDefault: a._id === id })));
      toast.success('Default address updated');
    } catch {
      toast.error('Failed to update');
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
    setAddrForm({ fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India', isDefault: false });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <Link to="/orders" className="ml-auto flex items-center gap-2 btn-secondary text-sm py-2">
          <Package className="h-4 w-4" /> My Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="card p-2 h-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h2 className="font-bold text-gray-900 mb-5">Profile Information</h2>
              <form onSubmit={handleProfileSave} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input value={user?.email} className="input-field bg-gray-50 cursor-not-allowed" disabled />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="input-field" placeholder="10-digit phone number" maxLength={10} />
                </div>
                <button type="submit" disabled={profileLoading} className="btn-primary">
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Saved Addresses</h2>
                <button onClick={() => { resetAddrForm(); setShowAddrForm(true); }} className="btn-primary text-sm py-1.5 flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add New
                </button>
              </div>

              {showAddrForm && (
                <form onSubmit={handleSaveAddress} className="mb-5 p-4 bg-gray-50 rounded-xl grid grid-cols-2 gap-3">
                  <h3 className="col-span-2 font-semibold text-sm text-gray-700">{editingAddr ? 'Edit Address' : 'New Address'}</h3>
                  <input required placeholder="Full Name" value={addrForm.fullName} onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })} className="input-field text-sm col-span-2" />
                  <input required placeholder="Phone" value={addrForm.phone} onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })} className="input-field text-sm col-span-2" maxLength={10} />
                  <input required placeholder="Address Line 1" value={addrForm.addressLine1} onChange={(e) => setAddrForm({ ...addrForm, addressLine1: e.target.value })} className="input-field text-sm col-span-2" />
                  <input placeholder="Address Line 2" value={addrForm.addressLine2} onChange={(e) => setAddrForm({ ...addrForm, addressLine2: e.target.value })} className="input-field text-sm col-span-2" />
                  <input required placeholder="City" value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} className="input-field text-sm" />
                  <input required placeholder="State" value={addrForm.state} onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })} className="input-field text-sm" />
                  <input required placeholder="Pincode" value={addrForm.pincode} onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })} className="input-field text-sm" maxLength={6} />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="defAddr" checked={addrForm.isDefault} onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })} className="accent-blue-600" />
                    <label htmlFor="defAddr" className="text-sm text-gray-600">Set as default</label>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <button type="submit" className="btn-primary text-sm py-2 flex-1">Save</button>
                    <button type="button" onClick={resetAddrForm} className="btn-secondary text-sm py-2">Cancel</button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr._id} className={`p-4 rounded-xl border-2 ${addr.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div className="text-sm">
                        <p className="font-semibold text-gray-800">{addr.fullName} {addr.isDefault && <span className="badge bg-blue-100 text-blue-700 ml-1">Default</span>}</p>
                        <p className="text-gray-600">{addr.phone}</p>
                        <p className="text-gray-600">{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      </div>
                      <div className="flex gap-2">
                        {!addr.isDefault && (
                          <button onClick={() => handleSetDefault(addr._id)} title="Set as default" className="text-blue-500 hover:text-blue-700 p-1">
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button onClick={() => startEditAddress(addr)} className="text-gray-400 hover:text-gray-600 p-1">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteAddress(addr._id)} className="text-red-400 hover:text-red-600 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!addrLoading && addresses.length === 0 && !showAddrForm && (
                  <p className="text-gray-500 text-sm text-center py-8">No addresses saved yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6">
              <h2 className="font-bold text-gray-900 mb-5">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" required value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" required value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" required value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className="input-field" />
                </div>
                <button type="submit" disabled={securityLoading} className="btn-primary">
                  {securityLoading ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
