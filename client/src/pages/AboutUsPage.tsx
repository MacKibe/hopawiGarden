import { teamMembers } from "../data/team"
import img from "../assets/img_back.jpg"
import { FaInstagram, FaLinkedin, FaEnvelope, FaFacebook, FaTwitter, FaGithub, FaExternalLinkAlt, FaDove } from "react-icons/fa"
import { PiPlantDuotone, PiHeartFill } from "react-icons/pi"

const AboutUsPage = () => {
    return(
        <div className="text-[var(--background)]">
            {/* Bio */}
            <section className="bg-[var(--background)] text-[var(--primary)]">
                <div className="container">
                    <h2>About HOPAWI GARDENS</h2>
                    <h4 className="max-w-3xl mx-auto mt-4">
                        We're passionate about bringing the beauty and benefits of plants into every home. 
                        Founded in 2025, we've grown from a small local garden to a trusted online 
                        destination for plant lovers everywhere.
                    </h4>
                </div>
            </section>
            {/* Story */}
            <section>
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
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
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img 
                            src={img} 
                            alt="HOPAWI Gardens nursery"
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
            
            {/* Values */}
            <section className="bg-[var(--background)] text-[var(--primary)]">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="border-2 border-[var(--primary)] rounded-lg p-6 text-left">
                            <h3 className="text-2xl font-bold mb-2">Mission</h3>
                            <p>To make sustainable greenery a lifestyle.</p>
                        </div>
                        <div className="border-2 border-[var(--primary)] rounded-lg p-6 text-left">
                            <h3 className="text-2xl font-bold mb-2">Vision</h3>
                            <p>Bringing life into your homes and offices.</p>
                        </div>
                    </div>
                    <div className="border-2 border-[var(--primary)] rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-6">Core Values</h3>
                        <ul className="grid grid-cols-3 gap-4">
                            <li className="flex flex-col items-center gap-2">
                                <PiPlantDuotone size={40} className="text-[var(--accent)]"/>
                                <h3>Greenery</h3>
                            </li>
                            <li className="flex flex-col items-center gap-2">
                                <PiHeartFill size={40} className="text-[var(--accent)]"/>
                                <h3>Serenity</h3>
                            </li>
                            <li className="flex flex-col items-center gap-2">
                                <FaDove size={40} className="text-[var(--accent)]"/>
                                <h3>Life</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            
            {/* Team */}
            <section>
                <div className="container">
                    <h3>Meet Our Team</h3>
                    <h4 className="mt-2">The passionate plant experts behind HOPAWI Gardens.</h4>
                    <div className="grid-responsive mt-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="card">
                                <div
                                    className="w-full h-64 bg-cover bg-top"
                                    style={{ backgroundImage: `url(${member.img})` }}
                                    aria-label={`Photo of ${member.name}`}
                                ></div>
                                <div className="p-6 text-left space-y-4 text-[var(--background)]">
                                    <h4 className="text-xl font-semibold">{member.name}</h4>
                                    <h5 className="text-sm opacity-80">{member.role}</h5>
                                    <p className="text-sm">{member.bio}</p>
                                    <div className="flex justify-end gap-4 text-xl mt-4">
                                        {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noreferrer" 
                                               className="hover:text-blue-400 transition" title="LinkedIn">
                                                <FaLinkedin/>
                                            </a>
                                        )}
                                        {member.gmail && (
                                            <a href={member.gmail} target="_blank" rel="noreferrer" 
                                               className="hover:text-red-500 transition" title="Gmail">
                                                <FaEnvelope/>
                                            </a>
                                        )}
                                        {member.facebook && (
                                            <a href={member.facebook} target="_blank" rel="noreferrer" 
                                               className="hover:text-blue-600 transition" title="Facebook">
                                                <FaFacebook/>
                                            </a>
                                        )}
                                        {member.instagram && (
                                            <a href={member.instagram} target="_blank" rel="noreferrer" 
                                               className="hover:text-pink-500 transition" title="Instagram">
                                                <FaInstagram/>
                                            </a>
                                        )}
                                        {member.twitter && (
                                            <a href={member.twitter} target="_blank" rel="noreferrer" 
                                               className="hover:text-blue-400 transition" title="Twitter">
                                                <FaTwitter/>
                                            </a>
                                        )}
                                        {member.github && (
                                            <a href={member.github} target="_blank" rel="noreferrer" 
                                               className="hover:text-gray-800 transition" title="GitHub">
                                                <FaGithub/>
                                            </a>
                                        )}
                                        {member.website && (
                                            <a href={member.website} target="_blank" rel="noreferrer" 
                                               className="hover:text-green-600 transition" title="Website">
                                                <FaExternalLinkAlt/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUsPage