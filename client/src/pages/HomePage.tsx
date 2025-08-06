import { motion } from "framer-motion";
import Testimonial from "../components/home/Testimonial";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeaturesSection";
import FeaturedProduct from "../components/home/FeaturedProduct";
import ServiceSection from "../components/home/ServiceSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const HomePage = () => {
  return (
    <motion.main className="text-[var(--text)] text-center" initial="hidden" animate="visible" variants={containerVariants}>
      {/* Landing Section */}
      <HeroSection />
      
      {/* Features */}
      <motion.section variants={sectionVariants}>
        <ServiceSection />
      </motion.section>

      {/* Features */}
      <motion.section>
        <FeatureSection />
      </motion.section>
      
      {/* Featured Products */}
      <motion.section className="bg-[var(--background)] text-[var(--primary)]">
        <FeaturedProduct />
      </motion.section>
      
      {/* Testimonials */}
      <motion.section>
        <h3>What Our Customers Say</h3>
        <h4>Join thousands of happy plant clients</h4>
        <Testimonial />
      </motion.section>
    </motion.main>
  )
}

export default HomePage;