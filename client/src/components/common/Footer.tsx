import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
    return(
        <div className="px-[5%] bg-[var(--background)] text-[var(--primary)] p-4">
            <div className="flex justify-between py-8">
                <div className="flex flex-col justify-around w-[30%]">
                    <h2>HG - HOPAWI GARDENS.</h2>
                    <span>Bringing life to your offices and homes. Your trusted partner in creating natural sanctuaries.</span>
                    <span className="flex gap-2">
                        <FaFacebook size={30}/>
                        <FaLinkedin size={30}/>
                        <FaYoutube size={30}/>
                        <MdEmail size={30}/>
                    </span>
                </div>
                <div>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to='/about'>About Us</Link></li>
                        <li><Link to='/shop' >Shop</Link></li>
                        <li><Link to='/contact'>FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Categories</h2>
                    <ul>
                        <li><Link to="/indoor_plants">Indoor Plants</Link></li>
                        <li><Link to='/outdoor_plants'>Outdoor Plants</Link></li>
                        <li><Link to='/flowers'>Flowers</Link></li>
                        <li><Link to='/accessories'>Accessories</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Support</h2>
                    <ul>
                        <li><Link to="/shipping_info">Shipping Info</Link></li>
                        <li><Link to='/returns'>Returns</Link></li>
                        <li><Link to='/plant_care'>Plant Care</Link></li>
                        <li><Link to='/contact_us' >Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-between py-8 border-t-2">
                <section>
                    <p>© 2024 Hopawi Gardens. All rights reserved.</p>
                </section>
                <section className="flex gap-16">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </section>
            </div>
        </div>
    )
}

export default Footer;