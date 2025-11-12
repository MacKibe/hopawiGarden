// components/home/RecentProducts.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import type { Product } from "../../types";
import { useProducts } from "../../hooks/useProducts";
import { cardVariants } from "../../utils/variants";

const RecentProducts = () => {
  const { products, loading, error } = useProducts(); // fetch products
  const navigate = useNavigate();
  const controls = useAnimation();
  const animationRef = useRef(0); // track current x offset
  const requestRef = useRef<number | null>(null);
  const speed = 2.0; // adjust for faster/slower scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate scroll with reset for infinite loop
  const animateScroll = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.scrollWidth / 2; // Since we duplicate the items
    animationRef.current -= speed;
    
    // Reset position when scrolled past the first set of items
    if (Math.abs(animationRef.current) >= containerWidth) {
      animationRef.current = 0;
    }
    
    controls.set({ x: `${animationRef.current}px` });
    requestRef.current = requestAnimationFrame(animateScroll);
  }, [controls]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  // Resume scroll
  const handleMouseLeave = () => {
    requestRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateScroll);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animateScroll]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  // Show only the first 10 products and duplicate for seamless loop
  const displayedProducts = products.slice(0, 10);

  return (
    <section
      id="categories"
      className="mx-45 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-3xl font-semibold mb-8">Latest Products</h2>

      <motion.div 
        ref={containerRef}
        className="flex gap-6 w-max" 
        animate={controls}
      >
        {[...displayedProducts, ...displayedProducts, ...displayedProducts].map(
          (product: Product, index: number) => (
            <motion.div
              key={`${product.product_id}-${index}`}
              className="card overflow-hidden relative cursor-pointer flex-shrink-0 w-80 h-90 bg-[var(--background)] rounded-2xl shadow-lg"
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
              {/* Product Image */}
              <div 
                className="card-img bg-cover bg-center relative h-48 w-full"
                style={{ backgroundImage: `url(${product.path || ""})` }}
              >
                <motion.div 
                  className="absolute inset-0 bg-black/0 flex items-center justify-center"
                  whileHover={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex justify-between items-start text-[var(--primary)]">
                <div className="flex-1">
                  <h4 className="font-bold text-xl">{product.name}</h4>
                  <p className="text-lg truncate mt-1">
                    {product.description}
                  </p>
                  <h6 className="font-bold text-[var(--background)] mt-3">
                    Kshs {product.price.toLocaleString()}
                  </h6>
                </div>
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
};

export default RecentProducts;