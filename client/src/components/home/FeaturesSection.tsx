import { motion } from "framer-motion";
import { PiFlowerTulip, PiSun } from "react-icons/pi";
import { Link } from "react-router";
import { cardVariants } from "../../utils/variants";

const FeaturesSection = () => {
  const featuresDetails = [
    {
      backgroundImg: "https://media.licdn.com/dms/image/v2/D5622AQFOjR9WsLVbgA/feedshare-shrink_2048_1536/B56ZovBAZ_J8Aw-/0/1761725398547?e=1764201600&v=beta&t=yn7xNHY3fA5Gtjdzq1mFkPWU6dMHNgnQljEUWZ3_LKk",
      icon: <PiFlowerTulip size={32} />,
      featureName: "Indoor potted plants",
      featureDetails: "Perfect for your living space",
      category: "indoor" // Add this
    },
    {
      backgroundImg: "https://media.licdn.com/dms/image/v2/D5622AQGwBlXipenbrA/feedshare-shrink_2048_1536/B56Zi8l6HkG0As-/0/1755510731765?e=1764201600&v=beta&t=AjZsVimnzfnLQcesdjtekhmkqYzipIZyprVfafH9M0c",
      icon: <PiSun size={32} />,
      featureName: "Outdoor potted plants",
      featureDetails: "Garden favorites",
      category: "outdoor" // Add this
    }
  ]
  
  return (
    <section id="collection" className="py-16">
      <div className="container">
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          Plant collections
        </motion.h3>
        
        <motion.h4 className="max-w-3xl mx-auto mt-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          Explore our carefully curated categories to find the perfect plants for your space
        </motion.h4>
        
        <div className="grid-responsive mt-8">
          {featuresDetails.map((detail, index) => (
            <motion.div key={index} className="card" variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, margin: "-50px" }} custom={index} whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
              <div className="w-full aspect-[5/3] bg-cover bg-center rounded-t-xl" style={{ backgroundImage: `url(${detail.backgroundImg})`}} role="img" aria-label={detail.featureName}/>
              <div className="flex flex-col items-center bg-[var(--accent)] p-6 gap-2 text-center">
                <motion.span className="text-[var(--background)]" whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                  {detail.icon}
                </motion.span>
                <h4>{detail.featureName}</h4>
                <p className="text-[var(--text)]">{detail.featureDetails}</p>
                {/* Update Link to include category parameter */}
                <Link 
                  to={`/shop?category=${detail.category}`} 
                  className="py-3 px-6 rounded-2xl block btn-primary mt-2"
                >
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