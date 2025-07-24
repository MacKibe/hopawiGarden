import { PiAcornBold } from "react-icons/pi";
import { LuMessageCircleDashed } from "react-icons/lu";

const ContactPage = () => {
    return(
        <div>
            <section className="min-h-[45dvh] bg-[var(--background)] text-[var(--primary)] ">
                <h2>Get in Touch</h2>
                <h4 className="max-w-3xl mx-auto">Have questions about our plants or need help with plant care? We're here to help you grow your green thumb!</h4>
            </section>
            <section>
                <div className="grid grid-cols-3">
                    {/* FORM - 2/3 Width */}
                    <form className="col-span-2 border-1 border-[var(--background)] text-left p-8">
                        <h3 className="flex items-center gap-4 py-4 text-2xl text-[var(--background)]"><LuMessageCircleDashed size={50} /> Send us a message</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label>Name *</label>
                                <input type="text" placeholder="Your Full Name" name="name" id="name" className="w-full p-3 rounded-lg"/>
                            </div>
                            <div>
                                <label>Email *</label>
                                <input type="email" placeholder="your@email.com" name="email" id="email" className="w-full p-3 border rounded-lg"/>
                            </div>
                        </div>
                        <div>
                            <label>Subject *</label>
                            <input type="text" placeholder="Subject" name="subject" id="subject" className="w-full p-3 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label>Message *</label>
                            <textarea placeholder="Tell us more about your question and concern..." name="message" id="message" rows={6} className="w-full p-3 border rounded-lg"/>
                        </div>
                        <button type="submit" className="bg-[var(--background)] text-[var(--primary)] px-6 py-3 rounded">Send Message</button>
                    </form>

                    {/* CONTACT INFO - 1/3 Width */}
                    <div className="col-span-1 flex flex-col justify-evenly px-8 text-left">
                    <div>
                        <div className="flex items-center gap-3 text-xl mb-2">
                        <PiAcornBold />
                        <h4 className="font-semibold">Visit Our Nursery</h4>
                        </div>
                        <p>Park Lane</p>
                        <p>Kiambu</p>
                        <button className="mt-2 text-blue-600 underline">Get Directions</button>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 text-xl mb-2">
                        <PiAcornBold />
                        <h4 className="font-semibold">Call Us Today</h4>
                        </div>
                        <p>(+254) 70 001001</p>
                        <p>Mon - Fri, 9am - 5pm</p>
                        <button className="mt-2 text-blue-600 underline">Call Now</button>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 text-xl mb-2">
                        <PiAcornBold />
                        <h4 className="font-semibold">Email Us</h4>
                        </div>
                        <p>lucy@hopawigardens.com</p>
                        <p>We usually respond within 24 hrs</p>
                        <button className="mt-2 text-blue-600 underline">Send Email</button>
                    </div>
                    </div>
                </div>
            </section>
            <section className=" bg-[var(--secondary)]">
                <h3>Frequently Asked Questions</h3>
                <h4>Quick answers to common questions about our plants and services</h4>
                <div className="grid grid-cols-2 gap-4 py-4 text-left">
                    <details open className="border-1 border-[var(--background)] p-8">
                        <summary>How do you ensure plants arrive healthy?</summary>
                        <p className="text-[var(--background)] p-4">We use specialized packaging and work with trusted shipping partners to ensure your plants arrive in perfect condition. All plants are carefully inspected before shipping.</p>
                    </details>
                    <details open className="border-1 border-[var(--background)] p-8">
                        <summary className="">What if my plant arrives damaged?</summary>
                        <p className="text-[var(--background)] p-4">We offer a 30-day guarantee on all plants. If your plant arrives damaged or doesn't thrive within 30 days, we'll replace it or provide a full refund.</p>
                    </details>
                    <details open className="border-1 border-[var(--background)] p-8">
                        <summary>Do you offer plant care support?</summary>
                        <p className="text-[var(--background)] p-4">Absolutely! Our team of plant experts is available to help with care questions. You can reach us via email, phone, or our live chat feature.</p>
                    </details>
                    <details open className="border-1 border-[var(--background)] p-8">
                        <summary>What areas do you deliver to?</summary>
                        <p className="text-[var(--background)] p-4">We currently deliver to all 50 US states. Shipping times vary by location, typically 3-7 business days for most areas.</p>
                    </details>
                </div>
            </section>
        </div>
    )
}

export default ContactPage;