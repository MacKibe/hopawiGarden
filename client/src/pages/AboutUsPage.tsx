import { PiAcorn } from "react-icons/pi";
import img from "../assets/img_back.jpg"
const AboutUsPage = () => {
    return(
        <div className="space-y-16 text-[var(--primary)]">
            {/* Bio */}
            <section>
                <h2>About Hopawi Gardens</h2>
                <h3>
                    We're passionate about bringing the beauty and benefits of plants into every home. Founded in 2019, we've grown from a small local nursery to a trusted online destination for plant lovers everywhere.
                </h3>
            </section>
            {/* Story */}
            <section className="flex gap-8 items-center">
                <div>
                    <h3>Our Story</h3>
                    <p>
                        Hopawi Gardens started with a simple belief: everyone deserves to have beautiful, healthy plants in their life. What began as a weekend farmer's market stall has grown into a thriving online community of plant enthusiasts.
                    </p>
                    <p>
                        We carefully select each plant from trusted growers, ensuring they arrive at your door healthy and ready to thrive. Our team of plant experts is always here to help you succeed in your plant parent journey.
                    </p>
                    <p>
                        Today, we're proud to serve thousands of customers across the country, helping them create green spaces that bring joy, clean air, and natural beauty to their homes.
                    </p>
                </div>
                <img src={img} className="w-[40%] rounded-2xl"/>
                <div></div>
            </section>
            {/* Values */}
            <section>
                <h3>Our Values</h3>
                <h4>The principles that guide everything we do</h4>
                <div className="grid grid-cols-3 p-8">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <PiAcorn />
                        <h3>Sustainability</h3>
                        <p>
                            We source our plants responsibly and use eco-friendly packaging to minimize our environmental impact.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <PiAcorn/>
                        <h3>Sustainability</h3>
                        <p>
                            We source our plants responsibly and use eco-friendly packaging to minimize our environmental impact.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <PiAcorn/>
                        <h3>Sustainability</h3>
                        <p>
                            We source our plants responsibly and use eco-friendly packaging to minimize our environmental impact.
                        </p>
                    </div>
                </div>
            </section>
            {/* Team */}
            <section>
                <h2>Meet Our Team.</h2>
                <h3>The passionate plant experts behind Hopawi Gardens.</h3>
                <div className="grid grid-cols-3 gap-8">
                    <div className="bg-amber-50 rounded-xl">
                        <div className="w-full h-64 bg-cover bg-center rounded-t-xl" style={{backgroundImage: `url(${img})`}}></div>
                        <div className="p-8 text-center space-y-4">
                            <h3>Sarah Johnson</h3>
                            <h4>Founder & CEO</h4>
                            <p>Plant enthusiast with 15+ years in horticulture</p>
                        </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl">
                        <div className="w-full h-64 bg-cover bg-center rounded-t-xl" style={{backgroundImage: `url(${img})`}}></div>
                        <div className="p-8 text-center space-y-4">
                            <h3>Sarah Johnson</h3>
                            <h4>Founder & CEO</h4>
                            <p>Plant enthusiast with 15+ years in horticulture</p>
                        </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl">
                        <div className="w-full h-64 bg-cover bg-center rounded-t-xl" style={{backgroundImage: `url(${img})`}}></div>
                        <div className="p-8 text-center space-y-4">
                            <h3>Sarah Johnson</h3>
                            <h4>Founder & CEO</h4>
                            <p>Plant enthusiast with 15+ years in horticulture</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Call To Action */}
            <section>
                <h3>Ready to Start Your Plant Journey?</h3>
                <h4>Join thousands of happy customers who have transformed their spaces with our beautiful plants.</h4>
                <button>Shop Now</button>
            </section>
        </div>
    )
}

export default AboutUsPage;