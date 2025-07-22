import Testimonial from "../components/home/Testimonial";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeaturesSection";
import FeaturedProduct from "../components/home/FeaturedProduct";

const HomePage = () => {
    return(
        <main className="text-[var(--text)] text-center space-y-16">
            {/* Landing Section */}
            <HeroSection/>
            {/* Features */}
            <FeatureSection/>
            {/* Featured Products */}
            <FeaturedProduct />
            {/* Testimonials */}
            <section>
                <h2>What Our Customers Say</h2>
                <h3>Join thousands of happy plant parents</h3>
                <Testimonial/>
            </section>
        </main>
    )
}

export default HomePage;