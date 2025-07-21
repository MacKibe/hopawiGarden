import { PiAcornBold } from "react-icons/pi";

const ContactPage = () => {
    return(
        <div className="space-y-16">
            <section>
                <h2>Get in Touch</h2>
                <h3>
                    Have questions about our plants or need help with plant care? We're here to help you grow your green thumb!
                </h3>
            </section>
            <section className="">
                <form className="">
                    <h2>Send Us A Message</h2>
                    <div className="grid grid-cols-2">
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Your Full Name" name="name" id="name" />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" placeholder="your@email.com" name="email" id="email" />
                        </div>
                    </div>
                    <label>
                        Subject:<input type="text" placeholder="Subject" name="subject" id="subject" />
                    </label>
                    <label>
                        Message:<textarea type="text" placeholder="Tell us more about your question and concern..." name="message" id="message" />
                    </label>
                    <button type="submit">Send Message</button>
                </form>
                <div className="flex flex-col">
                    <div>
                        <PiAcornBold/>
                        <h3>Visit Our Nursery</h3>
                        <p>123 Garden Lane</p>
                        <p>Green Valley, CA 95945</p>
                        <button>Get Directions</button>
                    </div>
                    <div>
                        <PiAcornBold/>
                        <h3>Call Us Today</h3>
                        <p>123 Garden Lane</p>
                        <p>Green Valley, CA 95945</p>
                        <button>Get Directions</button>
                    </div>
                    <div>
                        <PiAcornBold/>
                        <h3>Visit Our Nursery</h3>
                        <p>123 Garden Lane</p>
                        <p>Green Valley, CA 95945</p>
                        <button>Get Directions</button>
                    </div>
                </div>
            </section>
            <section>
                <h2>Frequently Asked Questions</h2>
                <h3>Quick answers to common questions about our plants and services</h3>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <details className="border-1 border-[var(--primary)] p-8">
                        <summary>How do you ensure plants arrive healthy?</summary>
                        We use specialized packaging and work with trusted shipping partners to ensure your plants arrive in perfect condition. All plants are carefully inspected before shipping.
                    </details>
                    <details className="border-1 border-[var(--primary)] p-8">
                        <summary>What if my plant arrives damaged?</summary>
                        We offer a 30-day guarantee on all plants. If your plant arrives damaged or doesn't thrive within 30 days, we'll replace it or provide a full refund.
                    </details>
                    <details className="border-1 border-[var(--primary)] p-8">
                        <summary>Do you offer plant care support?</summary>
                        Absolutely! Our team of plant experts is available to help with care questions. You can reach us via email, phone, or our live chat feature.
                    </details>
                    <details className="border-1 border-[var(--primary)] p-8">
                        <summary>What areas do you deliver to?</summary>
                        We currently deliver to all 50 US states. Shipping times vary by location, typically 3-7 business days for most areas.
                    </details>
                </div>
            </section>
        </div>
    )
}

export default ContactPage;