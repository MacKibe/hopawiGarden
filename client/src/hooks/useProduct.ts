import { useEffect, useState } from "react";
import api from "../config/axios";
import type { Product } from "../types";

export const useProduct = (id?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get(`/products/${id}`);
        
        // Ensure product has all required properties with fallbacks
        const productWithDefaults = {
          ...response.data,
          sunlight_exposure: response.data.sunlight_exposure || '',
          leaf_size: response.data.leaf_size || '',
          long_description: response.data.long_description || response.data.description || '',
          category: response.data.category || 'general',
          is_flowering: response.data.is_flowering || false,
          images: response.data.images || [] // Ensure images array exists
        };
        
        setProduct(productWithDefaults);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};