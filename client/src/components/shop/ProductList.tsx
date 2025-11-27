import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import { cardVariants } from "../../utils/variants";
import type { Product, ProductGroup } from "../../types";
import { useState, useMemo } from "react";
// Update props to accept either productGroups or products for backward compatibility
interface ProductListComponentProps {
  productGroups?: ProductGroup[];
  products?: Product[];
  loading: boolean;
  error: string | null;
}

const ProductList = ({ productGroups, products }: ProductListComponentProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 28;

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1,
    });
  };

  // Filter active products and product groups
  const activeProducts = useMemo(() => {
    return products?.filter(product => product.active === true) || [];
  }, [products]);

  const activeProductGroups = useMemo(() => {
    if (!productGroups) return [];
    
    return productGroups
      .map(group => ({
        ...group,
        products: group.products.filter(product => product.active === true)
      }))
      .filter(group => group.products.length > 0); // Only keep groups that have active products
  }, [productGroups]);

  // Determine if we should use grouped or ungrouped display
  const shouldUseGroupedDisplay = useMemo(() => {
    return activeProductGroups.length > 0;
  }, [activeProductGroups.length]);

  // Wrap displayProductGroups in useMemo to prevent unnecessary recalculations
  const displayProductGroups = useMemo(() => {
    return activeProductGroups.length > 0 
      ? activeProductGroups 
      : (activeProducts.length > 0 ? [{ group_name: "All Products", products: activeProducts }] : []);
  }, [activeProductGroups, activeProducts]);

  // For grouped display, show first product from each group
  const displayGroups = useMemo(() => {
    if (shouldUseGroupedDisplay) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      return displayProductGroups.slice(startIndex, endIndex);
    }
    return [];
  }, [shouldUseGroupedDisplay, displayProductGroups, currentPage, productsPerPage]);

  // For ungrouped display
  const currentProducts = useMemo(() => {
    if (!shouldUseGroupedDisplay && activeProducts.length > 0) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      return activeProducts.slice(startIndex, endIndex);
    }
    return [];
  }, [shouldUseGroupedDisplay, activeProducts, currentPage, productsPerPage]);

  // FIXED: Calculate total pages based on what we're displaying
  const totalPages = useMemo(() => {
    if (shouldUseGroupedDisplay) {
      return Math.ceil(displayProductGroups.length / productsPerPage);
    } else {
      return Math.ceil(activeProducts.length / productsPerPage);
    }
  }, [shouldUseGroupedDisplay, displayProductGroups.length, activeProducts.length, productsPerPage]);

  // FIXED: Calculate total items for display
  const totalItems = useMemo(() => {
    if (shouldUseGroupedDisplay) {
      return displayProductGroups.length;
    } else {
      return activeProducts.length;
    }
  }, [shouldUseGroupedDisplay, displayProductGroups.length, activeProducts.length]);

  // FIXED: Calculate current range for display
  const currentRange = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage + 1;
    const end = Math.min(currentPage * productsPerPage, totalItems);
    return { start, end };
  }, [currentPage, productsPerPage, totalItems]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }


    pages.push(    // Previous button
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded-lg hover:bg-[var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>
    );

    // First page button if needed
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 border rounded-lg hover:bg-[var(--secondary)] transition"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 py-2">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 border rounded-lg transition ${
            currentPage === i
              ? "bg-[var(--background)] text-[var(--primary)]"
              : "hover:bg-[var(--secondary)]"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page button if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 py-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 border rounded-lg hover:bg-[var(--secondary)] transition"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded-lg hover:bg-[var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    );

    return pages;
  };

  // Show empty state if no active products
  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-gray-600 mb-4">
            No active products available
          </h3>
          <p className="text-gray-500">
            Check back later for new products!
          </p>
        </motion.div>
      </div>
    );
  }

  // If using grouped products, display first product from each group
  if (shouldUseGroupedDisplay) {
    return (
      <div>
        {/* Grouped Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayGroups.map((group, index) => {
            const firstProduct = group.products[0]; // Show first product from group
            const variantCount = group.products.length;
            
            return (
              <motion.div 
                key={`${group.group_name}-${firstProduct.product_id}`} 
                className="card overflow-hidden relative cursor-pointer bg-[var(--primary)] rounded-lg shadow-sm" 
                variants={cardVariants} 
                initial="hidden" 
                animate="visible" 
                custom={index} 
                onClick={() => navigate(`/product/${firstProduct.product_id}`)}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Product Image */}
                <div className="bg-contain bg-no-repeat bg-top relative h-50 w-full" style={{ backgroundImage: `url(${firstProduct.path})` }}>
                  {/* Group badge if multiple variants */}
                  {variantCount > 1 && (
                    <div className="absolute top-2 right-2 bg-[var(--background)] text-[var(--primary)] px-2 py-1 rounded-full text-xs font-semibold">
                      {variantCount} variants
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{group.group_name}</h4>
                    <p className="text-sm text-[var(--text)] line-clamp-2 mb-4 leading-relaxed">
                      {firstProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <h6 className="font-bold text-[var(--background)] text-xl">
                        Kshs {firstProduct.price.toLocaleString()}
                      </h6>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      className="text-[var(--background)] hover:text-[var(--accent)] transition p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(firstProduct);
                      }}
                    >
                      <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaCartPlus size={28} />
                      </motion.span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination - FIXED: Now it will show when there are multiple pages */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4 mt-8"
          >
            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Showing {currentRange.start} - {currentRange.end} of {totalItems} product groups
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-center gap-2">
              {renderPagination()}
            </div>

            {/* Page Selector for Mobile */}
            <div className="lg:hidden">
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <option key={page} value={page}>
                      Page {page}
                    </option>
                  )
                )}
              </select>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Original ungrouped display (for backward compatibility)
  return (
    <div className="space-y-8">
      {/* Original Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {currentProducts.map((product, index) => (
          <motion.div
            key={product.product_id}
            className="card overflow-hidden relative cursor-pointer bg-[var(--secondary)] rounded-lg shadow-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 },
            }}
            onClick={() => navigate(`/product/${product.product_id}`)}
          >
            {/* Larger Product Image */}
            <div
              className="bg-cover bg-top relative h-80 w-full"
              style={{ backgroundImage: `url(${product.path})` }}
            ></div>

            {/* Product Info */}
            <div className="p-6 flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                <p className="text-sm text-[var(--text)] line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <h6 className="font-bold text-[var(--background)] text-xl">
                  Kshs {product.price.toLocaleString()}
                </h6>
              </div>
              <div className="ml-4">
                <button
                  className="text-[var(--background)] hover:text-[var(--accent)] transition p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaCartPlus size={28} />
                  </motion.span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Original Pagination - FIXED: Now it will show when there are multiple pages */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Showing {currentRange.start} - {currentRange.end} of {totalItems} products
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center gap-2">
            {renderPagination()}
          </div>

          {/* Page Selector for Mobile */}
          <div className="lg:hidden">
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                )
              )}
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;