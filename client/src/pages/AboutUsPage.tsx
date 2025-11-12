import { motion } from "framer-motion";
import { teamMembers } from "../data/team";
import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook, FaDove, FaTiktok } from "react-icons/fa";
import { PiPlantDuotone, PiHeartFill } from "react-icons/pi";
import { sectionVariants, itemVariants, cardVariants } from "../utils/variants"
import ServiceSection from "../components/home/ServiceSection";

const AboutUsPage = () => {
  const img = "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3204.jpg"
  return (
    <div className="text-[var(--background)]">
      {/* Bio */}
      <motion.section className="bg-[var(--background)] text-[var(--primary)] py-16" initial="hidden" animate="visible">
        <motion.div className="container" variants={itemVariants}>
          <motion.h2 variants={itemVariants}>About HOPAWI GARDENS</motion.h2>
          <motion.h4 className="max-w-3xl mx-auto mt-4" variants={itemVariants} transition={{ delay: 0.2 }}>
            We're passionate about bringing the beauty and benefits of plants into every home. 
            Founded in 2025, we've grown from a small local garden to a trusted online 
            destination for plant lovers everywhere.
          </motion.h4>
        </motion.div>
      </motion.section>

      {/* Story */}
      <motion.section className="bg-[#EFEBE7] py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <h3 className="text-4xl mb-6">Our story</h3>
            <p className="text-[var(--text)] text-left space-y-4">
              HOPAWI GARDENS is more than a business—it’s a divine calling to bring nature’s beauty into the spaces where people live and work. We bridge the gap between quality plants and the home or office owners who desire them, delivering greenery that transforms spaces and enriches lives.<br/><br/>
              
              Our vision is to bring life into every home and garden, and our mission—Greenery Living—drives us to provide sustainable, beautiful landscaping and plant solutions. Every plant, design, and service we offer is a step toward healthier, more vibrant spaces that inspire joy and well-being.<br/><br/>
              
              We partner with homeowners, businesses, developers, and event planners who value excellence and beauty. Every project reflects our commitment to urban greening, local growth, and spaces that truly come alive. With HOPAWI Gardens, you don’t just get plants—you get a lasting connection to nature.
            </p>
          </motion.div>
          <motion.div className="rounded-2xl overflow-hidden shadow-lg" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}>
            <img src={img} alt="HOPAWI Gardens nursery" className="w-full h-auto object-cover"loading="lazy"/>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Values */}
      <motion.section className="bg-[var(--background)] text-[var(--primary)] py-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="space-y-4" variants={sectionVariants}>
            <motion.div className="border-2 border-[var(--primary)] rounded-lg p-6 text-left hover:shadow-lg transition-shadow" variants={itemVariants} whileHover={{ y: -5 }}>
              <h3 className="text-2xl font-bold mb-2">Mission</h3>
              <p>Greenery Living - Providing sustainable, beautiful landscaping and plant solutions</p>
            </motion.div>
            <motion.div className="border-2 border-[var(--primary)] rounded-lg p-6 text-left hover:shadow-lg transition-shadow" variants={itemVariants} transition={{ delay: 0.2 }} whileHover={{ y: -5 }}>
              <h3 className="text-2xl font-bold mb-2">Vision</h3>
              <p>Bringing life into homes and offices</p>
            </motion.div>
          </motion.div>
          <motion.div className="border-2 border-[var(--primary)] rounded-lg p-6 flex flex-col justify-center hover:shadow-lg transition-shadow" variants={itemVariants} transition={{ delay: 0.4 }} whileHover={{ y: -5 }}>
            <h3 className="text-2xl font-bold mb-6">Core values</h3>
            <ul className="grid grid-cols-3 gap-4">
              {[
                { icon: <PiPlantDuotone size={40} className="text-[var(--accent)]"/>, label: "Greenery" },
                { icon: <PiHeartFill size={40} className="text-[var(--accent)]"/>, label: "Serenity" },
                { icon: <FaDove size={40} className="text-[var(--accent)]"/>, label: "Life" }
              ].map((item, index) => (
                <motion.li key={index} className="flex flex-col items-center gap-2" variants={itemVariants} custom={index} whileHover={{ scale: 1.05 }}>
                  <motion.div whileHover={{ rotate: 10 }}>
                    {item.icon}
                  </motion.div>
                  <h3>{item.label}</h3>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>
      <ServiceSection/>
      <motion.section className="py-16">
        <div className="container">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Meet our team
          </motion.h3>
          <motion.p className="mt-2 text-black" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            The passionate plant experts behind HOPAWI GARDENS.
          </motion.p>
          <motion.div className="grid-responsive mt-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
          variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}>
            {teamMembers.map((member, index) => (
              <motion.div key={member.id} className="" variants={cardVariants} custom={index} 
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}>
                <div className="w-full h-64 bg-cover bg-top" style={{ backgroundImage: `url(${member.img})` }} aria-label={`Photo of ${member.name}`}
                ></div>
                <div className="p-6 text-left space-y-4 text-[var(--background)]">
                  <p className="text-black text-xl font-semibold">{member.name}</p>
                  <p className="text-sm opacity-80">{member.role}</p>
                  <div className="flex justify-end gap-4 text-xl mt-4">
                    {[
                      { icon: <FaTiktok/>, link: member.Tiktok, color: "hover:text-blue-400", title: "Tiktok" },
                      { icon: <FaLinkedin/>, link: member.LinkedIn, color: "hover:text-blue-400", title: "LinkedIn" },
                      { icon: <FaFacebook/>, link: member.Facebook, color: "hover:text-blue-600", title: "Facebook" },
                      { icon: <FaInstagram/>, link: member.Instagram, color: "hover:text-pink-500", title: "Instagram" },
                      { icon: <FaYoutube/>, link: member.Youtube, color: "hover:text-pink-500", title: "Youtubr" },
                    ].map((social, i) => (
                      social.link && (
                        <motion.a key={i} href={social.link} target="_blank" rel="noreferrer" className={`${social.color} transition`} title={social.title} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          {social.icon}
                        </motion.a>)
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default AboutUsPage;