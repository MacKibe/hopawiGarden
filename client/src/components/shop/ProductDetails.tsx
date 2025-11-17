import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaCartPlus, FaShoppingBag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useProduct } from "../../hooks/useProduct";
import { useProducts } from "../../hooks/useProducts";
import { useCartStore } from "../../store/useCartStore";
import type { Product } from "../../types";
import api from "../../config/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { product, loading, error } = useProduct(id);
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [allGroupProducts, setAllGroupProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Product | null>(null);
  
  // Image gallery states
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);

  // Safe text replacement helper
  const safeReplace = (text: string | undefined, search: string, replacement: string): string => {
    if (!text) return '';
    return text.replace(search, replacement);
  };

  // Safe capitalize helper
  const safeCapitalize = (text: string | undefined): string => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Text truncation logic
  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Prepare all images for the gallery - ONLY from images array
  useEffect(() => {
    if (selectedVariant || product) {
      const displayProduct = selectedVariant || product;
      if (displayProduct) {
        const images: string[] = [];
        
        // ONLY use images from the images array (product_images table)
        if (displayProduct.images && displayProduct.images.length > 0) {
          displayProduct.images.forEach((img) => {
            if (img.image_url && !images.includes(img.image_url)) {
              images.push(img.image_url);
            }
          });
        }
        
        // Fallback: if no images in images array, use path (legacy support)
        if (images.length === 0 && displayProduct.path) {
          images.push(displayProduct.path);
        }
        
        setAllImages(images);
        setSelectedImageIndex(0); // Reset to first image when product changes
      }
    }
  }, [selectedVariant, product]);

  // Fetch group products when product is available
  useEffect(() => {
    const fetchGroupProducts = async (productName: string) => {
      try {
        const response = await api.get(`/products/group/${encodeURIComponent(productName)}`);
        if (response.data) {
          const allGroupProducts = response.data.products;
          setAllGroupProducts(allGroupProducts);
          
          // Set the current product as the selected variant
          const currentProductInGroup = allGroupProducts.find((p: Product) => p.product_id === product?.product_id);
          setSelectedVariant(currentProductInGroup || product);
        }
      } catch (error) {
        console.error('Failed to fetch group products:', error);
        // If group endpoint fails, try to find products with same name from existing products
        const sameNameProducts = products.filter(p => p.name === productName);
        setAllGroupProducts(sameNameProducts);
        setSelectedVariant(product);
      }
    };

    if (product) {
      fetchGroupProducts(product.name);
      setSelectedVariant(product);
    }
  }, [product, products]);

  // Handle variant selection
  const handleVariantSelect = (variant: Product) => {
    setSelectedVariant(variant);
    // Update URL to reflect the selected variant
    window.history.replaceState(null, '', `/product/${variant.product_id}`);
  };

  // Image gallery navigation
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleAddToCart = (productToAdd: Product) => {
    addItem({
      ...productToAdd,
      quantity: quantity
    });
  };

  const handleBuyNow = (productToBuy: Product) => {
    addItem({
      ...productToBuy,
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

  // Use selectedVariant for display, fallback to product
  const displayProduct = selectedVariant || product;

  const isTruncatable = displayProduct.long_description && displayProduct.long_description.length > 100;

  return (
    <div className="container-responsive py-responsive">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section - Updated layout */}
        <motion.div 
          className="relative lg:flex lg:gap-4"
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
        >
          {/* Vertical Thumbnail Gallery - Hidden on mobile, shown on desktop */}
          {allImages.length > 1 && (
            <div className="hidden lg:flex lg:flex-col lg:gap-2 lg:w-24 lg:flex-shrink-0">
              <div className="flex-1 overflow-y-auto max-h-120 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {allImages.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`w-full mb-2 cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'border-[var(--background)] border-3 shadow-md' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectImage(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Main Image Container */}
          <div className="flex-1">
            {/* Main Product Image Gallery */}
            <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100">
              {/* Main Image */}
              {allImages.length > 0 ? (
                <img 
                  src={allImages[selectedImageIndex]} 
                  alt={`${displayProduct.name} - Image ${selectedImageIndex + 1}`} 
                  className="w-full h-150 lg:h-120 object-cover bg-top"
                />
              ) : (
                <div className="w-full h-80 lg:h-120 flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}

              {/* Navigation Arrows - Only show if multiple images */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 touch-target z-10"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 touch-target z-10"
                    aria-label="Next image"
                  >
                    <FaChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Image Counter - Only show if multiple images */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Horizontal Thumbnail Navigation - Only on mobile */}
            {allImages.length > 1 && (
              <div className="mt-4 lg:hidden">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <motion.button
                      key={index}
                      className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                        selectedImageIndex === index 
                          ? 'border-[var(--background)] border-3 shadow-md' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectImage(index)}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {/* Title and Description */}
          <div>
            <p className="text-5xl font-bold text-black">{displayProduct.name}</p>
            {/* Variant Details */}
            {displayProduct.planter_details && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex gap-4 mt-1">
                  {displayProduct.planter_details.size && (
                    <span className="text-sm font-medium capitalize">
                      Size: {safeReplace(displayProduct.planter_details.size, '_', ' ')}
                    </span>
                  )}
                  {displayProduct.planter_details.color && (
                    <span className="text-sm font-medium capitalize">
                      Color: {displayProduct.planter_details.color}
                    </span>
                  )}
                  {displayProduct.planter_details.type && (
                    <span className="text-sm font-medium capitalize">
                      Type: {displayProduct.planter_details.type}
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* Description with Read More/Less */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {isDescriptionExpanded 
                  ? displayProduct.long_description 
                  : truncateDescription(displayProduct.long_description || "")
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
          <div className="grid grid-cols-3">
            <div className="flex flex-col col-span-2 p-4 space-y-2">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-[var(--background)]">
                  Kshs {displayProduct.price.toLocaleString()}
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
              <div className="flex flex-col gap-4 pt-4">
                <motion.button
                  className="btn-base btn-primary touch-target flex items-center justify-center gap-3 font-semibold text-lg py-3 flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBuyNow(displayProduct)}
                >
                  <FaShoppingBag className="text-lg" />
                  Buy Now
                </motion.button>
                
                <motion.button
                  className="flex-1 border-2 border-[var(--background)] text-[var(--background)] px-8 py-3 rounded-full flex items-center justify-center gap-3 font-semibold hover:bg-[var(--background)] hover:text-[var(--primary)] transition-all duration-200 touch-target"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(displayProduct)}
                >
                  <FaCartPlus className="text-lg" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
            {/* Product Details Grid
            <div className="grid grid-cols-1  gap-4 py-4 border-y border-gray-200 mt-6">
              <div>
                <span className="text-sm text-gray-600">Leaf Size</span>
                <p className="font-medium capitalize">{safeCapitalize(displayProduct.leaf_size)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Sunlight</span>
                <p className="font-medium capitalize">
                  {safeReplace(displayProduct.sunlight_exposure, '_', ' ')}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Flowering</span>
                <p className="font-medium">{displayProduct.is_flowering ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Category</span>
                <p className="font-medium capitalize">{displayProduct.category || 'General'}</p>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>   
      {/* All Variant Images - Show below main image if available */}
      {allGroupProducts.length > 1 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Available Variants:</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allGroupProducts.map((variant) => (
              <motion.div
                key={variant.product_id}
                className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${
                  selectedVariant?.product_id === variant.product_id 
                    ? 'border-[var(--background)] border-3' 
                    : 'border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVariantSelect(variant)}
              >
                {/* Use first image from images array or fallback to path */}
                <img
                  src={variant.images && variant.images.length > 0 ? variant.images[0].image_url : variant.path || ''}
                  alt={variant.name}
                  className="w-40 h-40 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {/* Related Products - Show different products from same category */}
      {products.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-[var(--text)] mb-6">
            You may also like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => 
                p.product_id !== product.product_id && 
                p.category === product.category
              )
              .slice(0, 4)
              .map((related) => (
                <motion.div
                  key={related.product_id}
                  className="card-base group cursor-pointer"
                  onClick={() => navigate(`/product/${related.product_id}`)}
                  whileHover={{ y: -5 }}
                >
                  <div className="overflow-hidden">
                    {/* Use first image from images array or fallback to path */}
                    <img
                      src={related.images && related.images.length > 0 ? related.images[0].image_url : related.path || ''}
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
                      <span className="text-xs text-gray-600 capitalize">{safeCapitalize(related.leaf_size)}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-600 capitalize">
                        {safeReplace(related.sunlight_exposure, '_', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;