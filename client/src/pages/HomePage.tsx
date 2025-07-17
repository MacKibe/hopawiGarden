import Card from "../components/ui/Card";
import Img from "../assets/img.jpg"
import Background from "../assets/img_back.jpg"
import { FiSun } from "react-icons/fi";
import { PiFlowerTulip } from "react-icons/pi";

const HomePage = () => {
    return(
        <main className="text-[var(--primary)] ">
            {/* Landing Section */}
            <section className="flex flex-col justify-around gap-8 w-2xl mx-auto text-center">
                <h2 className="text-5xl font-bold">Bringing Life To Your <span>Homes</span> And <span>Office Spaces</span></h2>
                <p className="text-xl">Discover our curated collection of beautiful plants, flowers, and accessories. Transform your home into a natural sanctuary with nature delivered to your doorstep.</p>
                <span className="flex gap-4 justify-center py-4">
                    <button className="bg-[var(--text)] py-3 px-6 rounded-2xl">Shop Now</button>
                    <button className="bg-[var(--accent)] py-3 px-6 rounded-2xl">Browse Collection</button>
                </span>
            </section>
            {/* Features */}
            <section className="flex flex-col gap-4">
                <h2>Featured Collections</h2>
                <p>Explore our carefully curated categories to find the perfect plants for your space</p>
                <div className="flex w-[60%] mx-auto">
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
            <section></section>
            {/* Testimonials */}
            <section></section>
        </main>
    )
}

export default HomePage;