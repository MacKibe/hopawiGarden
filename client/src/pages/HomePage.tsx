import Card from "../components/ui/Card";
import Img from "../assets/img.jpg"
import Background from "../assets/img_back.jpg"
import { FiSun } from "react-icons/fi";
import { PiFlowerTulip } from "react-icons/pi";
import { Link } from "react-router";
import Testimonial from "../components/home/Testimonial";

const HomePage = () => {
    return(
        <main className="text-[var(--primary)] flex flex-col text-center gap-16">
            {/* Landing Section */}
            <section className="flex flex-col justify-around gap-8 w-2xl mx-auto text-center">
                <h2 className="text-5xl font-bold">Bringing Life To Your <span>Homes</span> And <span>Office Spaces</span></h2>
                <h3 className="text-xl">Discover our curated collection of beautiful plants, flowers, and accessories. Transform your home into a natural sanctuary with nature delivered to your doorstep.</h3>
                <span className="flex gap-4 justify-center py-4">
                    <button className="bg-[var(--text)] py-3 px-6 rounded-2xl">Shop Now</button>
                    <button className="bg-[var(--accent)] py-3 px-6 rounded-2xl">Browse Collection</button>
                </span>
            </section>

            {/* Features */}
            <section className="flex flex-col justify-center gap-4">
                <h2>Featured Collections</h2>
                <h3>Explore our carefully curated categories to find the perfect plants for your space</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <Card>
                        <div><img src={Img}/></div>
                        <span><PiFlowerTulip /></span>
                        <h3>Indoor Plants</h3>
                        <p>Perfect for your living space</p>
                        <button>Explore</button>
                    </Card>
                    <Card>
                        <div><img src={Background} /></div>
                        <span><FiSun /></span>
                        <h3>Outdoor Plants</h3>
                        <p>Garden and Patio favorite.</p>
                        <button>Explore</button>
                    </Card>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <h2>Featured Products.</h2>
                <h3>Handpicked favorites from our collection, loved by plant enthusiasts</h3>
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <div><img src={Img}/></div>
                        <span>Montera Plant</span>
                        <h3>Description......</h3>
                        <div>
                            <p>1,500 Kshs</p>
                            <button>Buy Now</button>
                        </div>
                    </Card>
                    <Card>
                        <div><img src={Img}/></div>
                        <span>Montera Plant</span>
                        <h3>Description......</h3>
                        <div>
                            <p>1,500 Kshs</p>
                            <button>Buy Now</button>
                        </div>
                    </Card>
                    <Card>
                        <div><img src={Img}/></div>
                        <span>Montera Plant</span>
                        <h3>Description......</h3>
                        <div>
                            <p>1,500 Kshs</p>
                            <button>Buy Now</button>
                        </div>
                    </Card>
                    <Card>
                        <div><img src={Img}/></div>
                        <span>Montera Plant</span>
                        <h3>Description......</h3>
                        <div>
                            <p>1,500 Kshs</p>
                            <button>Buy Now</button>
                        </div>
                    </Card>
                    <Card>
                        <div><img src={Img}/></div>
                        <span>Montera Plant</span>
                        <h3>Description......</h3>
                        <div>
                            <p>1,500 Kshs</p>
                            <button>Buy Now</button>
                        </div>
                    </Card>
                    <Card>
                        <div><img src={Img}/></div>
                        <span>Montera Plant</span>
                        <h3>Description......</h3>
                        <div>
                            <p>1,500 Kshs</p>
                            <button>Buy Now</button>
                        </div>
                    </Card>
                </div>
                <div
                className="flex justify-center">
                <Link to="/shop" className="bg-[var(--primary)] text-[var(--background)] py-2 px-4 my-4 rounded-xl">View All Products</Link>
                </div>
            </section>

            {/* Testimonials */}
            <section>
                <h2>What Our Customers Say</h2>
                <h3>Join thousands of happy plant parents</h3>
                <div className="grid grid-cols-3 gap-4">
                    <Testimonial/>
                    <Testimonial/>
                    <Testimonial/>
                    <Testimonial/>
                </div>
            </section>
        </main>
    )
}

export default HomePage;