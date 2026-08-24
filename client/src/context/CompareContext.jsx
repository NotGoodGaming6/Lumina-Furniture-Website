import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartToast, errorAlert } from '@/utils/alerts';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_compare_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lumina_compare_items', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product) => {
    if (compareItems.some((item) => item._id === product._id)) {
      cartToast('Item already in comparison');
      setIsCompareOpen(true);
      return;
    }

    if (compareItems.length >= 4) {
      errorAlert('Comparison Limit', 'You can compare up to 4 design pieces simultaneously.');
      return;
    }

    setCompareItems((prev) => [...prev, product]);
    cartToast('Added to comparison');
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsCompareOpen(false);
  };

  const isInCompare = (productId) => {
    return compareItems.some((item) => item._id === productId);
  };

  const toggleCompare = (product) => {
    if (isInCompare(product._id)) {
      removeFromCompare(product._id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        isCompareOpen,
        setIsCompareOpen,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        toggleCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export default CompareContext;
