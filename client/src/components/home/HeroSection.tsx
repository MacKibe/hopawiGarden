import { Link } from "react-router"
import backgroundImage from "../../assets/img_back.jpg"

const HeroSection = () => {
    return(
        <section className="relative min-h-[80dvh] w-full flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
            {/* Optional overlay */}
            <div className="absolute inset-0 w-full h-full bg-[var(--background)] opacity-30 z-0"></div>
            {/* Content */}
            <div className="flex flex-col justify-around gap-8 max-w-3xl mx-auto text-center z-10">
                <h1 className="text-6xl font-bold">Bringing Life To Your <span>Homes</span> And <span>Office Spaces</span></h1>
                <h4 className="max-w-2xl mx-auto text-[var(--primary)] text-xl">Discover our curated collection of beautiful plants, flowers, and accessories. Transform your home into a natural sanctuary with nature delivered to your doorstep.</h4>
                <span className="flex gap-4 justify-center py-4">
                    <Link to="/shop" className="bg-[var(--background)] py-3 px-6 rounded-2xl">Shop Now</Link>
                    <a href="#collection" className="bg-[var(--accent)] py-3 px-6 rounded-2xl">Browse Collection</a>
                </span>
            </div>
        </section>
    )
}

export default HeroSection