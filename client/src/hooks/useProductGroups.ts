import { useState, useEffect } from 'react';
import api from '../config/axios';
import type { ProductGroup } from '../types';

export const useProductGroups = () => {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductGroups = async () => {
      try {
        console.log('Fetching grouped products from:', api.defaults.baseURL + '/products/grouped');
        
        const response = await api.get('/products/grouped');
        console.log('Grouped Products API Response:', response.data);
        
        setProductGroups(response.data);
      } catch (err: unknown) {
        console.error('Grouped products fetch error:', err);
        if (typeof err === 'object' && err !== null && 'response' in err) {
          const errorObj = err as { response?: { data?: { error?: string } }, message?: string };
          setError(errorObj.response?.data?.error || errorObj.message || 'Failed to fetch grouped products');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch grouped products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductGroups();
  }, []);

  return { productGroups, loading, error };
};