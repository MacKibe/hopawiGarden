import { motion } from "framer-motion";
import Testimonial from "../components/home/Testimonial";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeaturesSection";
import FeaturedProduct from "../components/home/FeaturedProduct";
import ServiceSection from "../components/home/ServiceSection";
import { sectionVariants } from "../utils/variants";
  import { useLocation } from "react-router";
  import { useEffect } from 'react';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const section = document.getElementById(sectionId);

      if (section) {
        // Allow the DOM to render before scrolling
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.state]);
  
  return (
    <motion.main className="text-[var(--text)] text-center" initial="hidden" animate="visible" >
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
