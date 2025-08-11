import { useState } from 'react'

const ProductFilter = () => {
    const [activeCategory, setActiveCategory] = useState<'indoor' | 'outdoor' | 'all'>('all')
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [leafSize, setLeafSize] = useState<string | null>(null)
    const [flowering, setFlowering] = useState<boolean | null>(null)
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
    const [ratings, setRatings] = useState<number | null>(null)
    const [onSale, setOnSale] = useState(false)
    const [flowerType, setFlowerType] = useState<string | null>(null)
    const [specialFeatures, setSpecialFeatures] = useState<string[]>([])
    const [sunlight, setSunlight] = useState<string | null>(null)

    const categories = [
        { id: 'all', label: 'All Plants' },
        { id: 'indoor', label: 'Indoor' },
        { id: 'outdoor', label: 'Outdoor' },
    ]

    const colors = [
        { id: 'green', label: 'Green', colorClass: 'bg-green-500' },
        { id: 'variegated', label: 'Variegated', colorClass: 'bg-gradient-to-r from-green-500 to-white' },
        { id: 'red', label: 'Red', colorClass: 'bg-red-500' },
        { id: 'purple', label: 'Purple', colorClass: 'bg-purple-500' },
        { id: 'silver', label: 'Silver', colorClass: 'bg-gray-300' }
    ]

    const leafSizes = [
        { id: 'small', label: 'Small' },
        { id: 'medium', label: 'Medium' },
        { id: 'large', label: 'Large' }
    ]

    const flowerTypes = [
        { id: 'rose', label: 'Rose' },
        { id: 'hibiscus', label: 'Hibiscus' },
        { id: 'orchid', label: 'Orchid' },
        { id: 'sunflower', label: 'Sunflower' },
        { id: 'tulip', label: 'Tulip' }
    ]

    const features = [
        'Air Purification',
        'Attracts Pollinators',
        'Low Maintenance',
        'Compact',
        'Disease Resistance',
        'Deer Resistance',
        'Fragrant',
        'Pet Friendly',
        'Drought Tolerant',
        'Shade Resistance'
    ]

    const sunlightOptions = [
        { id: 'full-shade', label: 'Full Shade' },
        { id: 'full-sun', label: 'Full Sun' },
        { id: 'partial-shade', label: 'Partial Shade' },
        { id: 'partial-sun', label: 'Partial Sun' }
    ]

    const toggleColor = (colorId: string) => {
        setSelectedColors(prev =>
            prev.includes(colorId)
                ? prev.filter(id => id !== colorId)
                : [...prev, colorId]
        )
    }

    const toggleFeature = (feature: string) => {
        setSpecialFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        )
    }

    return (
        <aside className="sticky top-24 p-6 rounded-lg bg-[var(--primary)] shadow-sm">
            <h3 className="text-xl font-bold mb-6">Filters</h3>

            {/* Category Filter */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                    {categories.map(category => (
                        <button key={category.id} onClick={() => setActiveCategory(category.id as any)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                activeCategory === category.id
                                    ? 'bg-[var(--background)] text-[var(--primary)]'
                                    : 'hover:bg-[var(--secondary)]'
                            }`}>{category.label}</button>
                    ))}
                </div>
            </div>

            {/* On Sale */}
            <div className="mb-8">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={onSale}
                        onChange={(e) => setOnSale(e.target.checked)}
                        className="accent-[var(--background)]"
                    />
                    <span className="font-semibold">On Sale</span>
                </label>
            </div>

            {/* Ratings */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Ratings</h4>
                <div className="flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map(star => (
                        <button
                            key={star}
                            onClick={() => setRatings(star)}
                            className={`px-3 py-1 rounded-lg transition ${
                                ratings === star
                                    ? 'bg-[var(--background)] text-[var(--primary)]'
                                    : 'hover:bg-[var(--secondary)]'
                            }`}
                        >
                            {star}★ & Up
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Filter */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Color</h4>
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                        <button key={color.id} onClick={() => toggleColor(color.id)}
                            className={`w-8 h-8 rounded-full ${color.colorClass} border-2 ${
                                selectedColors.includes(color.id)
                                    ? 'border-[var(--background)]'
                                    : 'border-transparent'
                            }`}
                            aria-label={`Filter by ${color.label} color`}
                            title={color.label}
                        />
                    ))}
                </div>
            </div>

            {/* Leaf Size Filter */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Leaf Size</h4>
                <div className="space-y-2">
                    {leafSizes.map(size => (
                        <button key={size.id} onClick={() => setLeafSize(size.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                leafSize === size.id
                                    ? 'bg-[var(--background)] text-[var(--primary)]'
                                    : 'hover:bg-[var(--secondary)]'
                            }`}
                        >{size.label}</button>
                    ))}
                </div>
            </div>

            {/* Flowering Filter */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Flowering</h4>
                <div className="space-y-2">
                    <button onClick={() => setFlowering(true)} className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        flowering === true
                            ? 'bg-[var(--background)] text-[var(--primary)]'
                            : 'hover:bg-[var(--secondary)]'
                    }`}>Flowering Plants</button>
                    <button onClick={() => setFlowering(false)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                            flowering === false
                                ? 'bg-[var(--background)] text-[var(--primary)]'
                                : 'hover:bg-[var(--secondary)]'
                        }`}>Non-Flowering Plants</button>
                </div>
            </div>

            {/* Flower Type */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Flower Type</h4>
                <div className="space-y-2">
                    {flowerTypes.map(type => (
                        <button key={type.id} onClick={() => setFlowerType(type.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                flowerType === type.id
                                    ? 'bg-[var(--background)] text-[var(--primary)]'
                                    : 'hover:bg-[var(--secondary)]'
                            }`}
                        >{type.label}</button>
                    ))}
                </div>
            </div>

            {/* Special Features */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Special Features</h4>
                <div className="space-y-2">
                    {features.map(feature => (
                        <label key={feature} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={specialFeatures.includes(feature)}
                                onChange={() => toggleFeature(feature)}
                                className="accent-[var(--background)]"
                            />
                            <span>{feature}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Sunlight Exposure */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Sunlight Exposure</h4>
                <div className="space-y-2">
                    {sunlightOptions.map(opt => (
                        <button key={opt.id} onClick={() => setSunlight(opt.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                sunlight === opt.id
                                    ? 'bg-[var(--background)] text-[var(--primary)]'
                                    : 'hover:bg-[var(--secondary)]'
                            }`}
                        >{opt.label}</button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <input type="range" min="0" max="10000" step="100" value={priceRange[1]} className="w-full accent-[var(--background)] mb-2"
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} />
                <div className="flex justify-between text-sm">
                    <span>Kshs {priceRange[0].toLocaleString()}</span>
                    <span>Kshs {priceRange[1].toLocaleString()}</span>
                </div>
            </div>

            {/* Reset Filters */}
            <button className="w-full mt-4 text-[var(--background)] underline hover:text-[var(--accent)] transition"
                onClick={() => {
                    setActiveCategory('all')
                    setSelectedColors([])
                    setLeafSize(null)
                    setFlowering(null)
                    setPriceRange([0, 10000])
                    setRatings(null)
                    setOnSale(false)
                    setFlowerType(null)
                    setSpecialFeatures([])
                    setSunlight(null)
                }}
            >Reset All Filters</button>
        </aside>
    )
}

export default ProductFilter
