import { PiFlowerTulip, PiSun } from "react-icons/pi"
import Img from "../../assets/img.jpg"
import Flower from "../../assets/flower.jpg"
import { Link } from "react-router"

const FeaturesSection = () => {
    const featuresDetails = [
        {
            backgroundImg: Img,
            icon: <PiFlowerTulip size={32} />,
            featureName: "Indoor Plants",
            featureDetails: "Perfect for your living space",
        },
        {
            backgroundImg: Flower,
            icon: <PiSun size={32} />,
            featureName: "Outdoor Plants",
            featureDetails: "Garden Favorites",
        }
    ]
    
    return (
        <section id="collection">
            <div className="container">
                <h3>Plant Collections</h3>
                <h4 className="max-w-3xl mx-auto mt-2">
                    Explore our carefully curated categories to find the perfect plants for your space
                </h4>
                <div className="grid-responsive mt-8">
                    {featuresDetails.map((detail, index) => (
                        <div key={index} className="card">
                            <div className="w-full aspect-[5/3] bg-cover bg-center" style={{ backgroundImage: `url(${detail.backgroundImg})`}}
                                role="img" aria-label={detail.featureName}></div>
                            <div className="flex flex-col items-center p-6 gap-2 text-center">
                                <span className="text-[var(--background)]">{detail.icon}</span>
                                <h4>{detail.featureName}</h4>
                                <p className="text-[var(--text)]">{detail.featureDetails}</p>
                                <Link to='/shop' className="btn btn-primary mt-2">
                                    Explore
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection