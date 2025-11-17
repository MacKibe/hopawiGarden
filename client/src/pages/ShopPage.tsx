import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import ProductList from "../components/shop/ProductList";
import { itemVariants, sectionVariants } from "../utils/variants";
import { useProductGroups } from "../hooks/useProductGroups";
import type { ProductFilters, FilterState } from "../types";
import { FaFilter, FaTimes } from "react-icons/fa";

const ShopPage = () => {
  const { productGroups, loading, error } = useProductGroups();
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<FilterState["sortBy"]>("name");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Read category from URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: categoryFromUrl,
      }));
    }
  }, [searchParams, setSearchParams]);

  // Filter and sort product groups
  const filteredAndSortedProductGroups = useMemo(() => {
    let filtered = productGroups;

    // Apply filters to each group's products
    if (filters.category && filters.category !== "all") {
      filtered = filtered.map(group => ({
        ...group,
        products: group.products.filter(
          (product) =>
            product.category?.toLowerCase() === filters.category?.toLowerCase()
        )
      })).filter(group => group.products.length > 0); // Remove empty groups
    }

    if (filters.priceRange) {
      filtered = filtered.map(group => ({
        ...group,
        products: group.products.filter(
          (product) =>
            product.price >= filters.priceRange![0] &&
            product.price <= filters.priceRange![1]
        )
      })).filter(group => group.products.length > 0);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.map(group => ({
        ...group,
        products: group.products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        )
      })).filter(group => group.products.length > 0);
    }

    // Apply sorting to groups (you can customize this)
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => 
          (a.products[0]?.price || 0) - (b.products[0]?.price || 0)
        );
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => 
          (b.products[0]?.price || 0) - (a.products[0]?.price || 0)
        );
        break;
      case "name":
      default:
        filtered = [...filtered].sort((a, b) => a.group_name.localeCompare(b.group_name));
        break;
    }

    return filtered;
  }, [productGroups, filters, sortBy]);

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as FilterState["sortBy"]);
  };

  const resetFilters = () => {
    setFilters({});
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const categories = [
    { id: "all", label: "All plants" },
    { id: "indoor", label: "Indoor plants" },
    { id: "outdoor", label: "Outdoor plants" },
    { id: "planter", label: "Planters" },
  ];

  const activeCategory = filters.category || "all";
  const priceRange = filters.priceRange || [0, 10000];
  const searchQuery = filters.searchQuery || "";

  return (
    <div className="container-responsive py-responsive">
      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        
        {/* Mobile Filter Button */}
        <motion.div className="lg:hidden mb-4" variants={itemVariants}>
          <button
            onClick={toggleFilters}
            className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg bg-[var(--primary)] shadow-sm hover:bg-[var(--secondary)] transition-colors"
          >
            {showFilters ? <FaTimes /> : <FaFilter />}
            <span className="font-semibold">
              {showFilters ? "Hide Filters" : "Show Filters"}
            </span>
          </button>
        </motion.div>

        {/* Top Filter Bar */}
        <motion.div
          variants={itemVariants}
          className={`
            bg-[var(--primary)] rounded-lg shadow-sm p-6
            ${showFilters ? 'block' : 'hidden lg:block'}
          `}
        >
          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Search</h4>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--background)] text-sm"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    searchQuery: e.target.value || undefined,
                  })
                }
              />
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Price range</h4>
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  className="w-full accent-[var(--background)]"
                  onChange={(e) =>
                    handleFilterChange({
                      ...filters,
                      priceRange:
                        parseInt(e.target.value) < 10000
                          ? [0, parseInt(e.target.value)]
                          : undefined,
                    })
                  }
                />
                <div className="flex justify-between text-xs">
                  <span>Kshs {priceRange[0].toLocaleString()}</span>
                  <span>Kshs {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Category</h4>
              <select
                value={activeCategory}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    category:
                      e.target.value !== "all" ? e.target.value : undefined,
                  })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--background)] text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Sort by</h4>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--background)] text-sm"
              >
                <option value="name">Alphabetically, A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Count and Reset */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-4 border-t">
            <div className="text-sm">
              <div className="font-semibold">
                <span className="text-[var(--background)]">
                  {filteredAndSortedProductGroups.length}
                </span>{" "}
                product groups
              </div>
            </div>
            <button
              onClick={resetFilters}
              className="text-sm text-[var(--background)] underline hover:text-[var(--accent)] transition"
            >
              Reset All
            </button>
          </div>

          {/* Active Filters Display - Mobile only */}
          {(activeCategory !== "all" || priceRange[1] < 10000 || searchQuery) && (
            <div className="lg:hidden mt-4 p-3 bg-[var(--secondary)] rounded-lg">
              <h4 className="font-semibold mb-2 text-sm">Active Filters:</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {activeCategory !== "all" && (
                  <span className="bg-[var(--background)] text-[var(--primary)] px-2 py-1 rounded">
                    {categories.find((c) => c.id === activeCategory)?.label}
                  </span>
                )}
                {priceRange[1] < 10000 && (
                  <span className="bg-[var(--background)] text-[var(--primary)] px-2 py-1 rounded">
                    Up to Kshs {priceRange[1].toLocaleString()}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-[var(--background)] text-[var(--primary)] px-2 py-1 rounded">
                    Search: "{searchQuery}"
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ProductList
            productGroups={filteredAndSortedProductGroups}
            loading={loading}
            error={error}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopPage;