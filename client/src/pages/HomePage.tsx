import { motion } from "framer-motion";
import Testimonial from "../components/home/Testimonial";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeaturesSection";
import FeaturedProduct from "../components/home/FeaturedProduct";
import ServiceSection from "../components/home/ServiceSection";
import { sectionVariants } from "../utils/variants";

const HomePage = () => {
  return (
    <main className="text-[var(--text)] text-center" initial="hidden" animate="visible" >
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
    </main>
  )
}

export default HomePage;