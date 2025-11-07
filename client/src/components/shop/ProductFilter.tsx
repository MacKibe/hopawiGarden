import type { ProductFilters } from '../../types'; // Add this import

interface ProductFilterProps {
  onFilterChange: (filters: ProductFilters) => void
  currentFilters: ProductFilters
}

const ProductFilter = ({ onFilterChange, currentFilters }: ProductFilterProps) => {
    const categories = [
        { id: 'all', label: 'All plants' },
        { id: 'indoor', label: 'Indoor plants' },
        { id: 'outdoor', label: 'Outdoor plants' },
    ]

    // Update filters directly without useEffect
    const updateFilters = (updates: Partial<ProductFilters>) => {
        const newFilters = { ...currentFilters, ...updates };
        onFilterChange(newFilters);
    };

    const handleCategoryChange = (category: string) => {
        updateFilters({ 
            category: category !== 'all' ? category : undefined 
        });
    };

    const handlePriceRangeChange = (maxPrice: number) => {
        updateFilters({ 
            priceRange: maxPrice < 10000 ? [0, maxPrice] : undefined 
        });
    };

    const handleSearchChange = (query: string) => {
        updateFilters({ 
            searchQuery: query || undefined 
        });
    };

    const resetFilters = () => {
        onFilterChange({});
    };

    const activeCategory = currentFilters.category || 'all';
    const priceRange = currentFilters.priceRange || [0, 10000];
    const searchQuery = currentFilters.searchQuery || '';

    return (
        <aside className="sticky top-24 p-6 rounded-lg bg-[var(--primary)] shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button 
                    onClick={resetFilters}
                    className="text-sm text-[var(--background)] underline hover:text-[var(--accent)] transition"
                >
                    Reset All
                </button>
            </div>

            {/* Search Filter */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Search</h4>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                />
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Price range</h4>
                <div className="space-y-2">
                    <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="100" 
                        value={priceRange[1]} 
                        className="w-full accent-[var(--background)]"
                        onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))} 
                    />
                    <div className="flex justify-between text-sm">
                        <span>Kshs {priceRange[0].toLocaleString()}</span>
                        <span>Kshs {priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            {/* Category Filter */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                    {categories.map(category => (
                        <button 
                            key={category.id} 
                            onClick={() => handleCategoryChange(category.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                activeCategory === category.id
                                    ? 'bg-[var(--background)] text-[var(--primary)]'
                                    : 'hover:bg-[var(--secondary)]'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Filters Display */}
            {(activeCategory !== 'all' || priceRange[1] < 10000 || searchQuery) && (
                <div className="mt-6 p-3 bg-[var(--secondary)] rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Active Filters:</h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {activeCategory !== 'all' && (
                            <span className="bg-[var(--background)] text-[var(--primary)] px-2 py-1 rounded">
                                {categories.find(c => c.id === activeCategory)?.label}
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
        </aside>
    )
}

export default ProductFilter;