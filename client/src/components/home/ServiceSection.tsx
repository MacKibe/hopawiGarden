import { motion } from "framer-motion";
import { services } from "../../data/services";
import { cardVariants } from "../../utils/variants";

const ServiceSection = () => {
    return(
        <div  id="service">
            {/* Services Section */}
            <motion.div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="text-center mb-12">
                <h3>Our Services</h3>
                <h4 className="mt-2 max-w-3xl mx-auto">
                    Comprehensive plant solutions for every space and need
                </h4>
                </motion.div>
            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div key={index} className="bg-[var(--primary)] text-[var(--background)] p-6 rounded-xl" variants={cardVariants} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                    whileHover={{ 
                        y: -5, 
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        transition: { duration: 0.3 }
                    }}>
                    <div className="flex flex-col items-center text-center gap-4">
                        <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                        {service.icon}
                        </motion.div>
                        <h4 className="text-xl font-semibold">{service.title}</h4>
                        <p className="text-[var(--background)] opacity-80">{service.description}</p>
                    </div>
                    </motion.div>
                ))}
                </div>
            </motion.div>
        </div>
    )
}

export default ServiceSection
