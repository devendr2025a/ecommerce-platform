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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16 border-b border-gray-100 pb-12">
        <div className="w-20 h-20 bg-gray-50 flex items-center justify-center border border-gray-100">
          <User className="h-10 w-10 text-[var(--avro-black)] stroke-[1]" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-[var(--avro-black)] uppercase tracking-tighter italic">{user?.name}</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">{user?.email}</p>
        </div>
        <Link to="/orders" className="md:ml-auto flex items-center gap-3 bg-[var(--avro-black)] border border-[var(--avro-black)] px-6 py-3 text-[10px] font-black text-white hover:bg-gray-800 transition-all uppercase tracking-widest">
          <Package className="h-4 w-4" /> MY ORDERS
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                activeTab === id 
                  ? 'bg-[var(--avro-black)] text-white border-[var(--avro-black)]' 
                  : 'text-gray-400 border-transparent hover:text-[var(--avro-black)] hover:border-gray-100'
              }`}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-100 p-10 shadow-sm">
              <h2 className="text-xs font-black text-[var(--avro-black)] uppercase tracking-[0.3em] mb-10 pb-4 border-b border-gray-100">Personal Details</h2>
              <form onSubmit={handleProfileSave} className="space-y-8 max-w-lg">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Identity</label>
                  <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="input-field text-[11px] font-bold uppercase tracking-widest" required />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Electronic Mail</label>
                  <input value={user?.email} className="input-field bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed text-[11px] font-bold tracking-widest" disabled />
                  <p className="text-[9px] text-gray-600 font-bold uppercase italic mt-2 tracking-widest">Primary identifier cannot be modified</p>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Contact Terminal</label>
                  <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="input-field text-[11px] font-bold uppercase tracking-widest font-mono" placeholder="PH +91 000 000 0000" maxLength={10} />
                </div>
                <button type="submit" disabled={profileLoading} className="btn-primary w-full py-4 tracking-[0.3em] text-[10px]">
                  {profileLoading ? 'SYNCHRONIZING...' : 'COMMIT CHANGES'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-[#111111] border border-gray-800 p-10 ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-900">
                <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Logistic Nodes</h2>
                {!showAddrForm && (
                    <button onClick={() => { resetAddrForm(); setShowAddrForm(true); }} className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                        <Plus className="h-3 w-3" /> REGISTER NEW
                    </button>
                )}
              </div>

              {showAddrForm && (
                <form onSubmit={handleSaveAddress} className="mb-12 p-8 bg-black border border-white space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <h3 className="col-span-2 text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4">{editingAddr ? 'REFINE NODE' : 'INITIALIZE NODE'}</h3>
                    <input required placeholder="FULL NAME" value={addrForm.fullName} onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase" />
                    <input required placeholder="PHONE" value={addrForm.phone} onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase font-mono" maxLength={10} />
                    <input required placeholder="ADDRESS LINE 1" value={addrForm.addressLine1} onChange={(e) => setAddrForm({ ...addrForm, addressLine1: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase" />
                    <input placeholder="ADDRESS LINE 2" value={addrForm.addressLine2} onChange={(e) => setAddrForm({ ...addrForm, addressLine2: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase" />
                    <input required placeholder="CITY" value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} className="input-field text-[10px] font-bold tracking-widest uppercase" />
                    <input required placeholder="STATE" value={addrForm.state} onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })} className="input-field text-[10px] font-bold tracking-widest uppercase" />
                    <input required placeholder="PINCODE" value={addrForm.pincode} onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })} className="input-field text-[10px] font-bold tracking-widest uppercase font-mono" maxLength={6} />
                    <div className="flex items-center gap-3 pt-2">
                        <input type="checkbox" id="defAddr" checked={addrForm.isDefault} onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })} className="w-4 h-4 accent-white bg-black border-gray-800" />
                        <label htmlFor="defAddr" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Node</label>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="btn-primary flex-1 py-4 text-[10px] tracking-[0.3em]">COMMIT NODE</button>
                    <button type="button" onClick={resetAddrForm} className="btn-secondary py-4 text-[10px] tracking-[0.3em]">ABORT</button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div key={addr._id} className={`p-8 border transition-all ${addr.isDefault ? 'bg-[#080808] border-white' : 'bg-black border-gray-900 hover:border-gray-800'}`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{addr.fullName}</p>
                            {addr.isDefault && <span className="px-2 py-0.5 bg-white text-black text-[8px] font-black uppercase tracking-tighter">PRIMARY</span>}
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">{addr.phone}</p>
                        <p className="text-[10px] text-gray-300 font-medium uppercase tracking-[0.15em] leading-relaxed max-w-sm">
                            {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                            {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        {!addr.isDefault && (
                          <button onClick={() => handleSetDefault(addr._id)} className="text-gray-700 hover:text-white transition-colors">
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button onClick={() => startEditAddress(addr)} className="text-gray-700 hover:text-white transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteAddress(addr._id)} className="text-gray-700 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!addrLoading && addresses.length === 0 && !showAddrForm && (
                  <div className="py-20 text-center border border-dashed border-gray-900">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">No logistic data points found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white border border-gray-100 p-10 shadow-sm">
              <h2 className="text-xs font-black text-[var(--avro-black)] uppercase tracking-[0.3em] mb-10 pb-4 border-b border-gray-100">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-8 max-w-lg">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Current Secret</label>
                  <input type="password" required value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className="input-field" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">New Secret</label>
                  <input type="password" required value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="input-field" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Confirm Secret</label>
                  <input type="password" required value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className="input-field" />
                </div>
                <button type="submit" disabled={securityLoading} className="btn-primary w-full py-4 tracking-[0.3em] text-[10px]">
                  {securityLoading ? 'RECONFIGURING...' : 'UPDATE VAULT ACCESS'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
