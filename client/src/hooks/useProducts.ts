import { useState, useEffect } from 'react';
import api from '../config/axios';
import type { Product } from '../types';

interface UseProductsOptions {
  category?: string;
  active?: boolean;
  limit?: number;
  offset?: number;
  minimal?: boolean; // Only fetch essential data for lists
  enabled?: boolean; // Control when to fetch
}

// Simple cache implementation
const productsCache = new Map();

export const useProducts = (options: UseProductsOptions = {}) => {
  const { 
    category, 
    active, 
    limit = 50, 
    offset = 0, 
    minimal = true,
    enabled = true 
  } = options;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Don't fetch if disabled
      if (!enabled) {
        setLoading(false);
        return;
      }

      // Generate cache key based on options
      const cacheKey = JSON.stringify({ category, active, limit, offset, minimal });
      const cached = productsCache.get(cacheKey);
      
      // Return cached data if available
      if (cached) {
        console.log('Using cached products');
        setProducts(cached);
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching products with options:', { category, active, limit, offset, minimal });
        
        const params = new URLSearchParams();
        
        // Only add parameters that are provided
        if (category) params.append('category', category);
        if (active !== undefined) params.append('active', active.toString());
        params.append('limit', limit.toString());
        params.append('offset', offset.toString());
        params.append('minimal', minimal.toString());
        
        const response = await api.get(`/products?${params.toString()}`);
        console.log('API Response received');
        
        // Handle both response formats (array or object with pagination)
        const productsData = response.data.products || response.data;
        
        // Ensure all products have images array and required fields
        const productsWithDefaults = Array.isArray(productsData) ? productsData.map((product: Product) => ({
          ...product,
          images: product.images || [],
          sunlight_exposure: product.sunlight_exposure || '',
          leaf_size: product.leaf_size || '',
          long_description: product.long_description || product.description || '',
          category: product.category || 'general',
          is_flowering: product.is_flowering || false,
          planter_details: product.planter_details || null
        })) : [];
        
        // Cache the results
        productsCache.set(cacheKey, productsWithDefaults);
        setProducts(productsWithDefaults);
        
      } catch (err: unknown) {
        console.error('Products fetch error:', err);
        if (typeof err === 'object' && err !== null && 'response' in err) {
          const errorObj = err as { response?: { data?: { error?: string } }, message?: string };
          setError(errorObj.response?.data?.error || errorObj.message || 'Failed to fetch products');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, active, limit, offset, minimal, enabled]);

  return { products, loading, error };
};

// Clear cache function for when products are updated
export const clearProductsCache = (options?: UseProductsOptions) => {
  if (options) {
    const cacheKey = JSON.stringify(options);
    productsCache.delete(cacheKey);
  } else {
    productsCache.clear();
  }
  console.log('Products cache cleared');
};