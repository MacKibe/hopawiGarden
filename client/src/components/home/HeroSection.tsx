import { Link } from "react-router"
import backgroundImage from "../../assets/img_back.jpg"

const HeroSection = () => {
    return(
        <section className="relative min-h-[80dvh] w-full flex items-center justify-center overflow-hidden">
            {/* Background image with lazy loading */}
            <div className="absolute inset-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }} role="img" aria-label="Lush green plants background"></div>
            
            {/* Overlay */}
            <div className="absolute inset-0 w-full h-full bg-[var(--background)] opacity-30 z-0"></div>
            
            {/* Content */}
            <div className="container flex flex-col items-center justify-center gap-8 text-center z-10 px-4">
                <h1 className="max-w-2xl mx-auto">
                    Bringing Life To Your <span>Homes</span> And <span>Offices Space</span>
                </h1>
                <h3 className="max-w-2xl mx-auto text-[var(--primary)]">
                    Discover our curated collection of beautiful plants, flowers, and accessories. 
                    Transform your home into a natural sanctuary with nature delivered to your doorstep.
                </h3>
                <div className="flex flex-wrap justify-center gap-4 py-4">
                    <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                    <a href="#collection" className="btn btn-accent">Browse Collection</a>
                </div>
            </div>
        </section>
    )
}

export default HeroSection