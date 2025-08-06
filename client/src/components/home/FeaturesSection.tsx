import { motion } from "framer-motion";
import { PiFlowerTulip, PiSun } from "react-icons/pi";
import Img from "../../assets/img.jpg";
import Flower from "../../assets/flower.jpg";
import { Link } from "react-router";

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const FeaturesSection = () => {
  const featuresDetails = [
    {
      backgroundImg: Img,
      icon: <PiFlowerTulip size={32} />,
      featureName: "Indoor Potted Plants",
      featureDetails: "Perfect for your living space",
    },
    {
      backgroundImg: Flower,
      icon: <PiSun size={32} />,
      featureName: "Outdoor Potted Plants",
      featureDetails: "Garden Favorites",
    }
  ]
  
  return (
    <section id="collection" className="py-16">
      <div className="container">
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          Plant Collections
        </motion.h3>
        
        <motion.h4 className="max-w-3xl mx-auto mt-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          Explore our carefully curated categories to find the perfect plants for your space
        </motion.h4>
        
        <div className="grid-responsive mt-8">
          {featuresDetails.map((detail, index) => (
            <motion.div key={index} className="card" variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, margin: "-50px" }} custom={index} whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
              <div className="w-full aspect-[5/3] bg-cover bg-center rounded-t-xl" style={{ backgroundImage: `url(${detail.backgroundImg})`}} role="img" aria-label={detail.featureName}/>
              <div className="flex flex-col items-center p-6 gap-2 text-center">
                <motion.span className="text-[var(--background)]" whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                  {detail.icon}
                </motion.span>
                <h4>{detail.featureName}</h4>
                <p className="text-[var(--text)]">{detail.featureDetails}</p>
                <Link to='/shop' className="btn btn-primary mt-2">
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Explore
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection;