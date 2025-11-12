import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaCartPlus, FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";
import { useProduct } from "../../hooks/useProduct";
import { useProducts } from "../../hooks/useProducts";
import { useCartStore } from "../../store/useCartStore";
import type { Product } from "../../types";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { product, loading, error } = useProduct(id);
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Text truncation logic
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: quantity
    });
  };

  const handleBuyNow = (product: Product) => {
    // Add item to cart and navigate to checkout
    addItem({
      ...product,
      quantity: quantity
    });
    navigate("/checkout");
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
        <button onClick={() => navigate(-1)} className="text-blue-500 underline mt-2">
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-blue-700">Product not found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-500 underline">
          Go Back
        </button>
      </div>
    );
  }

  const isTruncatable = product.long_description && product.long_description.length > 100;

  return (
    <div className="container-responsive py-responsive">
      <button
        className="mb-6 flex items-center gap-2 text-[var(--background)] hover:text-[var(--text)] transition-colors duration-200 font-medium touch-target"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}        >
          <img src={product.path} alt={product.name} className="rounded-lg w-full h-100 lg:h-120 bg-top object-cover shadow-lg"/>

          {/* Product Details Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
            <div>
              <span className="text-sm text-gray-600">Leaf Size</span>
              <p className="font-medium capitalize">{product.leaf_size}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Sunlight</span>
              <p className="font-medium capitalize">{product.sunlight_exposure.replace('_', ' ')}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Flowering</span>
              <p className="font-medium">{product.is_flowering ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Category</span>
              <p className="font-medium capitalize">{product.category || 'General'}</p>
            </div>
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/*Title and Description*/}
          <div>
            <p className="text-5xl font-bold text-black my-3">{product.name}</p>
            
            {/* Description with Read More/Less */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">
                {isDescriptionExpanded 
                  ? product.long_description 
                  : truncateDescription(product.long_description || "")
                }
              </p>
              {isTruncatable && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-[var(--background)] hover:text-[var(--text)] font-medium text-sm mt-2 transition-colors duration-200 touch-target"
                >
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-[var(--background)]">
              Kshs {product.price.toLocaleString()}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 text-gray-600 hover:text-[var(--background)] hover:bg-gray-50 transition-colors duration-200 rounded-l-lg touch-target"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 text-lg font-semibold min-w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 text-gray-600 hover:text-[var(--background)] hover:bg-gray-50 transition-colors duration-200 rounded-r-lg touch-target"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              className="btn-base btn-primary touch-target flex items-center justify-center gap-3 font-semibold text-lg py-3 flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBuyNow(product)}
            >
              <FaShoppingBag className="text-lg" />
              Buy Now
            </motion.button>
            
            <motion.button
              className="flex-1 border-2 border-[var(--background)] text-[var(--background)] px-8 py-3 rounded-full flex items-center justify-center gap-3 font-semibold hover:bg-[var(--background)] hover:text-[var(--primary)] transition-all duration-200 touch-target"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAddToCart(product)}
            >
              <FaCartPlus className="text-lg" />
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-[var(--text)] mb-6">You may also like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.product_id !== product.product_id)
            .slice(0, 4)
            .map((related) => (
              <motion.div
                key={related.product_id}
                className="card-base group cursor-pointer"
                onClick={() => navigate(`/product/${related.product_id}`)}
                whileHover={{ y: -5 }}
              >
                <div className="overflow-hidden">
                  <img
                    src={related.path}
                    alt={related.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-[var(--text)] group-hover:text-[var(--background)] transition-colors duration-200 line-clamp-2">
                    {related.name}
                  </h4>
                  <p className="text-[var(--background)] font-bold mt-2">
                    Kshs {related.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-600 capitalize">{related.leaf_size}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-600 capitalize">
                      {related.sunlight_exposure.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;