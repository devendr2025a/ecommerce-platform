import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20 bg-[var(--vg-gray)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/assets/logo.png" alt="AVROTIDE" className="h-10 w-auto brightness-0 mx-auto mb-6" />
          <h1 className="text-2xl font-black uppercase tracking-[0.15em] text-[var(--vg-black)]">Create Account</h1>
          <p className="text-[12px] text-[var(--vg-muted)] mt-2 uppercase tracking-widest">Join the Avrotide community</p>
        </div>

        <div className="bg-white border border-[var(--vg-border)] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
              <input type="text" required placeholder="JOHN DOE"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field text-[11px] font-bold tracking-widest uppercase" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
              <input type="email" required placeholder="EMAIL@EXAMPLE.COM"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field text-[11px] font-bold tracking-widest uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Phone (Optional)</label>
                <input type="tel" placeholder="9876543210"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field text-[11px] font-bold tracking-widest uppercase font-mono" maxLength={10} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required placeholder="MIN 6 CHARACTERS"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-12 text-[11px] font-bold tracking-widest uppercase" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-4 tracking-[0.2em] text-xs">
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER NOW'}
            </button>
          </form>
          <div className="mt-12 text-center space-y-4">
            <Link to="/login" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-white transition-colors block">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
