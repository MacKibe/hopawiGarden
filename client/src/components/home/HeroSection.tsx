import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const HeroSection = () => {
  const imgSlide = [
    "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3028.jpg",
    "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3204.jpg",
    "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3186.jpg",
    "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3174.jpg",
    "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3175.jpg",
    "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3187.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imgSlide.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [imgSlide.length]);

  return (
    <section className="relative min-h-[90dvh] flex items-center overflow-hidden bg-gray-900">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSlide[currentImageIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-[var(--background)] text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >HOPAWI GARDENS
            </motion.p>
            <motion.h2
              className=" text-2xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Bringing life into <span className="text-green-400">homes</span>{" "}
              and <span className="text-green-400">offices</span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Embracing greenery living.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                to="/shop"
                className="flex  items-center gap-8 justify-center bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Shop now <IoIosArrowForward />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center gap-12 text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Greenery living
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Serenity
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Life
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Plant Preview */}
          <motion.div
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0 bg-cover bg-center"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                style={{
                  backgroundImage: `url(${imgSlide[currentImageIndex]})`,
                }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
