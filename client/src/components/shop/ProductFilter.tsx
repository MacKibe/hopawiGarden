import { useState, useEffect } from 'react'
import type { ProductFilters } from '../../types'

interface ProductFilterProps {
  onFilterChange: (filters: ProductFilters) => void
  currentFilters: ProductFilters
}

const ProductFilter = ({ onFilterChange, currentFilters }: ProductFilterProps) => {
    const [activeCategory, setActiveCategory] = useState<'all' | string>(currentFilters.category || 'all')
    const [priceRange, setPriceRange] = useState<[number, number]>(currentFilters.priceRange || [0, 10000])
    const [searchQuery, setSearchQuery] = useState(currentFilters.searchQuery || '')

    const categories = [
        { id: 'all', label: 'All Plants' },
        { id: 'indoor', label: 'Indoor Plants' },
        { id: 'outdoor', label: 'Outdoor Plants' },
        // { id: 'succulent', label: 'Succulents' },
        // { id: 'flowering', label: 'Flowering Plants' },
        // { id: 'foliage', label: 'Foliage Plants' },
    ]

    // Update parent when filters change
    useEffect(() => {
        const filters: ProductFilters = {
            category: activeCategory !== 'all' ? activeCategory : undefined,
            priceRange: priceRange[1] < 10000 ? priceRange : undefined,
            searchQuery: searchQuery || undefined
        }
        onFilterChange(filters)
    }, [activeCategory, priceRange, searchQuery, onFilterChange])

    const handlePriceRangeChange = (index: number, value: number) => {
        const newRange = [...priceRange] as [number, number]
        newRange[index] = value
        setPriceRange(newRange)
    }

    const resetFilters = () => {
        setActiveCategory('all')
        setPriceRange([0, 10000])
        setSearchQuery('')
    }

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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                />
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-2">
                    <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="100" 
                        value={priceRange[1]} 
                        className="w-full accent-[var(--background)]"
                        onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))} 
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
                            onClick={() => setActiveCategory(category.id)}
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

export default ProductFilter