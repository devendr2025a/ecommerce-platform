import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
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
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}
