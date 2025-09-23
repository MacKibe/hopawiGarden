// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import api from '../config/axios';
import type { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from:', api.defaults.baseURL + '/products');
        
        const response = await api.get('/products');
        console.log('API Response:', response.data);
        
        setProducts(response.data);
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
  }, []);

  return { products, loading, error };
};