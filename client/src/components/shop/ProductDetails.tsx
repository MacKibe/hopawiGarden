import { useParams, useNavigate } from "react-router";
import { FaCartPlus, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useProduct } from "../../hooks/useProduct";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product, loading, error } = useProduct(id);
  const { products } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
        <button onClick={() => navigate(-1)} className="text-blue-500 underline mt-2">
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-blue-700">Product not found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-500 underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        className="mb-4 flex items-center gap-2 text-[var(--background)] hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <motion.img
          src={product.path}
          alt={product.name}
          className="rounded-lg w-full object-cover"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Ratings */}
          {/* <div className="flex items-center gap-1 mb-4">
          </div> */}

          <h2 className="text-2xl font-bold text-[var(--background)] mb-4">
            Kshs {product.price.toLocaleString()}
          </h2>

          <motion.button
            className="bg-[var(--primary)] px-6 py-2 rounded-full flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
          >
            <FaCartPlus /> Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">You may also like</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products
            .filter((p) => p.product_id !== product.product_id)
            .slice(0, 4)
            .map((related) => (
              <motion.div
                key={related.product_id}
                className="p-2 border rounded-lg cursor-pointer hover:shadow-md"
                onClick={() => navigate(`/product/${related.product_id}`)}
                whileHover={{ y: -3 }}
              >
                <img
                  src={related.path}
                  alt={related.name}
                  className="rounded-lg h-32 w-full object-cover"
                />
                <h4 className="mt-2 font-semibold">{related.name}</h4>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;