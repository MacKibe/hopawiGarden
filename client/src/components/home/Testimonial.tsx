import { motion } from "framer-motion";
import { testimonials } from "../../data/testimonials";
import { RiStarSFill } from "react-icons/ri";
import { testimonialVariants, starVariants } from "../../utils/variants";

const Testimonial = () => {
  return (
    <div className="grid-responsive mt-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="flex flex-col gap-4 bg-[var(--primary)] text-[var(--background)] p-6 rounded-xl"
          variants={testimonialVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={index}
          whileHover={{ 
            y: -5, 
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.blockquote 
            className="text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg italic">
              <span className="text-2xl font-bold leading-none">"</span>
              {testimonial.message}
              <span className="text-2xl font-bold leading-none">"</span>
            </p>
          </motion.blockquote>

          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <motion.img 
                src={testimonial.imgSrc} 
                alt={testimonial.author} 
                className="w-12 h-12 object-cover rounded-full" 
                loading="lazy"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <p className="font-medium">{testimonial.author}</p>
            </div>
            
            <div className="flex items-center">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <motion.span
                  key={i}
                  variants={starVariants}
                  custom={i}
                >
                  <RiStarSFill className="text-yellow-400 text-xl" />
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default Testimonial;