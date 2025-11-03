import { motion } from "framer-motion";
import { FaCartPlus} from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { cardVariants } from "../../utils/variants";
import type { ProductListProps } from "../../types";

const ProductList = ({products, loading, error}: ProductListProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">No products available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product, index) => (
        <motion.div
          key={product.product_id}
          className="card overflow-hidden relative cursor-pointer"
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
          <div
            className="card-img bg-cover bg-top relative h-48"
            style={{ backgroundImage: `url(${product.path})` }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.2 },
              }}
            >
              <motion.button className="bg-[var(--primary)] text-black px-4 py-2 rounded-full flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                <FaCartPlus size={16} />
                <span>Add to Cart</span>
              </motion.button>
            </motion.div>
          </div>

          <div className="p-4 flex justify-between">
            <div>
              <h4 className="font-bold">{product.name}</h4>
              <p className="text-sm text-[var(--text)] truncate">
                {product.description}
              </p>
              <h6 className="font-bold text-[var(--background)] mt-4">
                Kshs {product.price.toLocaleString()}
              </h6>
              </div>
            <div>
              <button onClick={(e) => {e.stopPropagation();addToCart(product);}} 
              className="text-[var(--background)] hover:text-[var(--accent)] transition">
                <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <FaCartPlus size={30}/>
                </motion.span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;