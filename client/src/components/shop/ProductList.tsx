import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import { cardVariants } from "../../utils/variants";
import type { ProductListProps, Product } from "../../types";
import { useState, useMemo } from "react";

const ProductList = ({ products }: ProductListProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1,
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, productsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded-lg hover:bg-[var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>
    );

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

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <motion.div
            key={product.product_id}
            className="card overflow-hidden relative cursor-pointer bg-[var(--primary)] rounded-lg shadow-sm"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * productsPerPage + 1} -{" "}
            {Math.min(currentPage * productsPerPage, products.length)} of{" "}
            {products.length} products
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
