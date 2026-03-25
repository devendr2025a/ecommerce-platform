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
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-32 bg-[#000000]">
      <div className="w-full max-w-md">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-950 border border-gray-900 mb-6">
            <ShoppingBag className="h-10 w-10 text-white stroke-[1]" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Welcome Back</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Sign in to your account</p>
        </div>

        <div className="bg-[#050505] border border-gray-900 p-10">
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
          <div className="mt-12 text-center space-y-4">
            <Link to="/register" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-white transition-colors block">
              Create New Account
            </Link>
            <div className="h-px bg-gray-900 w-12 mx-auto" />
            <Link to="/" className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] hover:text-white transition-colors block">
                Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
