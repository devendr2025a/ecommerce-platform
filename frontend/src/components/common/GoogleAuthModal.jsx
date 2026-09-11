import React, { useState, useEffect } from 'react';
import { X, Check, User as UserIcon, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GoogleAuthModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Suggested / remembered Google accounts
  const defaultAccounts = [
    {
      name: 'Devendra Kumar',
      email: 'devendra@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Devendra',
      initials: 'D',
      bg: 'bg-emerald-600',
    },
    {
      name: 'Grosliy User',
      email: 'customer@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Customer',
      initials: 'C',
      bg: 'bg-blue-600',
    },
  ];

  // Try real Google Identity Services if client ID is configured
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (isOpen && googleClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response) => {
            if (response.credential) {
              handleGoogleCredential(response.credential);
            }
          },
        });
        const googleBtnElem = document.getElementById('real-google-btn-container');
        if (googleBtnElem) {
          window.google.accounts.id.renderButton(googleBtnElem, {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with',
            shape: 'pill',
          });
        }
      } catch (err) {
        console.warn('Google Identity error:', err);
      }
    }
  }, [isOpen]);

  const handleGoogleCredential = (jwtToken) => {
    try {
      const base64Url = jwtToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const profile = JSON.parse(jsonPayload);
      submitAuth({
        name: profile.name || profile.given_name || 'Google User',
        email: profile.email,
        avatar: profile.picture || '',
      });
    } catch {
      toast.error('Could not process Google sign-in credential');
    }
  };

  const submitAuth = async (accountData) => {
    setLoading(true);
    try {
      await onSuccess(accountData);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid Google email address');
      return;
    }
    const derivedName = name.trim() || email.split('@')[0];
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    submitAuth({
      name: formattedName,
      email: email.toLowerCase().trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-gray-900 transition-all scale-100">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 relative border-b border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">Choose an account</h3>
              <p className="text-xs text-gray-500 mt-0.5">to continue to <span className="font-semibold text-gray-700">Grosliy</span></p>
            </div>
          </div>
        </div>

        {/* Real Google GSI container (if available) */}
        {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <div className="px-6 pt-4 pb-2">
            <div id="real-google-btn-container" className="w-full flex justify-center" />
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
              <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-gray-400">or choose below</span></div>
            </div>
          </div>
        )}

        {/* Quick Account Selection */}
        <div className="px-6 py-3 divide-y divide-gray-100">
          {defaultAccounts.map((acc) => (
            <button
              key={acc.email}
              type="button"
              disabled={loading}
              onClick={() => submitAuth({ name: acc.name, email: acc.email, avatar: acc.avatar })}
              className="w-full flex items-center gap-3.5 py-3 px-2 rounded-xl text-left hover:bg-gray-50 active:bg-gray-100 transition-colors group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full ${acc.bg} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}>
                {acc.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate group-hover:text-[#008848] transition-colors">
                  {acc.name}
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  {acc.email}
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#008848] bg-emerald-50 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Sign In
              </span>
            </button>
          ))}

          {/* Use Another Account Button */}
          {!showCustomInput ? (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="w-full flex items-center gap-3.5 py-3 px-2 rounded-xl text-left hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 group-hover:bg-[#008848]/10 group-hover:text-[#008848] transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                Use another Google account
              </div>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="pt-3 pb-1 space-y-2.5">
              <div className="text-xs font-bold text-gray-800">Enter your Google Email:</div>
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name (e.g. John Doe)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:outline-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  {loading ? 'Signing In...' : 'Continue'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-gray-50/70 border-t border-gray-100 text-[11px] text-gray-500 leading-relaxed">
          To continue, Google will share your name, email address, and language preference with Grosliy.
        </div>
      </div>
    </div>
  );
}
