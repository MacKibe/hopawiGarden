import { motion } from "framer-motion";
import { LuMessageCircle } from "react-icons/lu";
import { faqData } from "../data/faq";
import { contactInfo } from "../data/contactInfo";
import { cardVariants, itemVariants, sectionVariants } from "../utils/variants";

const ContactPage = () => {
  return (
    <div>
      {/* Hero */}
      <motion.section className="bg-[var(--background)] text-[var(--primary)] py-16" initial="hidden" animate="visible"
        >
        <motion.div className="container" variants={sectionVariants}>
          <motion.h2 variants={itemVariants}>Get in Touch</motion.h2>
          <motion.h4 className="max-w-3xl mx-auto mt-4" variants={itemVariants} transition={{ delay: 0.2 }}>
            Have questions about our plants or need help with plant care? 
            We're here to help you grow your green thumb!
          </motion.h4>
        </motion.div>
      </motion.section> 

      {/* Contact Form */}
      <motion.section className="py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM - 2/3 Width */}
          <motion.form id="contactForm" className="lg:col-span-2 bg-[var(--primary)] p-8 rounded-xl shadow-md-[var(--secondary)] text-left"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }} whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <motion.h3 className="flex items-center gap-4 text-2xl text-[var(--background)] mb-6" whileHover={{ x: 5 }}>
              <motion.span whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                <LuMessageCircle size={40} />
              </motion.span>
              Send us a message
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name *", type: "text", placeholder: "Your Full Name" },
                { label: "Email *", type: "email", placeholder: "your@email.com" }
              ].map((field, index) => (
                <motion.div key={index} className="form-group" variants={itemVariants} custom={index}>
                  <label className="block mb-2">{field.label}</label>
                  <motion.input type={field.type} placeholder={field.placeholder} className="w-full" required whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px var(--accent)" }}/>
                </motion.div>
              ))}
            </div>
            
            <motion.div className="form-group mt-6" variants={itemVariants}
            >
              <label className="block mb-2">Subject *</label>
              <motion.input type="text" placeholder="Subject" className="w-full" required whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px var(--accent)" }}/>
            </motion.div>
            
            <motion.div className="form-group mt-6" variants={itemVariants}>
              <label className="block mb-2">Message *</label>
              <motion.textarea placeholder="Tell us more about your question and concern..." rows={6} className="w-full" 
                required whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px var(--accent)" }}/>
            </motion.div>
            
            <motion.button type="submit" className="py-3 px-6 rounded-2xl block btn-primary mt-6" whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}>Send Message</motion.button>
          </motion.form>

          {/* CONTACT INFO */}
          <motion.div className="space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}>
              {contactInfo.map((info, index) => (
                <motion.div key={index} className="bg-[var(--primary)] p-6 rounded-xl shadow-md" variants={cardVariants} custom={index} whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                  <div className="flex items-center gap-3 text-xl mb-4">
                    <motion.span whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      {info.icon}
                    </motion.span>
                    <h4 className="font-semibold text-[var(--background)]">{info.title}</h4>
                  </div>
                  <div className="space-y-2 text-[var(--background)]">
                    <h5 className="font-medium">{info.content.heading}</h5>
                    <p className="text-sm opacity-90">{info.content.subHeading}</p>
                    <a href={info.content.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm font-medium underline hover:text-[var(--accent)] transition-colors">
                      {info.content.linkText}
                    </a>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* FAQ */}
      <motion.section className="bg-[var(--secondary)] py-16">
        <div className="container">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Frequently Asked Questions
          </motion.h3>
          <motion.h4 className="mt-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            Quick answers to common questions about our plants and services
          </motion.h4>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8" initial="hidden" whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {faqData.map((item, index) => (
              <motion.details key={index} className="bg-[var(--primary)] rounded-xl overflow-hidden mb-4 text-left" variants={cardVariants}
                custom={index} whileHover={{ y: -3 }}>
                <summary className="p-6 cursor-pointer font-semibold text-[var(--background)] text-center">
                  <motion.span whileHover={{ x: 5 }}>
                    {item.question}
                  </motion.span>
                </summary>
                <motion.p className="px-6 pb-6 text-[var(--background)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}>
                  {item.answer}
                </motion.p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default ContactPage;