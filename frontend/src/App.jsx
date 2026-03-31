import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layouts & common
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Loading from './components/common/Loading';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Shipping from './pages/Shipping';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import Disclaimer from './pages/Disclaimer';
import TrackOrder from './pages/TrackOrder';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLayout from './components/admin/AdminLayout';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return !user ? children : <Navigate to="/" replace />;
};

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col relative">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    {/* WhatsApp Float */}
    <a 
      href="https://wa.me/917388330600"
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.256 2.248 3.497 5.234 3.497 8.413 0 6.556-5.332 11.891-11.891 11.891-2.01 0-3.987-.512-5.747-1.488l-6.262 1.696zm6.345-3.551c1.551.921 3.09 1.403 4.752 1.403 5.399 0 9.791-4.393 9.791-9.791 0-2.618-1.02-5.079-2.873-6.932-1.859-1.859-4.321-2.879-6.938-2.879-5.39 0-9.782 4.393-9.782 9.791 0 1.83.512 3.55 1.488 4.977l-1.011 3.693 3.831-.971zm11.376-7.327c-.273-.137-1.62-.8-1.874-.894-.254-.094-.44-.137-.626.137-.186.273-.713.894-.874 1.079-.161.186-.322.211-.595.071-.273-.137-1.152-.425-2.193-1.353-.809-.724-1.355-1.618-1.514-1.892-.159-.273-.017-.421.12-.557.123-.122.273-.322.41-.482.137-.161.183-.273.273-.45.091-.177.046-.334-.023-.472-.069-.137-.626-1.509-.857-2.067-.225-.544-.45-.468-.626-.477-.161-.008-.347-.01-.529-.01s-.477.068-.727.342c-.25.273-.954.933-.954 2.276 0 1.343.977 2.639 1.114 2.818.137.179 1.924 2.937 4.659 4.116.651.281 1.158.448 1.554.574.654.207 1.25.177 1.721.107.525-.078 1.62-.663 1.848-1.302.228-.639.228-1.188.161-1.302-.067-.114-.249-.177-.522-.314z"/>
      </svg>
      <span className="absolute right-full mr-4 bg-white text-black text-[10px] font-black py-2 px-4 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-xl">
        Chat with Support
      </span>
    </a>
  </div>
);

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<AppLayout><Home /></AppLayout>} />
    <Route path="/products" element={<AppLayout><Products /></AppLayout>} />
    <Route path="/products/:id" element={<AppLayout><ProductDetail /></AppLayout>} />
    <Route path="/login" element={<PublicRoute><AppLayout><Login /></AppLayout></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><AppLayout><Register /></AppLayout></PublicRoute>} />
    <Route path="/shipping" element={<AppLayout><Shipping /></AppLayout>} />
    <Route path="/faq" element={<AppLayout><FAQ /></AppLayout>} />
    <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
    <Route path="/how-it-works" element={<AppLayout><HowItWorks /></AppLayout>} />
    <Route path="/about" element={<AppLayout><About /></AppLayout>} />
    <Route path="/terms" element={<AppLayout><TermsAndConditions /></AppLayout>} />
    <Route path="/privacy" element={<AppLayout><PrivacyPolicy /></AppLayout>} />
    <Route path="/refund" element={<AppLayout><RefundPolicy /></AppLayout>} />
    <Route path="/return" element={<AppLayout><ReturnPolicy /></AppLayout>} />
    <Route path="/disclaimer" element={<AppLayout><Disclaimer /></AppLayout>} />
    <Route path="/track-order" element={<AppLayout><TrackOrder /></AppLayout>} />

    {/* Private */}
    <Route path="/cart" element={<PrivateRoute><AppLayout><Cart /></AppLayout></PrivateRoute>} />
    <Route path="/checkout" element={<PrivateRoute><AppLayout><Checkout /></AppLayout></PrivateRoute>} />
    <Route path="/dashboard" element={<PrivateRoute><AppLayout><UserDashboard /></AppLayout></PrivateRoute>} />
    <Route path="/orders" element={<PrivateRoute><AppLayout><Orders /></AppLayout></PrivateRoute>} />
    <Route path="/orders/:id" element={<PrivateRoute><AppLayout><OrderDetail /></AppLayout></PrivateRoute>} />

    {/* Admin */}
    <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
    <Route path="/admin/products" element={<AdminRoute><AdminLayout><AdminProducts /></AdminLayout></AdminRoute>} />
    <Route path="/admin/orders" element={<AdminRoute><AdminLayout><AdminOrders /></AdminLayout></AdminRoute>} />
    <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppRoutes />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
