import Testimonial from "../components/home/Testimonial";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeaturesSection";
import FeaturedProduct from "../components/home/FeaturedProduct";

const HomePage = () => {
    return(
        <main className="text-[var(--text)] text-center">
            {/* Landing Section */}
            <HeroSection/>
            {/* Features */}
            <FeatureSection/>
            {/* Featured Products */}
            <FeaturedProduct />
            {/* Testimonials */}
            <section>
                <h3>What Our Customers Say</h3>
                <h4>Join thousands of happy plant parents</h4>
                <Testimonial/>
            </section>
        </main>
    )
}

export default HomePage;