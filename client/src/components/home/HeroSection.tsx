import { motion } from "framer-motion";
import { Link } from "react-router";
import backgroundImage from "/assets/IMG_2335.jpg";
import { itemVariants, spanVariants } from "../../utils/variants";

const HeroSection = () => {
  return (
    <motion.section className="relative min-h-[80dvh] w-full flex items-center justify-center overflow-hidden"
      initial="hidden" animate="visible" variants={spanVariants}>
      {/* Background image */}
      <motion.div className="absolute inset-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ opacity: 0 }}animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }}/>
      
      {/* Overlay */}
      <motion.div className="absolute inset-0 w-full h-full bg-[var(--background)] z-0" initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}/>
      
      {/* Content */}
      <motion.div 
        className="flex flex-col justify-around gap-8 max-w-3xl mx-auto text-center z-10 px-4"
        variants={spanVariants}
      >
        <motion.h1 variants={itemVariants}>Bringing life into your homes and offices</motion.h1>
        
        <motion.p className="max-w-2xl mx-auto text-[var(--primary)] text-xl font-extrabold" variants={itemVariants} transition={{ delay: 0.2 }}>
          Discover our curated collection of beautiful potted plants. Transform your home into a natural sanctuary with nature delivered to your doorstep.
        </motion.p>
        
        <motion.div className="flex gap-4 justify-center py-4" variants={itemVariants} transition={{ delay: 0.4 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/shop" className="bg-[var(--background)] text-[var(--text)] py-3 px-6 rounded-2xl block">
              Shop Now
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
            <a  href="#collection" className="bg-[var(--accent)] text-[var(--background)] py-3 px-6 rounded-2xl block">
              Browse Collection
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection;