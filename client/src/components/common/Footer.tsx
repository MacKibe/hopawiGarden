  import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
  import { Link, useNavigate, useLocation } from "react-router";
    
  const Footer = () => {
      const navigate = useNavigate();
      const location = useLocation();

      const handleNav = (sectionId: string) => {
         if (location.pathname === "/") {
         // Already on homepage → scroll directly
         const section = document.getElementById(sectionId);
         if (section) {
             section.scrollIntoView({ behavior: "smooth" });
         }
         } else {
         // Navigate to homepage, passing section info in state
         navigate("/", { state: { scrollTo: sectionId } });
         }
      };
      
      return (
          <footer className="bg-[var(--background)] text-white">
              <div className="container py-10 border-b border-[var(--primary)]">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
                        {/* Brand Info */}
                        <div className="space-y-4 col-span-2">
                            <h3 className="text-xl font-bold">HOPAWI GARDENS</h3>
                            <p>Bringing life into homes and offices.</p>
                        {/* Socials */}
                        <div>
                            <p>Catch us on our socials.</p>
                            <div className="flex flex-wrap gap-4 py-4">
                                <a href="https://www.facebook.com/profile.php?id=61578230820890" target="_blank" aria-label="Facebook" className="hover:text-[var(--accent)] transition">
                                    <FaFacebook size={30}/>
                                </a>
                                <a href="https://www.linkedin.com/in/hopawi-gardens-229972371/" target="_blank" aria-label="LinkedIn" className="hover:text-[var(--accent)] transition">
                                    <FaLinkedin size={30}/>
                                </a>
                                <a href="https://www.youtube.com/@HOPAWIGardens" target="_blank" aria-label="YouTube" className="hover:text-[var(--accent)] transition">
                                    <FaYoutube size={30}/>
                                </a>
                                <a href="https://www.instagram.com/hopawi_gardens/" target="_blank" aria-label="Instagram" className="hover:text-[var(--accent)] transition">
                                    <FaInstagram size={30}/>
                                </a>
                                <a href="https://www.tiktok.com/@hopawi_gardens1" target="_blank" aria-label="TikTok" className="hover:text-[var(--accent)] transition">
                                    <FaTiktok size={30}/>
                                </a>
                            </div>
                        </div>
                        </div>
                        {/* Quick Links */}
                        <div>
                                <h3 className="text-lg font-semibold mb-4">Quick links</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/" className="hover:text-[var(--accent)] transition">Home</Link></li>
                                    <li><Link to='/about' className="hover:text-[var(--accent)] transition">About us</Link></li>
                                    <li><Link to='/shop' className="hover:text-[var(--accent)] transition">Shop</Link></li>
                                    <li><Link to='/contact' className="hover:text-[var(--accent)] transition">Contact</Link></li>
                                </ul>
                        </div>
                        {/* Services */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Services</h3>
                            <ul className="space-y-2">
                                <li><button onClick={() => handleNav("service")} className="hover:text-[var(--accent)] transition">Indoor potted plants</button></li>
                                <li><button onClick={() => handleNav("service")} className="hover:text-[var(--accent)] transition">Outdoor potted plants</button></li>
                                <li><button onClick={() => handleNav("service")} className="hover:text-[var(--accent)] transition">Landscaping services</button></li>
                                <li><button onClick={() => handleNav("service")} className="hover:text-[var(--accent)] transition">HOPAWI compost mixture</button></li>
                                <li><button onClick={() => handleNav("service")} className="hover:text-[var(--accent)] transition">Plant care maintaince</button></li>
                            </ul>
                        </div>
                  </div>
              </div>
              {/* Copyright */}
              <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center py-8">
                  <p>© {new Date().getFullYear()} HOPAWI GARDENS. All rights reserved.</p>
                  <div className="flex gap-6 mt-4 md:mt-0">
                      <Link to="/privacy-policy" className="hover:text-[var(--accent)] transition">Privacy policy</Link>
                      <Link to="/terms" className="hover:text-[var(--accent)] transition">Terms of service</Link>
                  </div>
                </div>
              </div>
          </footer>
      )
  }
  
  export default Footer
