import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form);
      navigate(data.user.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20 bg-[var(--vg-gray)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/assets/logo.png" alt="AVROTIDE" className="h-10 w-auto brightness-0 mx-auto mb-6" />
          <h1 className="text-2xl font-black uppercase tracking-[0.15em] text-[var(--vg-black)]">Welcome Back</h1>
          <p className="text-[12px] text-[var(--vg-muted)] mt-2 uppercase tracking-widest">Sign in to your account</p>
        </div>

        <div className="bg-white border border-[var(--vg-border)] p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
              <input
                type="email" required placeholder="EMAIL@EXAMPLE.COM"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field text-[11px] font-bold tracking-widest uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} required placeholder="••••••••"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-12 text-[11px] font-bold tracking-widest"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-4 tracking-[0.2em] text-xs">
              {loading ? 'AUTHENTICATING...' : 'SECURE SIGN IN'}
            </button>
          </form>
          <div className="mt-8 text-center space-y-3">
            <Link to="/register" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--vg-muted)] hover:text-[var(--vg-red)] transition-colors block">
              Create an Account
            </Link>
            <Link to="/" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--vg-muted)] hover:text-[var(--vg-black)] transition-colors block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
