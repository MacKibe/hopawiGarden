import { motion } from "framer-motion";
// import ProductFilter from "../components/shop/ProductFilter";
import ProductList from "../components/shop/ProductList";
import { itemVariants, sectionVariants } from "../utils/variants";
import { useProducts } from "../hooks/useProducts";

const ShopPage = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="container-responsive py-responsive">
      <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="sidebar-layout">
        {/* <motion.div className="sidebar-aside" variants={itemVariants} transition={{ delay: 0.1 }}>
          <motion.div
            whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}
            className="rounded-xl"
          >
            <ProductFilter />
          </motion.div>
        </motion.div> */}

        <motion.div className="sidebar-main" variants={itemVariants} transition={{ delay: 0.2 }}>
          <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" variants={itemVariants}>
            <h4 className="text-lg font-semibold">
              Showing {products.length} products
            </h4>
            <motion.select className="border rounded-lg py-2 px-3 cursor-pointer touch-target w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px var(--accent)" }}>
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
            </motion.select>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <ProductList products={products} loading={loading} error={error} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopPage;
