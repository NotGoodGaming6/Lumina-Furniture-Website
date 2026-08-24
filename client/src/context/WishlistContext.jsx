import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from '@/redux/api/userApiSlice';
import { cartToast, errorAlert } from '@/utils/alerts';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user, token } = useAuth();

  const { data: wishlistData, isLoading } = useGetWishlistQuery(undefined, { skip: !user || !token });
  const [addToWishlistMutation] = useAddToWishlistMutation();
  const [removeFromWishlistMutation] = useRemoveFromWishlistMutation();

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (wishlistData?.data) {
      setWishlistItems(wishlistData.data);
    } else if (!user) {
      setWishlistItems([]);
    }
  }, [wishlistData, user]);

  const addToWishlist = async (product) => {
    if (!user) {
      errorAlert('Please log in', 'You need to be logged in to add items to your wishlist.');
      return;
    }

    setWishlistItems(prev => [...prev, product]);

    try {
      await addToWishlistMutation(product._id).unwrap();
      cartToast('Added to wishlist');
    } catch (err) {
      setWishlistItems(prev => prev.filter(item => item._id !== product._id));
      errorAlert('Error', 'Failed to add item to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;

    const removedItem = wishlistItems.find(item => item._id === productId);
    setWishlistItems(prev => prev.filter(item => item._id !== productId));

    try {
      await removeFromWishlistMutation(productId).unwrap();
      cartToast('Removed from wishlist');
    } catch (err) {
      if (removedItem) {
        setWishlistItems(prev => [...prev, removedItem]);
      }
      errorAlert('Error', 'Failed to remove item from wishlist');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      toggleWishlist,
      isInWishlist,
      loading: isLoading
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
