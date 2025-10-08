// client/src/components/home/FeaturedProduct.tsx
import { motion } from "framer-motion";
import { FaCartPlus, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";
import { itemVariants } from "../../utils/variants";
import { useProducts } from "../../hooks/useProducts";

const FeaturedProduct = () => {
  const { products, loading, error } = useProducts();

  // Enhanced loading state
  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h3>Featured Products</h3>
          <p className="text-lg max-w-2xl mx-auto my-4">
            Handpicked favorites from our collection, loved by plant enthusiasts
          </p>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (error) {
    console.error('Featured products error:', error);
    return (
      <div className="container py-12">
        <div className="text-center">
          <h3>Featured Products</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto my-4">
            <FaExclamationTriangle className="text-yellow-500 text-2xl mx-auto mb-2" />
            <h4 className="text-yellow-800 font-semibold">Unable to load products</h4>
            <p className="text-yellow-700 text-sm mt-1">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if products is an array and has items
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h3>Featured Products</h3>
          <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto my-4">
            <p className="text-gray-600">No products available at the moment.</p>
            <Link 
              to="/shop" 
              className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Visit Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const featuredProducts = products.slice(0, 5);

  return (
    <div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Featured Products</h3>
          <motion.h4 
            className="text-lg max-w-2xl mx-auto my-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Handpicked favorites from our collection, loved by plant enthusiasts
          </motion.h4>
        </motion.div>
        
        <motion.div 
          className="grid-responsive mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="container bg-white"
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="p-4 text-left">
                <h5 className="text-xl font-semibold text-[var(--background)]">{product.name}</h5>
                <p className="text-sm text-[var(--text)] mt-2 line-clamp-2">
                  {product.description || 'No description available'}
                </p>
              </div>
              
              <motion.div 
                className="card-img bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${product.path || '/assets/placeholder-plant.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="flex justify-between items-center p-4">
                <h6 className="text-[var(--background)] text-xl font-semibold">
                  Kshs {product.price?.toLocaleString() || '0'}
                </h6>
                <Link 
                  to={`/product/${product.id}`} 
                  className="text-[var(--background)] hover:text-[var(--accent)] transition"
                >
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaCartPlus size={24}/>
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link to="/shop">
            <motion.button 
              className="bg-[var(--background)] text-[var(--primary)] py-3 px-6 rounded-lg font-semibold"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedProduct;