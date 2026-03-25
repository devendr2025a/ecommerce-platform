import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) {
        toast('Removed from wishlist', { icon: '💔' });
        return prev.filter((p) => p._id !== product._id);
      }
      toast.success('Added to wishlist!', { icon: '❤️' });
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((p) => p._id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
