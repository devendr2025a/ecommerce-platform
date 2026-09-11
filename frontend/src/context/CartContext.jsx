import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import { ALL_GROCERY_PRODUCTS, BEST_DEALS_PRODUCTS } from '../data/groceryData';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const LOCAL_STORAGE_KEY = 'grosliy_cart_items';

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Initialize from local storage
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartLoading, setCartLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to persist cart:', e);
    }
  }, [items]);

  // Find product by id from grocery catalog
  const findProduct = (productId) => {
    return (
      ALL_GROCERY_PRODUCTS.find((p) => p._id === productId) ||
      BEST_DEALS_PRODUCTS.find((p) => p._id === productId)
    );
  };

  const addToCart = (productOrId, quantity = 1) => {
    let productObj = null;
    let productId = null;

    if (typeof productOrId === 'object' && productOrId !== null) {
      productObj = productOrId;
      productId = productObj._id;
    } else {
      productId = productOrId;
      productObj = findProduct(productId);
    }

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.productId === productId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const price = productObj?.finalPrice ?? productObj?.price ?? 50;
        const originalPrice = productObj?.price ?? price;
        const newItem = {
          productId,
          _id: `cart_${productId}_${Date.now()}`,
          name: productObj?.name || 'Grocery Item',
          unit: productObj?.unit || '1 unit',
          category: productObj?.category || 'Groceries',
          price,
          originalPrice,
          image: productObj?.image || productObj?.images?.[0]?.url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
          quantity,
          product: productObj || {
            _id: productId,
            name: productObj?.name || 'Grocery Item',
            price,
            images: [{ url: productObj?.image }],
          },
        };
        return [...prevItems, newItem];
      }
    });

    // Optionally sync with backend if user is logged in
    if (user) {
      cartAPI.add({ productId, quantity }).catch(() => {});
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
    if (user) {
      cartAPI.update(productId, { quantity }).catch(() => {});
    }
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    toast.success('Item removed from cart', { icon: '🗑️' });
    if (user) {
      cartAPI.remove(productId).catch(() => {});
    }
  };

  const clearCart = () => {
    setItems([]);
    if (user) {
      cartAPI.clear().catch(() => {});
    }
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cart = {
    items,
    totalAmount,
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLoading,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
