import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GrosliyLogo from '../components/common/GrosliyLogo';
import GoogleAuthModal from '../components/common/GoogleAuthModal';
import InputField from '../components/common/InputField';
import toast from 'react-hot-toast';

// Schema-driven login fields following DRY principle
const LOGIN_FIELDS = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'name@example.com',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: '••••••••',
    autoComplete: 'current-password',
  },
];

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

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

  const handleGoogleSuccess = async (googleData) => {
    const data = await loginWithGoogle(googleData);
    navigate(data.user.role === 'admin' ? '/admin' : from, { replace: true });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-4 sm:py-6 bg-[#f8fafc]">
      <div className="w-full max-w-[360px]">
        {/* Compact Logo & Header */}
        <div className="text-center mb-3">
          <div className="flex justify-center mb-1.5">
            <GrosliyLogo />
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#113821] tracking-tight">Welcome Back</h1>
          <p className="text-[11px] text-gray-500">Sign in to your grocery account</p>
        </div>

        {/* Compact Card */}
        <div className="bg-white rounded-xl border border-gray-200/70 shadow-xs p-4 sm:p-5">
          {/* Google One-Click Sign In */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-xs py-2 px-3 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-gray-400 font-bold tracking-wider">or email</span>
            </div>
          </div>

          {/* Form rendered via DRY schema */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {LOGIN_FIELDS.map((field) => (
              <InputField
                key={field.name}
                {...field}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              />
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2 rounded-lg text-xs font-bold tracking-wide shadow-2xs hover:shadow active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Links */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 text-center text-[11px] text-gray-600">
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="font-bold text-[#008848] hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={handleGoogleSuccess}
      />
    </div>
  );
}
