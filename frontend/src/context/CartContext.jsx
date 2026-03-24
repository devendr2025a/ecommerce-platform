import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setCart({ items: [], totalAmount: 0 }); return; }
    try {
      setCartLoading(true);
      const { data } = await cartAPI.get();
      setCart(data.cart);
    } catch {
      // silent fail
    } finally {
      setCartLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await cartAPI.add({ productId, quantity });
      setCart(data.cart);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await cartAPI.update(productId, { quantity });
      setCart(data.cart);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await cartAPI.remove(productId);
      setCart(data.cart);
      toast.success('Item removed');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      setCart({ items: [], totalAmount: 0 });
    } catch {}
  };

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, cartLoading, cartCount, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
