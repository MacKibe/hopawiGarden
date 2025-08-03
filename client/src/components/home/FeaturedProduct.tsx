import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router";
import { products } from "../../data/products";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const FeaturedProduct = () => {
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
          {products.slice(0, 5).map((product, index) => (
            <motion.div
              key={product.id}
              className="card"
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="p-4 text-left">
                <h5 className="text-xl">{product.name}</h5>
                <p className="text-sm text-[var(--text)]">{product.description}</p>
              </div>
              
              <motion.div 
                className="card-img bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})`}}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="flex justify-between items-center p-4">
                <p className="text-[var(--background)] font-bold">Kshs {product.price.toLocaleString()}</p>
                <Link 
                  to={`/shop/${product.id}`} 
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
            <motion.span  className="py-2 px-4 rounded-3xl"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default FeaturedProduct;