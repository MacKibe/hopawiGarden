// components/home/CategorySection.tsx
import { useMemo } from 'react';
import { Link } from 'react-router';
import { useProducts } from '../../hooks/useProducts';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';

interface PlantCollection {
  id: string;
  name: string;
  description: string;
  filterFn: (product: Product) => boolean;
  plants: Product[];
}

const CategorySection = () => {
  const { products, loading, error } = useProducts();
  const { addItem } = useCartStore();

  // Simple collection definitions
  const collectionDefinitions: Omit<PlantCollection, 'plants'>[] = [
    {
      id: 'indoor',
      name: 'Indoor plants',
      description: 'Plants that thrive indoors',
      filterFn: (product: Product) => 
        product.category?.toLowerCase().includes('indoor') || 
        product.name.toLowerCase().includes('indoor') ||
        product.description.toLowerCase().includes('indoor')
    },
    {
      id: 'outdoor',
      name: 'Outdoor plants',
      description: 'Plants that thrive outsides',
      filterFn: (product: Product) => 
        product.category?.toLowerCase().includes('outdoor') || 
        product.name.toLowerCase().includes('outdoor') ||
        product.description.toLowerCase().includes('outdoor')
    },
    // {
    //   id: 'flowering',
    //   name: 'Flowering plants',
    //   description: 'Plants with beautiful flowers',
    //   filterFn: (product: Product) => product.is_flowering === true
    // },
    // {
    //   id: 'full-sun',
    //   name: 'Full sun plants',
    //   description: 'Needs direct sunlight',
    //   filterFn: (product: Product) => product.sunlight_exposure === 'full_sun'
    // },
    // {
    //   id: 'partial-sun',
    //   name: 'Partial sun plants',
    //   description: 'Prefers mixed sunlight',
    //   filterFn: (product: Product) => product.sunlight_exposure === 'partial_sun'
    // },
    // {
    //   id: 'low-light',
    //   name: 'Low light plants',
    //   description: 'Grows well in shade',
    //   filterFn: (product: Product) => product.sunlight_exposure === 'low_light'
    // },
    // {
    //   id: 'small',
    //   name: 'Small plants',
    //   description: 'Compact size plants',
    //   filterFn: (product: Product) => product.leaf_size === 'small'
    // },
    // {
    //   id: 'large',
    //   name: 'Large plants',
    //   description: 'Big statement plants',
    //   filterFn: (product: Product) => 
    //     product.leaf_size === 'large' || product.leaf_size === 'extra_large'
    // }
  ];

  // Populate collections with products
  const collections = useMemo(() => {
    if (!products.length) return [];
    
    return collectionDefinitions
      .map(collection => ({
        ...collection,
        plants: products.filter(collection.filterFn).slice(0, 4) // Show 4 plants per collection
      }))
      .filter(collection => collection.plants.length > 0); // Only show collections with plants
  }, [products]);

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <section id="categories" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading categories...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="categories" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className='bg-[var(--secondary)]'>
        <div className="space-y-12">
          {collections.map((collection) => (
            <div key={collection.id} className="border border-gray-200 rounded-lg">
              {/* Collection Header */}
              <div className="bg-green-50 p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-600">{collection.description}</p>
              </div>
              
              {/* Plants Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {collection.plants.map((plant) => (
                    <div key={plant.product_id} className="border border-gray-200 rounded-lg">
                      <Link to={`/product/${plant.product_id}`}>
                        <div 
                          className="h-48 bg-cover bg-center"
                          style={{ backgroundImage: `url(${plant.path})` }}
                        />
                      </Link>
                      
                      <div className="p-4">
                        <Link to={`/product/${plant.product_id}`}>
                          <h4 className="font-medium text-gray-800 mb-2 hover:text-green-600">
                            {plant.name}
                          </h4>
                        </Link>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {plant.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-bold">
                            Kshs {plant.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleAddToCart(plant)}
                            className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View More Link */}
                {collection.plants.length >= 4 && (
                  <div className="text-center mt-6">
                    <Link 
                      to={`/shop?category=${collection.id}`}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      View all {collection.name} →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/shop"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 inline-block"
          >
            Browse All Plants
          </Link>
        </div>
    </section>
  );
};

export default CategorySection;