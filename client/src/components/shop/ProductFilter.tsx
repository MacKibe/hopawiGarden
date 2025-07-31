import { useState } from 'react'

const ProductFilter = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [leafSize, setLeafSize] = useState<string | null>(null)
    const [flowering, setFlowering] = useState<boolean | null>(null)
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

    const categories = [
        { id: 'all', label: 'All Plants' },
        { id: 'indoor', label: 'Indoor' },
        { id: 'outdoor', label: 'Outdoor' },
        { id: 'flowers', label: 'Flowering' },
        { id: 'succulents', label: 'Succulents' }
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

    const toggleColor = (colorId: string) => {
        setSelectedColors(prev => 
            prev.includes(colorId) 
                ? prev.filter(id => id !== colorId) 
                : [...prev, colorId]
        )
    }

    return (
        <aside className="sticky top-24 h-fit p-6 rounded-lg bg-[var(--primary)] shadow-sm scroll-auto">
            <h3 className="text-xl font-bold mb-6">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                    {categories.map(category => (
                        <button key={category.id} onClick={() => setActiveCategory(category.id)} 
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                activeCategory === category.id 
                                    ? 'bg-[var(--background)] text-[var(--primary)]' 
                                    : 'hover:bg-[var(--secondary)]'
                            }`}>{category.label}</button>))}
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
                        }`}
                    >Flowering Plants</button>
                    <button onClick={() => setFlowering(false)} 
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                            flowering === false 
                                ? 'bg-[var(--background)] text-[var(--primary)]' 
                                : 'hover:bg-[var(--secondary)]'
                        }`}
                    >Non-Flowering Plants</button>
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <input type="range" min="0" max="10000" step="100" value={priceRange[1]} className="w-full accent-[var(--background)] mb-2"
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}/>
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
                }}
            >Reset All Filters</button>
        </aside>
    )
}

export default ProductFilter