import { motion } from "framer-motion";
import { teamMembers } from "../data/team";
import img from "../assets/img_back.jpg";
import { FaInstagram, FaLinkedin, FaEnvelope, FaFacebook, FaTwitter, FaGithub, FaExternalLinkAlt, FaDove } from "react-icons/fa";
import { PiPlantDuotone, PiHeartFill } from "react-icons/pi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const AboutUsPage = () => {
  return (
    <div className="text-[var(--background)]">
      {/* Bio */}
      <motion.section className="bg-[var(--background)] text-[var(--primary)] py-16" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="container">
          <motion.h2 variants={itemVariants}>About HOPAWI GARDENS</motion.h2>
          <motion.h4 className="max-w-3xl mx-auto mt-4" variants={itemVariants} transition={{ delay: 0.2 }}>
            We're passionate about bringing the beauty and benefits of plants into every home. 
            Founded in 2025, we've grown from a small local garden to a trusted online 
            destination for plant lovers everywhere.
          </motion.h4>
        </div>
      </motion.section>

      {/* Story */}
      <motion.section className="py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <h3 className="text-4xl mb-6">Our Story</h3>
            <p className="text-[var(--text)] space-y-4">
              HOPAWI Gardens started with a simple belief: everyone deserves to have beautiful, 
              healthy plants in their life. What began as a weekend farmer's market stall has 
              grown into a thriving online community of plant enthusiasts.
              <br/><br/>
              We carefully select each plant from trusted growers, ensuring they arrive at your 
              door healthy and ready to thrive. Our team of plant experts is always here to 
              help you succeed in your plant parent journey.
              <br/><br/>
              Today, we're proud to serve thousands of customers across the country, helping 
              them create green spaces that bring joy, clean air, and natural beauty to their homes.
            </p>
          </motion.div>
          <motion.div className="rounded-2xl overflow-hidden shadow-lg" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}>
            <img src={img} alt="HOPAWI Gardens nursery" className="w-full h-auto object-cover"loading="lazy"/>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Values */}
      <motion.section className="bg-[var(--background)] text-[var(--primary)] py-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div className="border-2 border-[var(--primary)] rounded-lg p-6 text-left hover:shadow-lg transition-shadow" variants={itemVariants} whileHover={{ y: -5 }}>
              <h3 className="text-2xl font-bold mb-2">Mission</h3>
              <p>To make sustainable greenery a lifestyle.</p>
            </motion.div>
            <motion.div className="border-2 border-[var(--primary)] rounded-lg p-6 text-left hover:shadow-lg transition-shadow" variants={itemVariants} transition={{ delay: 0.2 }} whileHover={{ y: -5 }}>
              <h3 className="text-2xl font-bold mb-2">Vision</h3>
              <p>Bringing life into your homes and offices.</p>
            </motion.div>
          </motion.div>
          <motion.div className="border-2 border-[var(--primary)] rounded-lg p-6 flex flex-col justify-center hover:shadow-lg transition-shadow" variants={itemVariants} transition={{ delay: 0.4 }} whileHover={{ y: -5 }}>
            <h3 className="text-2xl font-bold mb-6">Core Values</h3>
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
      
      <motion.section className="py-16">
        <div className="container">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Meet Our Team
          </motion.h3>
          <motion.h4 className="mt-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            The passionate plant experts behind HOPAWI GARDENS.
          </motion.h4>
          <motion.div className="grid-responsive mt-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
          variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}>
            {teamMembers.map((member, index) => (
              <motion.div key={member.id} className="card" variants={cardVariants} custom={index} 
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}>
                <div className="w-full h-64 bg-cover bg-top" style={{ backgroundImage: `url(${member.img})` }} aria-label={`Photo of ${member.name}`}
                ></div>
                <div className="p-6 text-left space-y-4 text-[var(--background)]">
                  <h4 className="text-xl font-semibold">{member.name}</h4>
                  <h5 className="text-sm opacity-80">{member.role}</h5>
                  <p className="text-sm">{member.bio}</p>
                  <div className="flex justify-end gap-4 text-xl mt-4">
                    {[
                      { icon: <FaLinkedin/>, link: member.linkedin, color: "hover:text-blue-400", title: "LinkedIn" },
                      { icon: <FaEnvelope/>, link: member.gmail, color: "hover:text-red-500", title: "Gmail" },
                      { icon: <FaFacebook/>, link: member.facebook, color: "hover:text-blue-600", title: "Facebook" },
                      { icon: <FaInstagram/>, link: member.instagram, color: "hover:text-pink-500", title: "Instagram" },
                      { icon: <FaTwitter/>, link: member.twitter, color: "hover:text-blue-400", title: "Twitter" },
                      { icon: <FaGithub/>, link: member.github, color: "hover:text-gray-800", title: "GitHub" },
                      { icon: <FaExternalLinkAlt/>, link: member.website, color: "hover:text-green-600", title: "Website" }
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