import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
// Resolve user dashboard issues
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
import PartnerProgram from './pages/PartnerProgram';
import Blog from './pages/Blog';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLayout from './components/admin/AdminLayout';
import Sale from './pages/Sale';

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

import FloatingActions from './components/common/FloatingActions';

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col relative">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    {/* Floating Actions Dock (Cart, Wishlist, Support) */}
    <FloatingActions />
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
    <Route path="/Wholesale" element={<AppLayout><Sale/></AppLayout>}/>
    <Route path="/wholesale" element={<AppLayout><Sale/></AppLayout>}/>
    <Route path="/offers" element={<AppLayout><Sale/></AppLayout>}/>
    <Route path="/deals" element={<AppLayout><Sale/></AppLayout>}/>
    <Route path="/cart" element={<AppLayout><Cart /></AppLayout>} />
    <Route path="/blog" element={<AppLayout><Blog /></AppLayout>} />
    <Route path="/partner" element={<AppLayout><PartnerProgram /></AppLayout>} />
    <Route path="/franchise" element={<AppLayout><PartnerProgram /></AppLayout>} />
    <Route path="/seller" element={<AppLayout><PartnerProgram /></AppLayout>} />
    <Route path="/warehouse" element={<AppLayout><PartnerProgram /></AppLayout>} />
    <Route path="/deliver" element={<AppLayout><PartnerProgram /></AppLayout>} />
    <Route path="/resources" element={<AppLayout><PartnerProgram /></AppLayout>} />

    {/* Private */}
    <Route path="/checkout" element={<PrivateRoute><AppLayout><Checkout /></AppLayout></PrivateRoute>} />
    <Route path="/dashboard" element={<PrivateRoute><AppLayout><UserDashboard /></AppLayout></PrivateRoute>} />
    <Route path="/orders" element={<PrivateRoute><AppLayout><Orders /></AppLayout></PrivateRoute>} />
    <Route path="/orders/:id" element={<PrivateRoute><AppLayout><OrderDetail /></AppLayout></PrivateRoute>} />

    {/* Admin */}
    <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
    <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
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
