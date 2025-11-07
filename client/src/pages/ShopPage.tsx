import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router"; // Add this import
import ProductFilter from "../components/shop/ProductFilter";
import ProductList from "../components/shop/ProductList";
import { itemVariants, sectionVariants } from "../utils/variants";
import { useProducts } from "../hooks/useProducts";
import type { ProductFilters, FilterState } from "../types";

const ShopPage = () => {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('featured');
  const [searchParams, setSearchParams] = useSearchParams(); // Add this

  // Read category from URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setFilters(prevFilters => ({
        ...prevFilters,
        category: categoryFromUrl
      }));
      
      // Optional: Clear the URL parameter after applying the filter
      // searchParams.delete('category');
      // setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange![0] && 
        product.price <= filters.priceRange![1]
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Keep original order or add featured logic
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as FilterState['sortBy']);
  };

  return (
    <div className="container-responsive py-responsive">
      <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="sidebar-layout">
        {/* Filters Sidebar */}
        <motion.div className="sidebar-aside" variants={itemVariants} transition={{ delay: 0.1 }}>
          <motion.div
            whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}
            className="rounded-xl"
          >
            <ProductFilter 
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </motion.div>
        </motion.div>

        {/* Products Main Content */}
        <motion.div className="sidebar-main" variants={itemVariants} transition={{ delay: 0.2 }}>
          <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" variants={itemVariants}>
            <h4 className="text-lg font-semibold">
              Showing {filteredAndSortedProducts.length} of {products.length} products
              {/* Show category filter info if active */}
              {filters.category && (
                <span className="text-sm font-normal block mt-1">
                  Filtered by: {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} plants
                </span>
              )}
            </h4>
            <motion.select 
              value={sortBy}
              onChange={handleSortChange}
              className="border rounded-lg py-2 px-3 cursor-pointer touch-target w-full sm:w-auto" 
              whileHover={{ scale: 1.02 }} 
              whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px var(--accent)" }}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </motion.select>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <ProductList 
              products={filteredAndSortedProducts} 
              loading={loading} 
              error={error} 
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopPage;