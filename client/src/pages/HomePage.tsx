import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import { useLocation } from "react-router";
import { useEffect } from "react";
import CategorySection from "../components/home/CategorySection";
import RecentProducts from "../components/home/RecentProducts";

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
    <motion.main
      className="bg-[var(--secondary)] text-[var(--text)] text-center"
      initial="hidden"
      animate="visible"
    >
      {/* Landing Section */}
      <HeroSection />

      <RecentProducts />

      <CategorySection />
    </motion.main>
  );
};

export default HomePage;
