import { useState, useMemo } from 'react';
import { useGetProductsQuery } from '@/redux/api/productApiSlice';

const categories = ['All', 'Furniture', 'Lighting', 'Decor', 'Botanical'];

const INITIAL_FILTERS = {
  category: 'All',
  minPrice: '',
  maxPrice: '',
  inStock: false,
  sort: 'newest',
  page: 1
};

export const useProductFilters = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const queryParams = useMemo(() => {
    const params = { page: filters.page, limit: 12 };

    if (filters.category !== 'All') {
      params.category = filters.category;
    }

    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.inStock) params.inStock = true;

    if (filters.sort === 'price-low') params.sort = 'price_asc';
    else if (filters.sort === 'price-high') params.sort = 'price_desc';
    else if (filters.sort === 'rating') params.sort = 'rating';
    else params.sort = 'newest';

    return params;
  }, [filters]);

  const { data: res, isLoading: loading, isError } = useGetProductsQuery(queryParams);

  const products = res?.data || [];
  const pagination = {
    total: res?.pagination?.total || 0,
    pages: res?.pagination?.pages || 1
  };
  const error = isError ? 'Failed to load products. Please try again later.' : null;

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ 
      ...prev, 
      ...newFilters, 
      page: newFilters.page || 1 
    }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return { 
    products, 
    loading, 
    error, 
    filters, 
    pagination, 
    updateFilters, 
    resetFilters,
    categories 
  };
};
