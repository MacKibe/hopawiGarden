import { teamMembers } from "../data/team"; 
import img from "../assets/img_back.jpg"
import { FaInstagramSquare, FaLinkedin, FaEnvelope, FaFacebook, FaTwitter, FaGithub, FaExternalLinkAlt, FaDove } from "react-icons/fa";
import { PiPlantDuotone, PiHeartFill,  } from "react-icons/pi";
const AboutUsPage = () => {
    return(
        <div className="text-[var(--background)]">
            {/* Bio */}
            <section className="min-h-[45dvh] bg-[var(--background)] text-[var(--primary)]">
                <h2>About Hopawi Gardens</h2>
                <h4 className="max-w-3xl mx-auto">
                    We're passionate about bringing the beauty and benefits of plants into every home. Founded in 2019, we've grown from a small local nursery to a trusted online destination for plant lovers everywhere.
                </h4>
            </section>
            {/* Story */}
            <section className="">
                <div className="grid grid-cols-2 gap-16">
                    <div className="flex flex-col justify-center ">
                        <h3 className="text-4xl">Our Story</h3>
                        <p className="text-[var(--text)] text-left">
                            Hopawi Gardens started with a simple belief: everyone deserves to have beautiful, healthy plants in their life. What began as a weekend farmer's market stall has grown into a thriving online community of plant enthusiasts.<br/>
                            We carefully select each plant from trusted growers, ensuring they arrive at your door healthy and ready to thrive. Our team of plant experts is always here to help you succeed in your plant parent journey.<br/>
                            Today, we're proud to serve thousands of customers across the country, helping them create green spaces that bring joy, clean air, and natural beauty to their homes.
                        </p></div>
                    <div>
                        <img src={img} className="rounded-2xl"/>
                    </div>
                </div>
            </section>
            {/* Values */}
            <section className="grid grid-cols-2 gap-4 bg-[var(--background)] text-[var(--primary)] w-full">
                <div className="space-y-4">
                    <div className="border-2 text-left p-6">
                        <h3>Mission</h3>
                        <p>Bringing life into your homes and offices.</p>
                    </div>
                    <div className="border-2 text-left p-6">
                        <h3>Vision</h3>
                        <p>To make sustainable greenery a lifestyle.</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-8 border-2 p-6">
                    <h3>Core Values</h3>
                    <ul className="flex  items-center justify-evenly">
                        <li className="flex flex-col items-center gap-2">
                            <span>
                                <PiPlantDuotone size={40}/>
                            </span>
                            <h3>Greenery</h3>
                        </li>
                        <li className="flex flex-col items-center gap-2">
                            <span>
                                <PiHeartFill size={40}/>
                            </span>
                            <h3>Serenity</h3>
                        </li>
                        <li className="flex flex-col items-center gap-2">
                            <span>
                                <FaDove size={40}/>
                            </span>
                            <h3>Life</h3>
                        </li>
                    </ul>
                </div>
            </section>
            {/* Team */}
            <section>
                <h3>Meet Our Team.</h3>
                <h4>The passionate plant experts behind Hopawi Gardens.</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-[var(--text)] rounded-xl">
                    <div
                        className="w-full h-64 bg-cover bg-center rounded-t-xl"
                        style={{ backgroundImage: `url(${member.img})` }}
                    ></div>
                    <div className="p-8 text-left space-y-4 text-[var(--background)]">
                        <h4 className="text-xl font-semibold">{member.name}</h4>
                        <h5 className="text-sm opacity-80">{member.role}</h5>
                        <p className="text-sm">{member.bio}</p>

                        {/* Social Icons */}
                        <div className="flex justify-end space-x-4 text-xl mt-2">
                            {member.linkedin && (
                                <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition" title="LinkedIn"><FaLinkedin/></a>
                            )}
                            {member.gmail && (
                                <a href={member.gmail} target="_blank" rel="noreferrer" className="hover:text-red-500 transition" title="Gmail"><FaEnvelope/>
                                </a>
                            )}
                            {member.facebook && (
                                <a href={member.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition" title="Facebook"><FaFacebook/></a>
                            )}
                            {member.instagram && (
                                <a href={member.instagram} target="_blank" rel="noreferrer" className="hover:text-pink-500 transition" title="Instagram"><FaInstagramSquare/></a>
                            )}
                            {member.twitter && (
                                <a href={member.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition" title="Twitter"><FaTwitter/>
                                </a>
                            )}
                            {member.github && (
                                <a href={member.github} target="_blank" rel="noreferrer" className="hover:text-gray-800 transition" title="GitHub"><FaGithub/>
                                </a>
                            )}
                            {member.website && (
                                <a href={member.website} target="_blank" rel="noreferrer" className="hover:text-green-600 transition" title="Website"><FaExternalLinkAlt/>
                                </a>
                            )}
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </section>
        </div>
    )
}

export default AboutUsPage;