import { PiAcorn } from "react-icons/pi"
import { LuMessageCircle } from "react-icons/lu"
import { faqData } from "../data/faq"

const ContactPage = () => {
    return(
        <div>
            {/* Hero */}
            <section className="bg-[var(--background)] text-[var(--primary)]">
                <div className="container">
                    <h2>Get in Touch</h2>
                    <h4 className="max-w-3xl mx-auto mt-4">
                        Have questions about our plants or need help with plant care? 
                        We're here to help you grow your green thumb!
                    </h4>
                </div>
            </section> 
            {/* Contact Form */}
            <section>
                <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* FORM - 2/3 Width */}
                    <form className="lg:col-span-2 bg-[var(--primary)] p-8 rounded-xl shadow-md-[var(--secondary)] text-left">
                        <h3 className="flex items-center gap-4 text-2xl text-[var(--background)] mb-6">
                            <LuMessageCircle size={40} /> 
                            Send us a message
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-group">
                                <label className="block mb-2">Name *</label>
                                <input type="text" placeholder="Your Full Name" className="w-full" required/>
                            </div>
                            <div className="form-group">
                                <label className="block mb-2">Email *</label>
                                <input type="email" placeholder="your@email.com" className="w-full" required/>
                            </div>
                        </div>
                        <div className="form-group mt-6">
                            <label className="block mb-2">Subject *</label>
                            <input type="text" placeholder="Subject" className="w-full" required/>
                        </div>
                        <div className="form-group mt-6">
                            <label className="block mb-2">Message *</label>
                            <textarea placeholder="Tell us more about your question and concern..." rows={6} className="w-full" required/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-6">
                            Send Message
                        </button>
                    </form>

                    {/* CONTACT INFO - 1/3 Width */}
                    <div className="space-y-8">
                        <div className="bg-[var(--primary)] p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-3 text-xl mb-4">
                                <PiAcorn size={24} className="text-[var(--background)]"/>
                                <h4 className="font-semibold">Visit Our Garden</h4>
                            </div>
                            <address className="not-italic space-y-2">
                                <p>Park Lane</p>
                                <p>Kiambu</p>
                                <a href="https://maps.app.goo.gl/PCcW1REZJ1Bj4a2x8" className="inline-block mt-2 text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Get Directions</a>
                            </address>
                        </div>

                        <div className="bg-[var(--primary)] p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-3 text-xl mb-4">
                                <PiAcorn size={24} className="text-[var(--background)]"/>
                                <h4 className="font-semibold">Call Us Today</h4>
                            </div>
                            <div className="space-y-2">
                                <p>(+254) 720 804523</p>
                                <p>Mon - Fri, 9am - 5pm</p>
                                <a href="tel:+254720804523" className="inline-block mt-2 text-blue-600 hover:underline">
                                    Call Now
                                </a>
                            </div>
                        </div>

                        <div className="bg-[var(--primary)] p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-3 text-xl mb-4">
                                <PiAcorn size={24} className="text-[var(--background)]"/>
                                <h4 className="font-semibold">Email Us</h4>
                            </div>
                            <div className="space-y-2">
                                <p>greenery@hopawigardens.com</p>
                                <p>We usually respond within 24 hrs</p>
                                <a href="mailto:greenery@hopawigardens.com" className="inline-block mt-2 text-blue-600 hover:underline">
                                    Send Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* FAQ */}
            <section className="bg-[var(--secondary)]">
                <div className="container">
                    <h3>Frequently Asked Questions</h3>
                    <h4 className="mt-2">Quick answers to common questions about our plants and services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {faqData.map((item, index) => (
                            <details key={index} open className="bg-[var(--primary)] rounded-xl overflow-hidden mb-4 text-left">
                                <summary className="p-6 cursor-pointer font-semibold text-[var(--background)] text-center">
                                    {item.question}
                                </summary>
                                <p className="px-6 pb-6 text-[var(--background)]">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage